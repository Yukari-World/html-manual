/**
 * @file マニュアル用コモンJavaScript
 *
 * @module  manual-common
 * @since   1.0.0
 * @version 1.0.1
 */

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Initialize

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Class

/**
 * ポップアップクラス
 *
 * @type    {class}
 * @since   1.0.1
 * @version 1.0.1
 */
export class Popup {
	/**
	 * コンストラクタメソッド
	 *
	 * @constructs
	 * @param {string}  name    Name
	 */
	constructor(name) {
		/**
		 * ポップアップ表示ID
		 * @type {string}
		 */
		this.name = 'popup_' + name;

		let nodeBody = document.body;
		const div = document.createElement('div');
		div.setAttribute('id', this.name);
		div.style.position = 'absolute';

		nodeBody.insertBefore(div, document.querySelector('header'));
	}

	show(text, top, left) {
		const div = document.getElementById(this.name);
		div.style.display = 'block';
		div.style.top = top;
		div.style.left = left;
		div.textContent = text;
	}

	move(top, left) {
		const div = document.getElementById(this.name);
		div.style.top = top;
		div.style.left = left;
	}

	hide() {
		const div = document.getElementById(this.name);
		div.style.display = 'none';
		div.textContent = '';
	}
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Export Function

/**
 * ローカルストレージの環境が利用可能か調べる関数
 *
 * {@link https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API MDN}より参照
 *
 * @param   {string}    type    調べる項目
 * @returns {boolean}           利用可能かのbool
 * @since   1.0.1
 * @version 1.0.1
 */
export function storageAvailable(type) {
	let storage = window[type];
	try {
		let x = '__storage_test__';
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
 * 日付の整合性を調べる
 *
 * @param   {string}    targetDate  対象の日付文字列
 * @returns {boolean}               整合性結果
 * @since   1.0.0
 * @version 1.0.1
 */
export function date_days(targetDate) {
	// 空文字は問答無用でエラー
	if (targetDate === '') {
		return false;
	}

	// Year/Month/Day もしくは Year-Month-Day の形式のみ許容する
	if (targetDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
		let date = new Date(targetDate);
		if (date.getFullYear() !== Number(targetDate.split('/')[0]) || date.getMonth() !== Number(targetDate.split('/')[1] - 1) || date.getDate() !== Number(targetDate.split('/')[2])) {
			return false;
		}
	} else if (targetDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
		let date = new Date(targetDate);
		if (date.getFullYear() !== Number(targetDate.split('-')[0]) || date.getMonth() !== Number(targetDate.split('-')[1] - 1) || date.getDate() !== Number(targetDate.split('-')[2])) {
			return false;
		}
	}

	return true;
}
