/**
 * @fileOverview マニュアル用JavaScript
 * @version 1.0.0
 * @since 1.0.0
 */

// Init
const imdWidth = 992;
let bmenuToggle = false;
let bwordDecide = false;

// SendAjax関数の呼び出し
import {SendAjax} from './ajax-response.js';

/**
 * ランダムワードマニア
 * @const {string[][]}
 */
let randomWordList;
let xorRand;

/**
 * Xor Shift乱数
 *
 * @type {class}
 * @since   1.1.0
 * @version 1.2.0
 */
class xorShift {
	/**
	 * コンストラクタメソッド
	 * @constructor
	 * @param {number} w Seed Number
	 */
	constructor(w = Math.floor(Date.now() / 1000)) {
		let dateTemp = new Date();
		/**
		 * 乱数 X
		 *
		 * 値は以下の何れかから大きい値を選択
		 * <ul>
		 * <li>Day ^ Month / 2</li>
		 * <li>Month * Day * max(Seconds, 5) * max(Minites, 3)</li>
		 * </ul>
		 * @type {number}
		 */
		this.x = Math.max(Math.floor(dateTemp.getDay() ** (dateTemp.getMonth() / 2)), dateTemp.getMonth() * dateTemp.getDay() * Math.max(dateTemp.getSeconds(), 5) * Math.max(dateTemp.getMinutes(), 3)); // 123456789

		/**
		 * 乱数 Y
		 *
		 * max(Seconds, 5) ^ floor(max(Minites, 10) / 10) + max(Seconds, 1) * max(Minites, 1) * floor(Year / 10)
		 * @type {number}
		 */
		this.y = Math.max(Math.max(dateTemp.getSeconds(), 5) ** Math.floor(Math.max(dateTemp.getMinutes(), 10) / 10) + Math.max(dateTemp.getSeconds(), 1) * Math.max(dateTemp.getMinutes(), 1) * Math.floor(dateTemp.getFullYear() / 10)); // 362436069

		/**
		 * 乱数 Z
		 *
		 * randomWordList.length + (配列randomWordListの2, 3, 5, 7 の文字列の文字数の和) * (配列randomWordListの11, 13, 17, 19 の文字列の文字数の和) * (配列randomWordListの23, 29 の文字列の文字数の和) * (配列randomWordListの31, 37 の文字列の文字数の和)
		 * @type {number}
		 */
		this.z = randomWordList.length + (randomWordList[2].summary.length + randomWordList[3].summary.length + randomWordList[5].summary.length + randomWordList[7].summary.length) * (randomWordList[11].summary.length + randomWordList[13].summary.length + randomWordList[17].summary.length + randomWordList[19].summary.length) * (randomWordList[23].summary.length + randomWordList[29].summary.length) * (randomWordList[31].summary.length + randomWordList[37].summary.length); // 521288629;

		/**
		 * 乱数 W
		 *
		 * デフォルト初期値は現在の時間の1970/01/01 00:00:00からの秒数
		 * @type {number}
		 */
		this.w = w;
		console.log('Number X: ' + this.x);
		console.log('Number Y: ' + this.y);
		console.log('Number Z: ' + this.z);
		console.log('Number W: ' + this.w);
	}

	/**
	 * 乱数の生成
	 * @return {number} 乱数の結果
	 */
	randomInt32() {
		let t = this.x ^ this.x << 11;
		this.x = this.y;
		this.y = this.z;
		this.z = this.w;
		this.w = this.w ^ this.w >>> 19 ^ (t ^ t >>> 8);

		// console.log('Number: ' + this.w);
		return this.w;
	}

	/**
	 * 浮動少数の乱数の生成
	 * @return {number} 乱数の結果
	 */
	randomFloat() {
		let randNumber = this.randomInt32();
		if (randNumber < 0) {
			randNumber = ~randNumber;
		}
		return randNumber / (2 ** 31 - 1);
	}
}

/**
 * ランダムワード取得
 *
 * @return {Promise}    終了コード
 * @since   1.2.0
 * @version 1.2.0
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
 * 指定時間毎に実行する
 *
 * @param {number} seconds 時間
 * @return {void}
 * @version 1.2.0
 * @since 1.0.0
 */
function secondsInterval(seconds = 5) {
	let bdate = new Date();
	if (bdate.getSeconds() % seconds === 0 && bwordDecide === false) {
		bwordDecide = true;
		setrandomWord();
	} else if (bdate.getSeconds() % seconds === 1 && bwordDecide === true) {
		bwordDecide = false;
	}
}

/**
 * ランダムワードの解説を出力
 *
 * @interface
 * @param  {JSON}   jsonData    JSON Data
 * @return {void}
 * @version 1.2.0
 * @since 1.0.0
 */
function randomOutput(jsonData) {
	// Init
	const textRandom = document.getElementById('randomOutput');
	let dl = document.createElement('dl');
	for (let data_t of jsonData) {
		let dt = document.createElement('dt');
		let dd = document.createElement('dd');

		dt.innerHTML = '<h3>' + data_t.title + '</h3><h4>出典: ' + data_t.original + '</h4>';
		dd.innerHTML = data_t.summary;

		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	textRandom.innerHTML = '';
	textRandom.appendChild(dl);
}

/**
 * ランダムワードの出力
 *
 * @interface
 * @return {void}
 * @version 1.2.0
 * @since 1.0.0
 */
function setrandomWord() {
	document.getElementById('randomWord').innerHTML = randomWordList[Math.floor(xorRand.randomFloat() * randomWordList.length)].title;
}

window.onresize = function () {
	if (window.innerWidth <= imdWidth && bmenuToggle === false) {
		document.getElementById('menu').setAttribute('style', 'display: none');
	} else if (window.innerWidth > imdWidth || bmenuToggle === true) {
		document.getElementById('menu').removeAttribute('style');
	}
};

/**
 * HTMLの読み込み終了時に行われれる処理
 */
document.addEventListener('DOMContentLoaded', async function () {
// document.addEventListener('DOMContentLoaded', function () {
	randomWordList = await getrandomWord();
	xorRand = new xorShift();

	if (window.innerWidth <= 992 && bmenuToggle === false) {
		document.getElementById('menu').setAttribute('style', 'display: none');
	} else if (bmenuToggle === true) {
		document.getElementById('menu').removeAttribute('style');
	}

	/**
	 * 現在の個数
	 * @const {Element}
	 */
	const cntRandom = document.getElementById('countRandom');
	if (cntRandom !== null) {
		cntRandom.textContent = randomWordList.length;
	}

	/**
	 * ランダムワードの出力位置
	 * @const {Element}
	 */
	const textRandom = document.getElementById('randomOutput');
	if (textRandom !== null) {
		randomOutput(randomWordList);
	}

	document.getElementById('menuBtn').addEventListener('click', function () {
		if (!bmenuToggle) {
			bmenuToggle = true;
			document.getElementById('menu').removeAttribute('style');
		} else {
			bmenuToggle = false;
			document.getElementById('menu').setAttribute('style', 'display: none');
		}
	});

	setrandomWord();

	setInterval(function () {
		secondsInterval(10);
	}, 50);
});
