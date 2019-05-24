/**
 * @file マニュアル用JavaScript
 *
 * @module  manual
 * @since   1.0.0
 * @version 1.4.0
 */

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialize

// ----------------------------------------------------------------------------------------------------
// Import
import { storageAvailable } from './common.min.js';
import { SendAjax } from './ajax-response.min.js';

// ----------------------------------------------------------------------------------------------------
// Constant
/**
 * メニューカテゴリリスト
 * @constant
 * @default
 * @type {string[]}
 * @since   1.1.0
 * @version 1.4.0
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

const startTime = Date.now();

// ----------------------------------------------------------------------------------------------------
// Value
let bWordDecide = false;
// let cPopup;
let sideToggle = [];
/**
 * ランダムワードマニア
 *
 * @constant
 * @property {object[]} randomWordList          項目
 * @property {string}   randomWordList.title    タイトル
 * @property {string}   randomWordList.original 引用元
 * @property {string}   randomWordList.summary  概要
 * @type     {object[]}
 */
let randomWordList;
let xorRand;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Class

/**
 * Xor Shift乱数
 *
 * @type    {class}
 * @since   1.1.0
 * @version 1.4.0
 */
class XorShift {
	/**
	 * コンストラクタメソッド
	 *
	 * @constructs
	 * @param {number}  [w=Math.floor(Date.now() / 1000)]   Seed Number
	 */
	constructor(w = Math.floor(Date.now() / 1000)) {
		// Initialize
		let dateTemp = new Date();

		/**
		 * 乱数 X
		 *
		 * 値は以下の何れかから大きい値を選択
		 * <ul>
		 * <li>Day ^ (Month / 4 + 2)</li>
		 * <li>Month * Day * max(Seconds ^ 2, 31) * max(Minites ^ 2, 53)</li>
		 * </ul>
		 *
		 * @default max(Day ^ (Month / 4 + 2), Month * Day * max(Seconds ^ 2, 31) * max(Minites ^ 2, 53))
		 * @type {number}
		 */
		this.x = Math.max(Math.floor(dateTemp.getDate() ** ((dateTemp.getMonth() + 1) / 4 + 2)), (dateTemp.getMonth() + 1) * dateTemp.getDate() * Math.max(dateTemp.getSeconds() ** 2, 31) * Math.max(dateTemp.getMinutes() ** 2, 53)); // 123456789

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
		 * @default randomWordList.length ^ 4 + (配列randomWordListの2, 3, 5, 7 の文字列の文字数の和) * (配列randomWordListの11, 13, 17, 19 の文字列の文字数の和) * (配列randomWordListの23, 29 の文字列の文字数の和) + (配列randomWordListの31, 37 の文字列の文字数の和)
		 * @type {number}
		 */
		this.z = randomWordList.length ** 4 + (randomWordList[2].summary.length + randomWordList[3].summary.length + randomWordList[5].summary.length + randomWordList[7].summary.length) * (randomWordList[11].summary.length + randomWordList[13].summary.length + randomWordList[17].summary.length + randomWordList[19].summary.length) * (randomWordList[23].summary.length + randomWordList[29].summary.length) + (randomWordList[31].summary.length + randomWordList[37].summary.length); // 521288629;

		/**
		 * 乱数 W
		 *
		 * デフォルト初期値は現在の時間の1970/01/01 00:00:00からの秒数
		 *
		 * @type {number}
		 */
		this.w = w;
		console.log('Seed Info:');
		console.log('X: ' + this.toHex(this.x) + ' (' + this.x + ')');
		console.log('Y: ' + this.toHex(this.y) + ' (' + this.y + ')');
		console.log('Z: ' + this.toHex(this.z) + ' (' + this.z + ')');
		console.log('W: ' + this.toHex(this.w) + ' (' + this.w + ')');
	}

	/**
	 * ログ用10進数→4byte16進数出力
	 *
	 * @public
	 * @param   {number}    val 変換する10進数
	 * @returns {string}        16進数
	 * @since   1.3.7
	 * @version 1.4.0
	 */
	toHex(val) {
		return '0x' + ('00000000' + val.toString(16).toUpperCase()).substr(-8);
	}

