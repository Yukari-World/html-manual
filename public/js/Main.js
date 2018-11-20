/**
 * @file マニュアル用JavaScript
 *
 * @module  manual
 * @since   1.0.0
 * @version 1.3.6
 */

// Init
// SendAjax関数の呼び出し
import { SendAjax } from './ajax-response.js';

// const imdWidth = 992;
/**
 * メニューカテゴリリスト
 * @constant
 * @default
 * @type {string[]}
 */
const sideList = [
	'Main',
	'CSS',
	'HTML',
	'JavaScript',
	'Language',
	'Node',
	'PHP',
	'SCSS',
	'SQL',
	'Wordpress',
	'Other',
];

let bWordDecide = false;
let sideToggle = [];
/**
 * ランダムワードマニア
 *
 * @constant
 * @property {object[]}  randomWordList            項目
 * @property {string}    randomWordList.title      タイトル
 * @property {string}    randomWordList.original   引用元
 * @property {string}    randomWordList.summary    概要
 * @type     {object[]}
 */
let randomWordList;
let xorRand;

/**
 * Xor Shift乱数
 *
 * @type    {class}
 * @since   1.1.0
 * @version 1.3.6
 */
class XorShift {
	/**
	 * コンストラクタメソッド
	 *
	 * @constructs
	 * @param {number} [w=Math.floor(Date.now() / 1000)] Seed Number
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
		 *
		 * @default max(Day ^ Month / 2, Month * Day * max(Seconds, 5) * max(Minites, 3))
		 * @type {number}
		 */
		this.x = Math.max(Math.floor(dateTemp.getDay() ** (dateTemp.getMonth() / 2)), dateTemp.getMonth() * dateTemp.getDay() * Math.max(dateTemp.getSeconds(), 5) * Math.max(dateTemp.getMinutes(), 3)); // 123456789

		/**
		 * 乱数 Y
		 *
		 * @default max(Seconds, 5) ^ floor(max(Minites, 10) / 10) + max(Seconds, 1) * max(Minites, 1) * floor(Year / 10)
		 * @type {number}
		 */
		this.y = Math.max(Math.max(dateTemp.getSeconds(), 5) ** Math.floor(Math.max(dateTemp.getMinutes(), 10) / 10) + Math.max(dateTemp.getSeconds(), 1) * Math.max(dateTemp.getMinutes(), 1) * Math.floor(dateTemp.getFullYear() / 10)); // 362436069

		/**
		 * 乱数 Z
		 *
		 * @default randomWordList.length + (配列randomWordListの2, 3, 5, 7 の文字列の文字数の和) * (配列randomWordListの11, 13, 17, 19 の文字列の文字数の和) * (配列randomWordListの23, 29 の文字列の文字数の和) * (配列randomWordListの31, 37 の文字列の文字数の和)
		 * @type {number}
		 */
		this.z = randomWordList.length + (randomWordList[2].summary.length + randomWordList[3].summary.length + randomWordList[5].summary.length + randomWordList[7].summary.length) * (randomWordList[11].summary.length + randomWordList[13].summary.length + randomWordList[17].summary.length + randomWordList[19].summary.length) * (randomWordList[23].summary.length + randomWordList[29].summary.length) * (randomWordList[31].summary.length + randomWordList[37].summary.length); // 521288629;

		/**
		 * 乱数 W
		 *
		 * デフォルト初期値は現在の時間の1970/01/01 00:00:00からの秒数
		 *
		 * @type {number}
		 */
		this.w = w;
		console.log('Seed Info:');
		console.log('X: ' + this.x);
		console.log('Y: ' + this.y);
		console.log('Z: ' + this.z);
		console.log('W: ' + this.w);
	}

	/**
	 * 乱数の生成
	 *
	 * @returns {number} 乱数の結果
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
	 *
	 * @returns {number} 乱数の結果
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
 * ローカルストレージの環境が利用可能か調べる関数
 *
 * {@link https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API MDN}より参照
 *
 * @param   {string}    type    調べる項目
 * @returns {boolean}           利用可能かのbool
 * @since   1.3.0
 * @version 1.3.6
 */
function storageAvailable(type) {
	let storage = window[type];
	try {
		let	x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0;
	}
}

/**
 * ランダムワード取得
 *
 * @returns {Promise}   終了コード
 * @requires module:ajax-response/SendAjax
 * @since   1.2.0
 * @version 1.3.6
 */
function getrandomWord() {
	return new Promise(function (resolve, reject) {
		SendAjax('json/randomWord.json')
			.then(function (json) {
				// console.log(json);
				resolve(json);
			})
			.catch(function (error) {
				console.error('request failed', error);
				reject(error);
			});
	});
}

/**
 * 指定時間毎に実行する
 *
 * @param   {number}    [seconds=5]  更新間隔(秒)
 * @returns {void}
 * @since   1.0.0
 * @version 1.3.6
 */
function secondsInterval(seconds = 5) {
	let bdate = new Date();
	if (bdate.getSeconds() % seconds === 0 && bWordDecide === false) {
		bWordDecide = true;
		setrandomWord();
	} else if (bdate.getSeconds() % seconds === 1 && bWordDecide === true) {
		bWordDecide = false;
	}
}

