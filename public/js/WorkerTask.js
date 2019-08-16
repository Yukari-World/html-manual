/**
 * @file Worker Task
 *
 * @module  manual-worker
 * @since   1.0.0
 * @version 1.0.2
 */

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialize

// SendAjax関数の呼び出し
// import { SendAjax } from './ajax-response.min.js';

/**
 * ランダムワードマニア
 * @constant
 * @type {JSON}
 */
let randomWordList;
let randomWordTags = [];

/**
 * 送信リスト
 * @type {Object}
 */
let sendList;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Function

/**
 * HTTPステータスコードの確認
 *
 * @param   {Response}       response    レスポンスデータ
 * @returns {Response|Error}             HTTPステータスコードが200番台ならレスポンスデータ、そうでなければエラー
 * @since   1.0.0
 * @version 1.0.2
 */
function checkStatus(response) {
	// HTTPステータスコードが200番台ではない場合
	// 類似方法にresponse.okがあるが大部分のブラウザが非対応なので非推奨
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

/**
 * JSONデータの切り出し
 *
 * @param   {Response}  response    レスポンスデータ
 * @returns {JSON}                  レスポンスに格納されているJSONデータ
 * @since   1.0.0
 * @version 1.0.2
 */
function parseJSON(response) {
	// console.log(response);
	return response.json();
}

/**
 * Ajax転送処理
 *
 * @param   {string}                        sendURL             転送先URL
 * @param   {FormData}                      [form]              転送するForm Data(無くても問題ない)
 * @param   {string}                        [methodType='POST'] 転送メソッド
 * @returns {Promise.JSON|Promise.Error}                        JSONデータもしくはエラー内容
 * @since   1.0.0
 * @version 1.0.2
 */
function SendAjax(sendURL, form, methodType) {
	return new Promise(function (resolve, reject) {
		if (self.fetch) {
			let sendStruct;
			let url;

			// POSTとGETでは転送処理が異なるのでここで処理を行う
			if (methodType === 'POST' || methodType === 'post') {
				url = sendURL;
				sendStruct = {
					method: methodType,
					body:   form
				};
			} else {
				url = sendURL + '?';

				// GETのURLを作ってくれるらしい
				const params = new URLSearchParams();
				// MicrosoftEdgeは未対応のための処置(対策になっていない)
				if (form.keys !== undefined) {
					for (let a of form.keys()) {
						params.set(a, form.get(a));
					}
				}
				url += params;
				sendStruct = {
					method: methodType,
				};
			}

			fetch(url, sendStruct)
				.then(checkStatus)
				.then(parseJSON)
				.then(function (json) {
					resolve(json);
				})
				.catch(function (error) {
					reject(error);
				});
		} else {
			// Fetch API未対応時の処理
			let xhr = new XMLHttpRequest();
			xhr.open('POST', sendURL, true);
			xhr.addEventListener('load', function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					resolve(xhr.response);
				}
			});

			xhr.addEventListener('error', function (error) {
				reject(error);
			});

			xhr.addEventListener('timeout', function () {
				reject('connection timeout');
			});

			xhr.timeout = 30000;
			xhr.send(form);
		}
	});
}

/**
 * ランダムワード取得
 *
 * @async
 * @returns {Promise}   終了コード
 * @since   1.0.0
 * @version 1.0.2
 */
async function getrandomWord() {
	return new Promise(function (resolve, reject) {
		SendAjax('../json/randomWord.json', new FormData(), 'GET')
			.then(function (json) {
				// console.log(json);
				resolve(json);
			})
			.catch(function (error) {
				console.error('request failed', error);
				// document.getElementById('errors').appendChild(document.createTextNode(event.toString));
				reject(error);
			});
	});
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Task

/**
 * Worker Task
 */
self.addEventListener('message', async function (event) {
	console.log('Worker Task: Running task.');

	// 送られてきたデータを格納
	const temp = event.data;
	await getrandomWord()
		.then(function (json) {
			randomWordList = json;
		}).catch(function (error) {
			console.error(error);
		});
	let listCount = 0;

	switch (temp.mode) {
	case 'createRandList':
		console.log('Worker Task: Create Random Word List');
		for (let dataTemp of randomWordList) {
			let tagText = '';
			let TagSQL = '';
			for (let searchTag of dataTemp.tags) {
				if (!randomWordTags.includes(searchTag, 0)) {
					randomWordTags.push(searchTag);
				}
				tagText += '<li><a data-tag="' + searchTag + '">' + searchTag + '</a></li>';
				TagSQL += '"' + searchTag + '", ';
			}
			TagSQL = TagSQL.slice(0, TagSQL.length - 2);

			sendList = {
				'mode': 'listResult',
				'post': '<dt id="wordID' + ++listCount + '"><h3>' + dataTemp.title + '</h3><h4>出典: ' + dataTemp.original + '</h4></dt><dd>' + dataTemp.summary + '<div class="boxTag"><ul class="tagList">' + tagText + '</ul></div></dd>',
				// 'SQL': 'INSERT INTO `random_word` (`title`, `original`, `summary`, `tag`) VALUES (\'' + dataTemp.title.replace('\'', '\\\'') + '\', \'' + dataTemp.original.replace('\'', '\\\'') + '\', \'' + dataTemp.summary.replace('\'', '\\\'') + '\', \'' + TagSQL.replace('\'', '\\\'') + '\');'
			};
			postMessage(sendList);
			// console.log(sendList.SQL);
		}

		// タグリストの生成
		randomWordTags.sort();
		console.log(randomWordTags);
		sendList = {
			'mode': 'tagList',
			'post': randomWordTags
		};
		postMessage(sendList);
		break;
	default:
		console.log('Worker Task: Task mode "' + temp.mode + '" is not found.');
		break;
	}
});

console.log('Worker task is now running.');
