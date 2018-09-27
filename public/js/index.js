/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./HTML Manual/js/Main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./HTML Manual/js/Main.js":
/*!********************************!*\
  !*** ./HTML Manual/js/Main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ajax_response_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax-response.js */ \"./HTML Manual/js/ajax-response.js\");\n/**\n * @fileOverview マニュアル用JavaScript\n * @version 1.0.0\n * @since 1.0.0\n */\n// Init\n// const imdWidth = 992;\nconst sideList = ['Main', 'CSS', 'HTML', 'JavaScript', 'Language', 'Node', 'PHP', 'SCSS', 'SQL', 'Other']; // let bmenuToggle = false;\n\nlet bwordDecide = false;\nlet sideToggle = []; // SendAjax関数の呼び出し\n\n\n/**\n * ランダムワードマニア\n * @const {string[][]}\n */\n\nlet randomWordList;\nlet xorRand;\n/**\n * Xor Shift乱数\n *\n * @type {class}\n * @since   1.1.0\n * @version 1.2.0\n */\n\nclass xorShift {\n  /**\n   * コンストラクタメソッド\n   * @constructor\n   * @param {number} w Seed Number\n   */\n  constructor(w = Math.floor(Date.now() / 1000)) {\n    let dateTemp = new Date();\n    /**\n     * 乱数 X\n     *\n     * 値は以下の何れかから大きい値を選択\n     * <ul>\n     * <li>Day ^ Month / 2</li>\n     * <li>Month * Day * max(Seconds, 5) * max(Minites, 3)</li>\n     * </ul>\n     * @type {number}\n     */\n\n    this.x = Math.max(Math.floor(dateTemp.getDay() ** (dateTemp.getMonth() / 2)), dateTemp.getMonth() * dateTemp.getDay() * Math.max(dateTemp.getSeconds(), 5) * Math.max(dateTemp.getMinutes(), 3)); // 123456789\n\n    /**\n     * 乱数 Y\n     *\n     * max(Seconds, 5) ^ floor(max(Minites, 10) / 10) + max(Seconds, 1) * max(Minites, 1) * floor(Year / 10)\n     * @type {number}\n     */\n\n    this.y = Math.max(Math.max(dateTemp.getSeconds(), 5) ** Math.floor(Math.max(dateTemp.getMinutes(), 10) / 10) + Math.max(dateTemp.getSeconds(), 1) * Math.max(dateTemp.getMinutes(), 1) * Math.floor(dateTemp.getFullYear() / 10)); // 362436069\n\n    /**\n     * 乱数 Z\n     *\n     * randomWordList.length + (配列randomWordListの2, 3, 5, 7 の文字列の文字数の和) * (配列randomWordListの11, 13, 17, 19 の文字列の文字数の和) * (配列randomWordListの23, 29 の文字列の文字数の和) * (配列randomWordListの31, 37 の文字列の文字数の和)\n     * @type {number}\n     */\n\n    this.z = randomWordList.length + (randomWordList[2].summary.length + randomWordList[3].summary.length + randomWordList[5].summary.length + randomWordList[7].summary.length) * (randomWordList[11].summary.length + randomWordList[13].summary.length + randomWordList[17].summary.length + randomWordList[19].summary.length) * (randomWordList[23].summary.length + randomWordList[29].summary.length) * (randomWordList[31].summary.length + randomWordList[37].summary.length); // 521288629;\n\n    /**\n     * 乱数 W\n     *\n     * デフォルト初期値は現在の時間の1970/01/01 00:00:00からの秒数\n     * @type {number}\n     */\n\n    this.w = w;\n    console.log('Number X: ' + this.x);\n    console.log('Number Y: ' + this.y);\n    console.log('Number Z: ' + this.z);\n    console.log('Number W: ' + this.w);\n  }\n  /**\n   * 乱数の生成\n   * @return {number} 乱数の結果\n   */\n\n\n  randomInt32() {\n    let t = this.x ^ this.x << 11;\n    this.x = this.y;\n    this.y = this.z;\n    this.z = this.w;\n    this.w = this.w ^ this.w >>> 19 ^ (t ^ t >>> 8); // console.log('Number: ' + this.w);\n\n    return this.w;\n  }\n  /**\n   * 浮動少数の乱数の生成\n   * @return {number} 乱数の結果\n   */\n\n\n  randomFloat() {\n    let randNumber = this.randomInt32();\n\n    if (randNumber < 0) {\n      randNumber = ~randNumber;\n    }\n\n    return randNumber / (2 ** 31 - 1);\n  }\n\n}\n/**\n * MDN\n *\n * @param {String} type 調べる項目\n * @return {boolean} 利用可能かのbool\n */\n\n\nfunction storageAvailable(type) {\n  let storage = window[type];\n\n  try {\n    let x = '__storage_test__';\n    storage.setItem(x, x);\n    storage.removeItem(x);\n    return true;\n  } catch (e) {\n    return e instanceof DOMException && ( // everything except Firefox\n    e.code === 22 || // Firefox\n    e.code === 1014 || // test name field too, because code might not be present\n    // everything except Firefox\n    e.name === 'QuotaExceededError' || // Firefox\n    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && // acknowledge QuotaExceededError only if there's something already stored\n    storage.length !== 0;\n  }\n}\n/**\n * ランダムワード取得\n *\n * @return {Promise}    終了コード\n * @since   1.2.0\n * @version 1.2.0\n */\n\n\nfunction getrandomWord() {\n  return new Promise((resolve, reject) => {\n    let fd = new FormData();\n    Object(_ajax_response_js__WEBPACK_IMPORTED_MODULE_0__[\"SendAjax\"])('json/randomWord.json', fd).then(function (json) {\n      // console.log(json);\n      resolve(json);\n    }).catch(function (error) {\n      console.error('request failed', error); // document.getElementById('errors').appendChild(document.createTextNode(event.toString));\n\n      reject(error);\n    });\n  });\n}\n/**\n * 指定時間毎に実行する\n *\n * @param {number} seconds 時間\n * @return {void}\n * @version 1.2.0\n * @since 1.0.0\n */\n\n\nfunction secondsInterval(seconds = 5) {\n  let bdate = new Date();\n\n  if (bdate.getSeconds() % seconds === 0 && bwordDecide === false) {\n    bwordDecide = true;\n    setrandomWord();\n  } else if (bdate.getSeconds() % seconds === 1 && bwordDecide === true) {\n    bwordDecide = false;\n  }\n}\n/**\n * ランダムワードの解説を出力\n *\n * @interface\n * @param  {JSON}   jsonData    JSON Data\n * @return {void}\n * @version 1.2.0\n * @since 1.0.0\n */\n\n\nfunction randomOutput(jsonData) {\n  // Init\n  const textRandom = document.getElementById('randomOutput');\n  let dl = document.createElement('dl');\n\n  for (let data_t of jsonData) {\n    let dt = document.createElement('dt');\n    let dd = document.createElement('dd');\n    dt.innerHTML = '<h3>' + data_t.title + '</h3><h4>出典: ' + data_t.original + '</h4>';\n    dd.innerHTML = data_t.summary;\n    dl.appendChild(dt);\n    dl.appendChild(dd);\n  }\n\n  textRandom.innerHTML = '';\n  textRandom.appendChild(dl);\n}\n/**\n * ランダムワードの出力\n *\n * @interface\n * @return {void}\n * @version 1.2.0\n * @since 1.0.0\n */\n\n\nfunction setrandomWord() {\n  document.getElementById('randomWord').innerHTML = randomWordList[Math.floor(xorRand.randomFloat() * randomWordList.length)].title;\n}\n/**\n * HTMLの読み込み終了時に行われれる処理\n */\n\n\ndocument.addEventListener('DOMContentLoaded', async function () {\n  randomWordList = await getrandomWord();\n  xorRand = new xorShift();\n  let isEnableStorage = storageAvailable('localStorage');\n  document.getElementById('expandAll').addEventListener('click', function () {\n    for (let sideName of sideList) {\n      let btnElement = document.getElementById('btn' + sideName);\n      let linkElement = document.getElementById('link' + sideName); // trueに変更\n\n      linkElement.checked = true;\n      sideToggle[sideName] = 'true';\n      btnElement.textContent = '-'; // ローカルストレージサポートの確認\n\n      if (isEnableStorage) {\n        localStorage.setItem(sideName + 'Toggle', 'true');\n      }\n    }\n  });\n  document.getElementById('collapseAll').addEventListener('click', function () {\n    for (let sideName of sideList) {\n      let btnElement = document.getElementById('btn' + sideName);\n      let linkElement = document.getElementById('link' + sideName); // falseに変更\n\n      linkElement.checked = false;\n      sideToggle[sideName] = 'false';\n      btnElement.textContent = '+'; // ローカルストレージサポートの確認\n\n      if (isEnableStorage) {\n        localStorage.setItem(sideName + 'Toggle', 'false');\n      }\n    }\n  }); // サイドバーの処理\n  // ローカルストレージサポートの確認\n\n  if (storageAvailable('localStorage')) {\n    for (let sideName of sideList) {\n      let btnElement = document.getElementById('btn' + sideName);\n      let linkElement = document.getElementById('link' + sideName); // ローカルストレージから情報を取得\n\n      sideToggle[sideName] = localStorage.getItem(sideName + 'Toggle'); // フラグを元に隠すかの指定\n\n      if (sideToggle[sideName] === null || sideToggle[sideName] === 'false') {// Null\n      } else {\n        btnElement.textContent = '-';\n        linkElement.checked = true;\n      } // イベントの登録\n\n\n      linkElement.addEventListener('change', function () {\n        if (sideToggle[sideName] === null || sideToggle[sideName] === 'false') {\n          sideToggle[sideName] = 'true';\n          localStorage.setItem(sideName + 'Toggle', 'true');\n          btnElement.textContent = '-';\n        } else {\n          sideToggle[sideName] = 'false';\n          localStorage.setItem(sideName + 'Toggle', 'false');\n          btnElement.textContent = '+';\n        }\n      });\n    }\n  }\n  /**\n   * 現在の個数\n   * @const {Element}\n   */\n\n\n  const cntRandom = document.getElementById('countRandom');\n\n  if (cntRandom !== null) {\n    cntRandom.textContent = randomWordList.length;\n  }\n  /**\n   * ランダムワードの出力位置\n   * @const {Element}\n   */\n\n\n  const textRandom = document.getElementById('randomOutput');\n\n  if (textRandom !== null) {\n    randomOutput(randomWordList);\n  }\n\n  setrandomWord();\n  setInterval(function () {\n    secondsInterval(10);\n  }, 50);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9IVE1MIE1hbnVhbC9qcy9NYWluLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vSFRNTCBNYW51YWwvanMvTWFpbi5qcz9iNzU1Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVPdmVydmlldyDjg57jg4vjg6XjgqLjg6vnlKhKYXZhU2NyaXB0XG4gKiBAdmVyc2lvbiAxLjAuMFxuICogQHNpbmNlIDEuMC4wXG4gKi9cblxuLy8gSW5pdFxuLy8gY29uc3QgaW1kV2lkdGggPSA5OTI7XG5jb25zdCBzaWRlTGlzdCA9IFtcblx0J01haW4nLFxuXHQnQ1NTJyxcblx0J0hUTUwnLFxuXHQnSmF2YVNjcmlwdCcsXG5cdCdMYW5ndWFnZScsXG5cdCdOb2RlJyxcblx0J1BIUCcsXG5cdCdTQ1NTJyxcblx0J1NRTCcsXG5cdCdPdGhlcicsXG5dO1xuXG4vLyBsZXQgYm1lbnVUb2dnbGUgPSBmYWxzZTtcbmxldCBid29yZERlY2lkZSA9IGZhbHNlO1xubGV0IHNpZGVUb2dnbGUgPSBbXTtcblxuLy8gU2VuZEFqYXjplqLmlbDjga7lkbzjgbPlh7rjgZdcbmltcG9ydCB7U2VuZEFqYXh9IGZyb20gJy4vYWpheC1yZXNwb25zZS5qcyc7XG4vKipcbiAqIOODqeODs+ODgOODoOODr+ODvOODieODnuODi+OColxuICogQGNvbnN0IHtzdHJpbmdbXVtdfVxuICovXG5sZXQgcmFuZG9tV29yZExpc3Q7XG5sZXQgeG9yUmFuZDtcblxuLyoqXG4gKiBYb3IgU2hpZnTkubHmlbBcbiAqXG4gKiBAdHlwZSB7Y2xhc3N9XG4gKiBAc2luY2UgICAxLjEuMFxuICogQHZlcnNpb24gMS4yLjBcbiAqL1xuY2xhc3MgeG9yU2hpZnQge1xuXHQvKipcblx0ICog44Kz44Oz44K544OI44Op44Kv44K/44Oh44K944OD44OJXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge251bWJlcn0gdyBTZWVkIE51bWJlclxuXHQgKi9cblx0Y29uc3RydWN0b3IodyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApKSB7XG5cdFx0bGV0IGRhdGVUZW1wID0gbmV3IERhdGUoKTtcblxuXHRcdC8qKlxuXHRcdCAqIOS5seaVsCBYXG5cdFx0ICpcblx0XHQgKiDlgKTjga/ku6XkuIvjga7kvZXjgozjgYvjgYvjgonlpKfjgY3jgYTlgKTjgpLpgbjmip5cblx0XHQgKiA8dWw+XG5cdFx0ICogPGxpPkRheSBeIE1vbnRoIC8gMjwvbGk+XG5cdFx0ICogPGxpPk1vbnRoICogRGF5ICogbWF4KFNlY29uZHMsIDUpICogbWF4KE1pbml0ZXMsIDMpPC9saT5cblx0XHQgKiA8L3VsPlxuXHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0ICovXG5cdFx0dGhpcy54ID0gTWF0aC5tYXgoTWF0aC5mbG9vcihkYXRlVGVtcC5nZXREYXkoKSAqKiAoZGF0ZVRlbXAuZ2V0TW9udGgoKSAvIDIpKSwgZGF0ZVRlbXAuZ2V0TW9udGgoKSAqIGRhdGVUZW1wLmdldERheSgpICogTWF0aC5tYXgoZGF0ZVRlbXAuZ2V0U2Vjb25kcygpLCA1KSAqIE1hdGgubWF4KGRhdGVUZW1wLmdldE1pbnV0ZXMoKSwgMykpOyAvLyAxMjM0NTY3ODlcblxuXHRcdC8qKlxuXHRcdCAqIOS5seaVsCBZXG5cdFx0ICpcblx0XHQgKiBtYXgoU2Vjb25kcywgNSkgXiBmbG9vcihtYXgoTWluaXRlcywgMTApIC8gMTApICsgbWF4KFNlY29uZHMsIDEpICogbWF4KE1pbml0ZXMsIDEpICogZmxvb3IoWWVhciAvIDEwKVxuXHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0ICovXG5cdFx0dGhpcy55ID0gTWF0aC5tYXgoTWF0aC5tYXgoZGF0ZVRlbXAuZ2V0U2Vjb25kcygpLCA1KSAqKiBNYXRoLmZsb29yKE1hdGgubWF4KGRhdGVUZW1wLmdldE1pbnV0ZXMoKSwgMTApIC8gMTApICsgTWF0aC5tYXgoZGF0ZVRlbXAuZ2V0U2Vjb25kcygpLCAxKSAqIE1hdGgubWF4KGRhdGVUZW1wLmdldE1pbnV0ZXMoKSwgMSkgKiBNYXRoLmZsb29yKGRhdGVUZW1wLmdldEZ1bGxZZWFyKCkgLyAxMCkpOyAvLyAzNjI0MzYwNjlcblxuXHRcdC8qKlxuXHRcdCAqIOS5seaVsCBaXG5cdFx0ICpcblx0XHQgKiByYW5kb21Xb3JkTGlzdC5sZW5ndGggKyAo6YWN5YiXcmFuZG9tV29yZExpc3Tjga4yLCAzLCA1LCA3IOOBruaWh+Wtl+WIl+OBruaWh+Wtl+aVsOOBruWSjCkgKiAo6YWN5YiXcmFuZG9tV29yZExpc3Tjga4xMSwgMTMsIDE3LCAxOSDjga7mloflrZfliJfjga7mloflrZfmlbDjga7lkowpICogKOmFjeWIl3JhbmRvbVdvcmRMaXN044GuMjMsIDI5IOOBruaWh+Wtl+WIl+OBruaWh+Wtl+aVsOOBruWSjCkgKiAo6YWN5YiXcmFuZG9tV29yZExpc3Tjga4zMSwgMzcg44Gu5paH5a2X5YiX44Gu5paH5a2X5pWw44Gu5ZKMKVxuXHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0ICovXG5cdFx0dGhpcy56ID0gcmFuZG9tV29yZExpc3QubGVuZ3RoICsgKHJhbmRvbVdvcmRMaXN0WzJdLnN1bW1hcnkubGVuZ3RoICsgcmFuZG9tV29yZExpc3RbM10uc3VtbWFyeS5sZW5ndGggKyByYW5kb21Xb3JkTGlzdFs1XS5zdW1tYXJ5Lmxlbmd0aCArIHJhbmRvbVdvcmRMaXN0WzddLnN1bW1hcnkubGVuZ3RoKSAqIChyYW5kb21Xb3JkTGlzdFsxMV0uc3VtbWFyeS5sZW5ndGggKyByYW5kb21Xb3JkTGlzdFsxM10uc3VtbWFyeS5sZW5ndGggKyByYW5kb21Xb3JkTGlzdFsxN10uc3VtbWFyeS5sZW5ndGggKyByYW5kb21Xb3JkTGlzdFsxOV0uc3VtbWFyeS5sZW5ndGgpICogKHJhbmRvbVdvcmRMaXN0WzIzXS5zdW1tYXJ5Lmxlbmd0aCArIHJhbmRvbVdvcmRMaXN0WzI5XS5zdW1tYXJ5Lmxlbmd0aCkgKiAocmFuZG9tV29yZExpc3RbMzFdLnN1bW1hcnkubGVuZ3RoICsgcmFuZG9tV29yZExpc3RbMzddLnN1bW1hcnkubGVuZ3RoKTsgLy8gNTIxMjg4NjI5O1xuXG5cdFx0LyoqXG5cdFx0ICog5Lmx5pWwIFdcblx0XHQgKlxuXHRcdCAqIOODh+ODleOCqeODq+ODiOWIneacn+WApOOBr+ePvuWcqOOBruaZgumWk+OBrjE5NzAvMDEvMDEgMDA6MDA6MDDjgYvjgonjga7np5LmlbBcblx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdCAqL1xuXHRcdHRoaXMudyA9IHc7XG5cdFx0Y29uc29sZS5sb2coJ051bWJlciBYOiAnICsgdGhpcy54KTtcblx0XHRjb25zb2xlLmxvZygnTnVtYmVyIFk6ICcgKyB0aGlzLnkpO1xuXHRcdGNvbnNvbGUubG9nKCdOdW1iZXIgWjogJyArIHRoaXMueik7XG5cdFx0Y29uc29sZS5sb2coJ051bWJlciBXOiAnICsgdGhpcy53KTtcblx0fVxuXG5cdC8qKlxuXHQgKiDkubHmlbDjga7nlJ/miJBcblx0ICogQHJldHVybiB7bnVtYmVyfSDkubHmlbDjga7ntZDmnpxcblx0ICovXG5cdHJhbmRvbUludDMyKCkge1xuXHRcdGxldCB0ID0gdGhpcy54IF4gdGhpcy54IDw8IDExO1xuXHRcdHRoaXMueCA9IHRoaXMueTtcblx0XHR0aGlzLnkgPSB0aGlzLno7XG5cdFx0dGhpcy56ID0gdGhpcy53O1xuXHRcdHRoaXMudyA9IHRoaXMudyBeIHRoaXMudyA+Pj4gMTkgXiAodCBeIHQgPj4+IDgpO1xuXG5cdFx0Ly8gY29uc29sZS5sb2coJ051bWJlcjogJyArIHRoaXMudyk7XG5cdFx0cmV0dXJuIHRoaXMudztcblx0fVxuXG5cdC8qKlxuXHQgKiDmta7li5XlsJHmlbDjga7kubHmlbDjga7nlJ/miJBcblx0ICogQHJldHVybiB7bnVtYmVyfSDkubHmlbDjga7ntZDmnpxcblx0ICovXG5cdHJhbmRvbUZsb2F0KCkge1xuXHRcdGxldCByYW5kTnVtYmVyID0gdGhpcy5yYW5kb21JbnQzMigpO1xuXHRcdGlmIChyYW5kTnVtYmVyIDwgMCkge1xuXHRcdFx0cmFuZE51bWJlciA9IH5yYW5kTnVtYmVyO1xuXHRcdH1cblx0XHRyZXR1cm4gcmFuZE51bWJlciAvICgyICoqIDMxIC0gMSk7XG5cdH1cbn1cblxuLyoqXG4gKiBNRE5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSDoqr/jgbnjgovpoIXnm65cbiAqIEByZXR1cm4ge2Jvb2xlYW59IOWIqeeUqOWPr+iDveOBi+OBrmJvb2xcbiAqL1xuZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG5cdGxldCBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuXHR0cnkge1xuXHRcdGxldFx0eCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcblx0XHRzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG5cdFx0c3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuXHRcdFx0Ly8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuXHRcdFx0ZS5jb2RlID09PSAyMiB8fFxuXHRcdFx0Ly8gRmlyZWZveFxuXHRcdFx0ZS5jb2RlID09PSAxMDE0IHx8XG5cdFx0XHQvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcblx0XHRcdC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcblx0XHRcdGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcblx0XHRcdC8vIEZpcmVmb3hcblx0XHRcdGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcblx0XHRcdC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG5cdFx0XHRzdG9yYWdlLmxlbmd0aCAhPT0gMDtcblx0fVxufVxuXG4vKipcbiAqIOODqeODs+ODgOODoOODr+ODvOODieWPluW+l1xuICpcbiAqIEByZXR1cm4ge1Byb21pc2V9ICAgIOe1guS6huOCs+ODvOODiVxuICogQHNpbmNlICAgMS4yLjBcbiAqIEB2ZXJzaW9uIDEuMi4wXG4gKi9cbmZ1bmN0aW9uIGdldHJhbmRvbVdvcmQoKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IGZkID0gbmV3IEZvcm1EYXRhKCk7XG5cblx0XHRTZW5kQWpheCgnanNvbi9yYW5kb21Xb3JkLmpzb24nLCBmZClcblx0XHRcdC50aGVuKGZ1bmN0aW9uIChqc29uKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKGpzb24pO1xuXHRcdFx0XHRyZXNvbHZlKGpzb24pO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcigncmVxdWVzdCBmYWlsZWQnLCBlcnJvcik7XG5cdFx0XHRcdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvcnMnKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShldmVudC50b1N0cmluZykpO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIOaMh+WumuaZgumWk+avjuOBq+Wun+ihjOOBmeOCi1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNvbmRzIOaZgumWk1xuICogQHJldHVybiB7dm9pZH1cbiAqIEB2ZXJzaW9uIDEuMi4wXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZnVuY3Rpb24gc2Vjb25kc0ludGVydmFsKHNlY29uZHMgPSA1KSB7XG5cdGxldCBiZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdGlmIChiZGF0ZS5nZXRTZWNvbmRzKCkgJSBzZWNvbmRzID09PSAwICYmIGJ3b3JkRGVjaWRlID09PSBmYWxzZSkge1xuXHRcdGJ3b3JkRGVjaWRlID0gdHJ1ZTtcblx0XHRzZXRyYW5kb21Xb3JkKCk7XG5cdH0gZWxzZSBpZiAoYmRhdGUuZ2V0U2Vjb25kcygpICUgc2Vjb25kcyA9PT0gMSAmJiBid29yZERlY2lkZSA9PT0gdHJ1ZSkge1xuXHRcdGJ3b3JkRGVjaWRlID0gZmFsc2U7XG5cdH1cbn1cblxuLyoqXG4gKiDjg6njg7Pjg4Djg6Djg6/jg7zjg4njga7op6PoqqzjgpLlh7rliptcbiAqXG4gKiBAaW50ZXJmYWNlXG4gKiBAcGFyYW0gIHtKU09OfSAgIGpzb25EYXRhICAgIEpTT04gRGF0YVxuICogQHJldHVybiB7dm9pZH1cbiAqIEB2ZXJzaW9uIDEuMi4wXG4gKiBAc2luY2UgMS4wLjBcbiAqL1xuZnVuY3Rpb24gcmFuZG9tT3V0cHV0KGpzb25EYXRhKSB7XG5cdC8vIEluaXRcblx0Y29uc3QgdGV4dFJhbmRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb21PdXRwdXQnKTtcblx0bGV0IGRsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGwnKTtcblx0Zm9yIChsZXQgZGF0YV90IG9mIGpzb25EYXRhKSB7XG5cdFx0bGV0IGR0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZHQnKTtcblx0XHRsZXQgZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkZCcpO1xuXG5cdFx0ZHQuaW5uZXJIVE1MID0gJzxoMz4nICsgZGF0YV90LnRpdGxlICsgJzwvaDM+PGg0PuWHuuWFuDogJyArIGRhdGFfdC5vcmlnaW5hbCArICc8L2g0Pic7XG5cdFx0ZGQuaW5uZXJIVE1MID0gZGF0YV90LnN1bW1hcnk7XG5cblx0XHRkbC5hcHBlbmRDaGlsZChkdCk7XG5cdFx0ZGwuYXBwZW5kQ2hpbGQoZGQpO1xuXHR9XG5cdHRleHRSYW5kb20uaW5uZXJIVE1MID0gJyc7XG5cdHRleHRSYW5kb20uYXBwZW5kQ2hpbGQoZGwpO1xufVxuXG4vKipcbiAqIOODqeODs+ODgOODoOODr+ODvOODieOBruWHuuWKm1xuICpcbiAqIEBpbnRlcmZhY2VcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKiBAdmVyc2lvbiAxLjIuMFxuICogQHNpbmNlIDEuMC4wXG4gKi9cbmZ1bmN0aW9uIHNldHJhbmRvbVdvcmQoKSB7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb21Xb3JkJykuaW5uZXJIVE1MID0gcmFuZG9tV29yZExpc3RbTWF0aC5mbG9vcih4b3JSYW5kLnJhbmRvbUZsb2F0KCkgKiByYW5kb21Xb3JkTGlzdC5sZW5ndGgpXS50aXRsZTtcbn1cblxuLyoqXG4gKiBIVE1M44Gu6Kqt44G/6L6844G/57WC5LqG5pmC44Gr6KGM44KP44KM44KM44KL5Yem55CGXG4gKi9cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG5cdHJhbmRvbVdvcmRMaXN0ID0gYXdhaXQgZ2V0cmFuZG9tV29yZCgpO1xuXHR4b3JSYW5kID0gbmV3IHhvclNoaWZ0KCk7XG5cdGxldCBpc0VuYWJsZVN0b3JhZ2UgPSBzdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKTtcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwYW5kQWxsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0Zm9yIChsZXQgc2lkZU5hbWUgb2Ygc2lkZUxpc3QpIHtcblx0XHRcdGxldCBidG5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bicgKyBzaWRlTmFtZSk7XG5cdFx0XHRsZXQgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluaycgKyBzaWRlTmFtZSk7XG5cblx0XHRcdC8vIHRydWXjgavlpInmm7Rcblx0XHRcdGxpbmtFbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0c2lkZVRvZ2dsZVtzaWRlTmFtZV0gPSAndHJ1ZSc7XG5cdFx0XHRidG5FbGVtZW50LnRleHRDb250ZW50ID0gJy0nO1xuXHRcdFx0Ly8g44Ot44O844Kr44Or44K544OI44Os44O844K444K144Od44O844OI44Gu56K66KqNXG5cdFx0XHRpZiAoaXNFbmFibGVTdG9yYWdlKSB7XG5cdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNpZGVOYW1lICsgJ1RvZ2dsZScsICd0cnVlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sbGFwc2VBbGwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRmb3IgKGxldCBzaWRlTmFtZSBvZiBzaWRlTGlzdCkge1xuXHRcdFx0bGV0IGJ0bkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuJyArIHNpZGVOYW1lKTtcblx0XHRcdGxldCBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rJyArIHNpZGVOYW1lKTtcblxuXHRcdFx0Ly8gZmFsc2XjgavlpInmm7Rcblx0XHRcdGxpbmtFbGVtZW50LmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdHNpZGVUb2dnbGVbc2lkZU5hbWVdID0gJ2ZhbHNlJztcblx0XHRcdGJ0bkVsZW1lbnQudGV4dENvbnRlbnQgPSAnKyc7XG5cdFx0XHQvLyDjg63jg7zjgqvjg6vjgrnjg4jjg6zjg7zjgrjjgrXjg53jg7zjg4jjga7norroqo1cblx0XHRcdGlmIChpc0VuYWJsZVN0b3JhZ2UpIHtcblx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oc2lkZU5hbWUgKyAnVG9nZ2xlJywgJ2ZhbHNlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyDjgrXjgqTjg4njg5Djg7zjga7lh6bnkIZcblx0Ly8g44Ot44O844Kr44Or44K544OI44Os44O844K444K144Od44O844OI44Gu56K66KqNXG5cdGlmIChzdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuXHRcdGZvciAobGV0IHNpZGVOYW1lIG9mIHNpZGVMaXN0KSB7XG5cdFx0XHRsZXQgYnRuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG4nICsgc2lkZU5hbWUpO1xuXHRcdFx0bGV0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmsnICsgc2lkZU5hbWUpO1xuXHRcdFx0Ly8g44Ot44O844Kr44Or44K544OI44Os44O844K444GL44KJ5oOF5aCx44KS5Y+W5b6XXG5cdFx0XHRzaWRlVG9nZ2xlW3NpZGVOYW1lXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHNpZGVOYW1lICsgJ1RvZ2dsZScpO1xuXG5cdFx0XHQvLyDjg5Xjg6njgrDjgpLlhYPjgavpmqDjgZnjgYvjga7mjIflrppcblx0XHRcdGlmIChzaWRlVG9nZ2xlW3NpZGVOYW1lXSA9PT0gbnVsbCB8fCBzaWRlVG9nZ2xlW3NpZGVOYW1lXSA9PT0gJ2ZhbHNlJykge1xuXHRcdFx0XHQvLyBOdWxsXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidG5FbGVtZW50LnRleHRDb250ZW50ID0gJy0nO1xuXHRcdFx0XHRsaW5rRWxlbWVudC5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8g44Kk44OZ44Oz44OI44Gu55m76YyyXG5cdFx0XHRsaW5rRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChzaWRlVG9nZ2xlW3NpZGVOYW1lXSA9PT0gbnVsbCB8fCBzaWRlVG9nZ2xlW3NpZGVOYW1lXSA9PT0gJ2ZhbHNlJykge1xuXHRcdFx0XHRcdHNpZGVUb2dnbGVbc2lkZU5hbWVdID0gJ3RydWUnO1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNpZGVOYW1lICsgJ1RvZ2dsZScsICd0cnVlJyk7XG5cdFx0XHRcdFx0YnRuRWxlbWVudC50ZXh0Q29udGVudCA9ICctJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzaWRlVG9nZ2xlW3NpZGVOYW1lXSA9ICdmYWxzZSc7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oc2lkZU5hbWUgKyAnVG9nZ2xlJywgJ2ZhbHNlJyk7XG5cdFx0XHRcdFx0YnRuRWxlbWVudC50ZXh0Q29udGVudCA9ICcrJztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIOePvuWcqOOBruWAi+aVsFxuXHQgKiBAY29uc3Qge0VsZW1lbnR9XG5cdCAqL1xuXHRjb25zdCBjbnRSYW5kb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRSYW5kb20nKTtcblx0aWYgKGNudFJhbmRvbSAhPT0gbnVsbCkge1xuXHRcdGNudFJhbmRvbS50ZXh0Q29udGVudCA9IHJhbmRvbVdvcmRMaXN0Lmxlbmd0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiDjg6njg7Pjg4Djg6Djg6/jg7zjg4njga7lh7rlipvkvY3nva5cblx0ICogQGNvbnN0IHtFbGVtZW50fVxuXHQgKi9cblx0Y29uc3QgdGV4dFJhbmRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb21PdXRwdXQnKTtcblx0aWYgKHRleHRSYW5kb20gIT09IG51bGwpIHtcblx0XHRyYW5kb21PdXRwdXQocmFuZG9tV29yZExpc3QpO1xuXHR9XG5cblx0c2V0cmFuZG9tV29yZCgpO1xuXG5cdHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblx0XHRzZWNvbmRzSW50ZXJ2YWwoMTApO1xuXHR9LCA1MCk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBOzs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBYUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7QUFJQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBT0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FBVUE7QUFDQTtBQUNBOzs7Ozs7O0FBTUE7QUFDQTtBQUNBOzs7Ozs7O0FBTUE7QUFDQTtBQUNBOzs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQTVFQTtBQThFQTs7Ozs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./HTML Manual/js/Main.js\n");