/**
 * ランダムワードの解説を出力
 *
 * @async
 * @param   {JSON}  jsonData    JSON Data
 * @returns {void}
 * @since   1.0.0
 * @version 1.3.6
 */
async function randomOutput(jsonData) {
	// Init
	const textRandom = document.getElementById('randomOutput');
	const dl = document.createElement('dl');
	let listCount = 0;

	// リストを置く場所を予め作る
	dl.setAttribute('id', 'RandomList');
	textRandom.innerHTML = '';
	textRandom.appendChild(dl);

	const randomList = document.getElementById('RandomList');

	// Workerの使用可否の確認
	if (window.Worker) {
		/**
		 * Workerの読み込み
		 * 相対パスで読み込む場合実行するHTMLからの相対パスなので要注意
		 */
		// const worker = new Worker('js/WorkerTask.js', { type: 'module' });
		const worker = new Worker('js/WorkerTask.js');

		worker.addEventListener('message', function (event) {
			randomList.innerHTML += event.data;
		});
		worker.addEventListener('messageerror', function (event) {
			console.error('Task failed', event.data);
		});

		// JSONデータを丸投げ
		worker.postMessage({'mode': 'createRandList'});
	} else {
		for (let dataTemp of jsonData) {
			const dt = document.createElement('dt');
			const dd = document.createElement('dd');

			dt.setAttribute('id', 'wordID' + ++listCount);

			dt.innerHTML = '<h3>' + dataTemp.title + '</h3><h4>出典: ' + dataTemp.original + '</h4>';
			dd.innerHTML = dataTemp.summary;

			randomList.appendChild(dt);
			randomList.appendChild(dd);
		}
	}
}

/**
 * ランダムワードの出力
 *
 * @returns {void}
 * @since   1.0.0
 * @version 1.3.6
 */
function setrandomWord() {
	let wordNum = Math.floor(xorRand.randomFloat() * randomWordList.length);
	document.getElementById('randomWord').setAttribute('href', 'scp-randomWord.html#wordID' + (wordNum + 1));
	document.getElementById('randomWord').innerHTML =  randomWordList[wordNum].title;
}

/**
 * HTMLの読み込み終了時に行われれる処理
 */
document.addEventListener('DOMContentLoaded', async function () {
	const isEnableStorage = storageAvailable('localStorage');
	await getrandomWord()
		.then(function (json) {
			randomWordList = json;
		})
		.catch(function (error) {
			console.error(error);
		});
	xorRand = new XorShift();

	document.getElementById('expandAll').addEventListener('click', function () {
		for (let sideName of sideList) {
			let btnElement = document.getElementById('btn' + sideName);
			let linkElement = document.getElementById('link' + sideName);

			// trueに変更
			linkElement.checked = true;
			sideToggle[sideName] = 'true';
			btnElement.textContent = '-';
			// ローカルストレージサポートの確認
			if (isEnableStorage) {
				localStorage.setItem(sideName + 'Toggle', 'true');
			}
		}
	});

	document.getElementById('collapseAll').addEventListener('click', function () {
		for (let sideName of sideList) {
			const btnElement = document.getElementById('btn' + sideName);
			const linkElement = document.getElementById('link' + sideName);

			// falseに変更
			linkElement.checked = false;
			sideToggle[sideName] = 'false';
			btnElement.textContent = '+';
			// ローカルストレージサポートの確認
			if (isEnableStorage) {
				localStorage.setItem(sideName + 'Toggle', 'false');
			}
		}
	});

	// サイドバーの処理
	// ローカルストレージサポートの確認
	if (storageAvailable('localStorage')) {
		for (let sideName of sideList) {
			const btnElement = document.getElementById('btn' + sideName);
			const linkElement = document.getElementById('link' + sideName);
			// ローカルストレージから情報を取得
			sideToggle[sideName] = localStorage.getItem(sideName + 'Toggle');

			// 初期フラグの設定
			// フラグを基に隠すかの指定
			if (sideToggle[sideName] === null || sideToggle[sideName] === 'false') {
				// Null
			} else {
				btnElement.textContent = '-';
				linkElement.checked = true;
			}

			// イベントの登録
			linkElement.addEventListener('change', function () {
				// フラグを基に隠すかの指定
				if (sideToggle[sideName] === null || sideToggle[sideName] === 'false') {
					sideToggle[sideName] = 'true';
					localStorage.setItem(sideName + 'Toggle', 'true');
					btnElement.textContent = '-';
				} else {
					sideToggle[sideName] = 'false';
					localStorage.setItem(sideName + 'Toggle', 'false');
					btnElement.textContent = '+';
				}
			});
		}
	}

	/**
	 * 現在の個数
	 * @constant
	 * @type {HTMLElement}
	 */
	const cntRandom = document.getElementById('countRandom');
	if (cntRandom !== null) {
		cntRandom.textContent = randomWordList.length;
	}

	/**
	 * ランダムワードの出力位置
	 * @constant
	 * @type {HTMLElement}
	 */
	const textRandom = document.getElementById('randomOutput');
	if (textRandom !== null) {
		randomOutput(randomWordList);
	}

	setrandomWord();

	setInterval(function () {
		secondsInterval(10);
	}, 50);
});
