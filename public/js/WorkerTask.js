/**
 * @fileOverview Worker Task
 *
 * @since   1.0.0
 * @version 1.0.1
 */

// Init
// SendAjax関数の呼び出し
// import { SendAjax } from './ajax-response.js';

/**
 * HTTPステータスコードの確認
 *
 * @param   {Response}       response    レスポンスデータ
 * @return  {Response|Error}             HTTPステータスコードが200番台ならレスポンスデータ、そうでなければエラー
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
 * @param   {Response}   response    レスポンスデータ
 * @return  {JSON}                   レスポンスに格納されているJSONデータ
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
 * @param   {string}                     sendURL 転送先URL
 * @param   {FormData}                   form    転送するForm Data
 * @return  {Promise.JSON|Promise.Error}         JSONデータもしくはエラー内容
 * @since   1.0.0
 * @version 1.0.0
 */
function SendAjax(sendURL, form) {
	return new Promise((resolve, reject) => {
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
	});
}

/**
 * ランダムワード取得
 *
 * @return {Promise}    終了コード
 * @since   1.0.0
 * @version 1.0.1
 */
function getrandomWord() {
	return new Promise((resolve, reject) => {
		let fd = new FormData();

		SendAjax('json/randomWord.json', fd)
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
self.addEventListener('message', function (event) {
	// 送られてきたデータを格納
	const temp = event.data;
	let listCount = 0;

	for (let dataTemp of temp) {
		postMessage('<dt id="' + ++listCount + '"><h3>' + dataTemp.title + '</h3><h4>出典: ' + dataTemp.original + '</h4></dt><dd>' + dataTemp.summary + '</dd>');
	}
});

console.log('Worker task is now running.');