/***/ }),

/***/ "./HTML Manual/js/ajax-response.js":
/*!*****************************************!*\
  !*** ./HTML Manual/js/ajax-response.js ***!
  \*****************************************/
/*! exports provided: SendAjax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SendAjax\", function() { return SendAjax; });\n/**\n * @fileoverview Ajaxレスポンス取得処理に使用するAjax\n *\n * @module ajax-response\n * @since   1.0.0\n * @version 1.0.0\n */\n\n/**\n * HTTPステータスコードの確認\n *\n * @param  {Response}       response    レスポンスデータ\n * @return {Response|Error}             HTTPステータスコードが200番台ならレスポンスデータ、そうでなければエラー\n * @since   1.0.0\n * @version 1.0.0\n */\nfunction checkStatus(response) {\n  // HTTPステータスコードが200番台ではない場合\n  // 類似方法にresponse.okがあるが大部分のブラウザが非対応なので非推奨\n  if (response.status >= 200 && response.status < 300) {\n    return response;\n  } else {\n    let error = new Error(response.statusText);\n    error.response = response;\n    throw error;\n  }\n}\n/**\n * JSONデータの切り出し\n *\n * @param  {Response}   response    レスポンスデータ\n * @return {JSON}                   レスポンスに格納されているJSONデータ\n * @since   1.0.0\n * @version 1.0.0\n */\n\n\nfunction parseJSON(response) {\n  // console.log(response);\n  return response.json();\n}\n/**\n * Ajax転送処理\n *\n * @param       {string}                        sendURL 転送先URL\n * @param       {FormData}                      form    転送するForm Data\n * @return      {Promise.JSON|Promise.Error}            JSONデータもしくはエラー内容\n * @since   1.0.0\n * @version 1.0.0\n */\n\n\nfunction SendAjax(sendURL, form) {\n  return new Promise((resolve, reject) => {\n    fetch(sendURL, {\n      method: 'POST',\n      body: form\n    }).then(checkStatus).then(parseJSON).then(function (json) {\n      resolve(json);\n    }).catch(function (error) {\n      reject(error);\n    });\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9IVE1MIE1hbnVhbC9qcy9hamF4LXJlc3BvbnNlLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vSFRNTCBNYW51YWwvanMvYWpheC1yZXNwb25zZS5qcz83NGRhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBBamF444Os44K544Od44Oz44K55Y+W5b6X5Yem55CG44Gr5L2/55So44GZ44KLQWpheFxuICpcbiAqIEBtb2R1bGUgYWpheC1yZXNwb25zZVxuICogQHNpbmNlICAgMS4wLjBcbiAqIEB2ZXJzaW9uIDEuMC4wXG4gKi9cblxuLyoqXG4gKiBIVFRQ44K544OG44O844K/44K544Kz44O844OJ44Gu56K66KqNXG4gKlxuICogQHBhcmFtICB7UmVzcG9uc2V9ICAgICAgIHJlc3BvbnNlICAgIOODrOOCueODneODs+OCueODh+ODvOOCv1xuICogQHJldHVybiB7UmVzcG9uc2V8RXJyb3J9ICAgICAgICAgICAgIEhUVFDjgrnjg4bjg7zjgr/jgrnjgrPjg7zjg4njgYwyMDDnlarlj7Djgarjgonjg6zjgrnjg53jg7Pjgrnjg4fjg7zjgr/jgIHjgZ3jgYbjgafjgarjgZHjgozjgbDjgqjjg6njg7xcbiAqIEBzaW5jZSAgIDEuMC4wXG4gKiBAdmVyc2lvbiAxLjAuMFxuICovXG5mdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuXHQvLyBIVFRQ44K544OG44O844K/44K544Kz44O844OJ44GMMjAw55Wq5Y+w44Gn44Gv44Gq44GE5aC05ZCIXG5cdC8vIOmhnuS8vOaWueazleOBq3Jlc3BvbnNlLm9r44GM44GC44KL44GM5aSn6YOo5YiG44Gu44OW44Op44Km44K244GM6Z2e5a++5b+c44Gq44Gu44Gn6Z2e5o6o5aWoXG5cdGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuXHRcdHJldHVybiByZXNwb25zZTtcblx0fSBlbHNlIHtcblx0XHRsZXQgZXJyb3IgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0ZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxufVxuXG4vKipcbiAqIEpTT07jg4fjg7zjgr/jga7liIfjgorlh7rjgZdcbiAqXG4gKiBAcGFyYW0gIHtSZXNwb25zZX0gICByZXNwb25zZSAgICDjg6zjgrnjg53jg7Pjgrnjg4fjg7zjgr9cbiAqIEByZXR1cm4ge0pTT059ICAgICAgICAgICAgICAgICAgIOODrOOCueODneODs+OCueOBq+agvOe0jeOBleOCjOOBpuOBhOOCi0pTT07jg4fjg7zjgr9cbiAqIEBzaW5jZSAgIDEuMC4wXG4gKiBAdmVyc2lvbiAxLjAuMFxuICovXG5mdW5jdGlvbiBwYXJzZUpTT04ocmVzcG9uc2UpIHtcblx0Ly8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufVxuXG4vKipcbiAqIEFqYXjou6LpgIHlh6bnkIZcbiAqXG4gKiBAcGFyYW0gICAgICAge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgICBzZW5kVVJMIOi7oumAgeWFiFVSTFxuICogQHBhcmFtICAgICAgIHtGb3JtRGF0YX0gICAgICAgICAgICAgICAgICAgICAgZm9ybSAgICDou6LpgIHjgZnjgotGb3JtIERhdGFcbiAqIEByZXR1cm4gICAgICB7UHJvbWlzZS5KU09OfFByb21pc2UuRXJyb3J9ICAgICAgICAgICAgSlNPTuODh+ODvOOCv+OCguOBl+OBj+OBr+OCqOODqeODvOWGheWuuVxuICogQHNpbmNlICAgMS4wLjBcbiAqIEB2ZXJzaW9uIDEuMC4wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTZW5kQWpheChzZW5kVVJMLCBmb3JtKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0ZmV0Y2goc2VuZFVSTCwge1xuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRib2R5OiBmb3JtXG5cdFx0fSlcblx0XHRcdC50aGVuKGNoZWNrU3RhdHVzKVxuXHRcdFx0LnRoZW4ocGFyc2VKU09OKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKGpzb24pIHtcblx0XHRcdFx0cmVzb2x2ZShqc29uKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9KTtcblx0fSk7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./HTML Manual/js/ajax-response.js\n");

/***/ })

/******/ });