	/**
	 * 乱数の生成
	 *
	 * @public
	 * @returns {number}    乱数の結果
	 * @since   1.1.0
	 * @version 1.4.0
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
	 * @public
	 * @returns {number}    乱数の結果
	 * @since   1.1.0
	 * @version 1.4.0
	 */
	randomFloat() {
		let randNumber = this.randomInt32();
		if (randNumber < 0) {
			randNumber = ~randNumber;
		}
		return randNumber / (2 ** 31 - 1);
	}
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Function

/**
 * ランダムワード取得
 *
 * @returns  {Promise}  終了コード
 * @requires module:ajax-response
 * @since    1.2.0
 * @version  1.4.0
 */
function getRandomWord() {
	return new Promise(function (resolve, reject) {
		SendAjax('json/randomWord.json', new FormData(), 'GET')
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
 * @param   {number}    [seconds=5] 更新間隔(秒)
 * @returns {void}
 * @since   1.0.0
 * @version 1.4.0
 */
function secondsInterval(seconds = 5) {
	// Initialize
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
 * @version 1.4.0
 */
async function randomOutput(jsonData) {
	// Initialize
	const textRandom = document.getElementById('randomOutput');
	const dl = document.createElement('dl');
	let listCount = 0;

	// リストを置く場所を予め作る
	dl.setAttribute('id', 'RandomList');
	textRandom.textContent = '';
	textRandom.appendChild(dl);

	const randomList = document.getElementById('RandomList');

	// Workerの使用可否の確認
	if (window.Worker) {
		/**
		 * Workerの読み込み
		 * 相対パスで読み込む場合実行するHTMLからの相対パスなので要注意
		 */
		// const worker = new Worker('js/WorkerTask.js', { type: 'module' });
		const worker = new Worker('js/WorkerTask.min.js');

		// Workerからデータを受け取る時の処理
		// Switch文を利用することで処理分岐を作成している
		worker.addEventListener('message', function (event) {
			let temp = event.data;
			switch (temp.mode) {
			case 'listResult':
				randomList.insertAdjacentHTML('beforeend', temp.post);
				break;
			case 'tagList':
				console.log(temp.post);
				break;
			default:
				console.log('Task mode "' + temp.mode + '" is not found.');
				break;
			}
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

			dt.insertAdjacentHTML('beforeend', '<h3>' + dataTemp.title + '</h3><h4>出典: ' + dataTemp.original + '</h4>');
			dd.insertAdjacentHTML('beforeend', dataTemp.summary);

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
 * @version 1.4.0
 */
function setrandomWord() {
	// 乱数の生成
	let wordNum = Math.floor(xorRand.randomFloat() * randomWordList.length);
	const randomWord = document.getElementById('randomWord');

	randomWord.setAttribute('href', 'scp-randomWord.html#wordID' + (wordNum + 1));
	randomWord.textContent = '';
	randomWord.insertAdjacentHTML('beforeend', randomWordList[wordNum].title);
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// DOM Content
// HTMLの読み込み完了時に行われれる処理
document.addEventListener('DOMContentLoaded', async function () {
	// Initialize
	// ローカルストレージサポートの確認
	const isEnableStorage = storageAvailable('localStorage');

	await getRandomWord()
		.then(function (json) {
			randomWordList = json;
		})
		.catch(function (error) {
			console.error(error);
		});
	xorRand = new XorShift();
	// cPopup = new Popup('test');

	// let anchorList = document.querySelectorAll('a[title]');
	// anchorList.forEach(function (anchor) {
	// 	1;
	// });

	// ----------------------------------------------------------------------------------------------------
	// 全て展開
	// この作成方法はlet + constだからこそ成り立っており、varでは作成できない
	document.getElementById('expandAll').addEventListener('click', function () {
		for (let sideName of sideList) {
			const btnElement = document.getElementById('btn' + sideName);
			const linkElement = document.getElementById('link' + sideName);

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

	// ----------------------------------------------------------------------------------------------------
	// 全て折りたたむ
	// この作成方法はlet + constだからこそ成り立っており、varでは作成できない
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

	// ----------------------------------------------------------------------------------------------------
	// サイドバーの処理
	for (let sideName of sideList) {
		const btnElement = document.getElementById('btn' + sideName);
		const linkElement = document.getElementById('link' + sideName);

		// ローカルストレージから情報を取得
		// 対応していない場合、常に折りたたんだ状態にする
		if (isEnableStorage) {
			sideToggle[sideName] = localStorage.getItem(sideName + 'Toggle');
		} else {
			sideToggle[sideName] = 'false';
		}

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
				if (isEnableStorage) {
					localStorage.setItem(sideName + 'Toggle', 'true');
				}
				btnElement.textContent = '-';
			} else {
				sideToggle[sideName] = 'false';
				if (isEnableStorage) {
					localStorage.setItem(sideName + 'Toggle', 'false');
				}
				btnElement.textContent = '+';
			}
		});
	}

	// ----------------------------------------------------------------------------------------------------
	/**
	 * 現在の個数
	 * @constant
	 * @type {HTMLElement}
	 */
	const cntRandom = document.getElementById('countRandom');
	if (cntRandom !== null) {
		cntRandom.textContent = randomWordList.length;
	}

	// ----------------------------------------------------------------------------------------------------
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

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// load
// 全ての読み込みが完了すると行われる処理
window.addEventListener('load', function () {
	document.getElementById('LoadTime').textContent =  Date.now() - startTime + 'ms';
});
