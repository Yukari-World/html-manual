/**
 * @file Worker Task
 *
 * @module  manual-worker
 * @since   1.0.0
 * @version 1.0.1
 */

// Init
// SendAjax関数の呼び出し
// import { SendAjax } from './ajax-response.js';

/**
 * ランダムワードマニア
 * @constant
 * @type {JSON}
 */
let randomWordList;
let randomWordTags = [];

/**
 * HTTPステータスコードの確認
 *
 * @param   {Response}       response    レスポンスデータ
 * @returns {Response|Error}             HTTPステータスコードが200番台ならレスポンスデータ、そうでなければエラー
 * @since   1.0.0
 * @version 1.0.0
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
 * @version 1.0.0
 */
function parseJSON(response) {
	// console.log(response);
	return response.json();
}

/**
 * Ajax転送処理
 *
 * @param   {string}                        sendURL 転送先URL
 * @param   {FormData}                      [form]  転送するForm Data(無くても問題ない)
 * @returns {Promise.JSON|Promise.Error}            JSONデータもしくはエラー内容
 * @since   1.0.0
 * @version 1.0.0
 */
function SendAjax(sendURL, form) {
	return new Promise(function (resolve, reject) {
		if (self.fetch) {
			fetch(sendURL, {
				method: 'POST',
				body: form
			})
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
 * @version 1.0.1
 */
async function getrandomWord() {
	return new Promise(function (resolve, reject)  {
		SendAjax('../json/randomWord.json')
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
			for (let searchTag of dataTemp.tags) {
				if (!randomWordTags.includes(searchTag, 0)) {
					randomWordTags.push(searchTag);
				}
			}
			postMessage('<dt id="' + ++listCount + '"><h3>' + dataTemp.title + '</h3><h4>出典: ' + dataTemp.original + '</h4></dt><dd>' + dataTemp.summary + '</dd>');
		}
		randomWordTags.sort();
		console.log(randomWordTags);
		break;
	}
});

console.log('Worker task is now running.');
