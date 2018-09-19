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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ajax_response_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajax-response.js */ \"./HTML Manual/js/ajax-response.js\");\n/**\n * @fileOverview マニュアル用JavaScript\n * @version 1.0.0\n * @since 1.0.0\n */\n// Init\n// const imdWidth = 992;\nconst sideList = ['Main', 'CSS', 'HTML', 'JavaScript', 'Language', 'Node', 'PHP', 'SQL', 'Other']; // let bmenuToggle = false;\n\nlet bwordDecide = false;\nlet sideToggle = []; // SendAjax関数の呼び出し\n\n\n/**\n * ランダムワードマニア\n * @const {string[][]}\n */\n\nlet randomWordList;\nlet xorRand;\n/**\n * Xor Shift乱数\n *\n * @type {class}\n * @since   1.1.0\n * @version 1.2.0\n */\n\nclass xorShift {\n  /**\n   * コンストラクタメソッド\n   * @constructor\n   * @param {number} w Seed Number\n   */\n  constructor(w = Math.floor(Date.now() / 1000)) {\n    let dateTemp = new Date();\n    /**\n     * 乱数 X\n     *\n     * 値は以下の何れかから大きい値を選択\n     * <ul>\n     * <li>Day ^ Month / 2</li>\n     * <li>Month * Day * max(Seconds, 5) * max(Minites, 3)</li>\n     * </ul>\n     * @type {number}\n     */\n\n    this.x = Math.max(Math.floor(dateTemp.getDay() ** (dateTemp.getMonth() / 2)), dateTemp.getMonth() * dateTemp.getDay() * Math.max(dateTemp.getSeconds(), 5) * Math.max(dateTemp.getMinutes(), 3)); // 123456789\n\n    /**\n     * 乱数 Y\n     *\n     * max(Seconds, 5) ^ floor(max(Minites, 10) / 10) + max(Seconds, 1) * max(Minites, 1) * floor(Year / 10)\n     * @type {number}\n     */\n\n    this.y = Math.max(Math.max(dateTemp.getSeconds(), 5) ** Math.floor(Math.max(dateTemp.getMinutes(), 10) / 10) + Math.max(dateTemp.getSeconds(), 1) * Math.max(dateTemp.getMinutes(), 1) * Math.floor(dateTemp.getFullYear() / 10)); // 362436069\n\n    /**\n     * 乱数 Z\n     *\n     * randomWordList.length + (配列randomWordListの2, 3, 5, 7 の文字列の文字数の和) * (配列randomWordListの11, 13, 17, 19 の文字列の文字数の和) * (配列randomWordListの23, 29 の文字列の文字数の和) * (配列randomWordListの31, 37 の文字列の文字数の和)\n     * @type {number}\n     */\n\n    this.z = randomWordList.length + (randomWordList[2].summary.length + randomWordList[3].summary.length + randomWordList[5].summary.length + randomWordList[7].summary.length) * (randomWordList[11].summary.length + randomWordList[13].summary.length + randomWordList[17].summary.length + randomWordList[19].summary.length) * (randomWordList[23].summary.length + randomWordList[29].summary.length) * (randomWordList[31].summary.length + randomWordList[37].summary.length); // 521288629;\n\n    /**\n     * 乱数 W\n     *\n     * デフォルト初期値は現在の時間の1970/01/01 00:00:00からの秒数\n     * @type {number}\n     */\n\n    this.w = w;\n    console.log('Number X: ' + this.x);\n    console.log('Number Y: ' + this.y);\n    console.log('Number Z: ' + this.z);\n    console.log('Number W: ' + this.w);\n  }\n  /**\n   * 乱数の生成\n   * @return {number} 乱数の結果\n   */\n\n\n  randomInt32() {\n    let t = this.x ^ this.x << 11;\n    this.x = this.y;\n    this.y = this.z;\n    this.z = this.w;\n    this.w = this.w ^ this.w >>> 19 ^ (t ^ t >>> 8); // console.log('Number: ' + this.w);\n\n    return this.w;\n  }\n  /**\n   * 浮動少数の乱数の生成\n   * @return {number} 乱数の結果\n   */\n\n\n  randomFloat() {\n    let randNumber = this.randomInt32();\n\n    if (randNumber < 0) {\n      randNumber = ~randNumber;\n    }\n\n    return randNumber / (2 ** 31 - 1);\n  }\n\n}\n/**\n * MDN\n *\n * @param {String} type 調べる項目\n * @return {boolean} 利用可能かのbool\n */\n\n\nfunction storageAvailable(type) {\n  let storage = window[type];\n\n  try {\n    let x = '__storage_test__';\n    storage.setItem(x, x);\n    storage.removeItem(x);\n    return true;\n  } catch (e) {\n    return e instanceof DOMException && ( // everything except Firefox\n    e.code === 22 || // Firefox\n    e.code === 1014 || // test name field too, because code might not be present\n    // everything except Firefox\n    e.name === 'QuotaExceededError' || // Firefox\n    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && // acknowledge QuotaExceededError only if there's something already stored\n    storage.length !== 0;\n  }\n}\n/**\n * ランダムワード取得\n *\n * @return {Promise}    終了コード\n * @since   1.2.0\n * @version 1.2.0\n */\n\n\nfunction getrandomWord() {\n  return new Promise((resolve, reject) => {\n    let fd = new FormData();\n    Object(_ajax_response_js__WEBPACK_IMPORTED_MODULE_0__[\"SendAjax\"])('json/randomWord.json', fd).then(function (json) {\n      // console.log(json);\n      resolve(json);\n    }).catch(function (error) {\n      console.error('request failed', error); // document.getElementById('errors').appendChild(document.createTextNode(event.toString));\n\n      reject(error);\n    });\n  });\n}\n/**\n * 指定時間毎に実行する\n *\n * @param {number} seconds 時間\n * @return {void}\n * @version 1.2.0\n * @since 1.0.0\n */\n\n\nfunction secondsInterval(seconds = 5) {\n  let bdate = new Date();\n\n  if (bdate.getSeconds() % seconds === 0 && bwordDecide === false) {\n    bwordDecide = true;\n    setrandomWord();\n  } else if (bdate.getSeconds() % seconds === 1 && bwordDecide === true) {\n    bwordDecide = false;\n  }\n}\n/**\n * ランダムワードの解説を出力\n *\n * @interface\n * @param  {JSON}   jsonData    JSON Data\n * @return {void}\n * @version 1.2.0\n * @since 1.0.0\n */\n\n\nfunction randomOutput(jsonData) {\n  // Init\n  const textRandom = document.getElementById('randomOutput');\n  let dl = document.createElement('dl');\n\n  for (let data_t of jsonData) {\n    let dt = document.createElement('dt');\n    let dd = document.createElement('dd');\n    dt.innerHTML = '<h3>' + data_t.title + '</h3><h4>出典: ' + data_t.original + '</h4>';\n    dd.innerHTML = data_t.summary;\n    dl.appendChild(dt);\n    dl.appendChild(dd);\n  }\n\n  textRandom.innerHTML = '';\n  textRandom.appendChild(dl);\n}\n/**\n * ランダムワードの出力\n *\n * @interface\n * @return {void}\n * @version 1.2.0\n * @since 1.0.0\n */\n\n\nfunction setrandomWord() {\n  document.getElementById('randomWord').innerHTML = randomWordList[Math.floor(xorRand.randomFloat() * randomWordList.length)].title;\n}\n/**\n * HTMLの読み込み終了時に行われれる処理\n */\n\n\ndocument.addEventListener('DOMContentLoaded', async function () {\n  randomWordList = await getrandomWord();\n  xorRand = new xorShift(); // サイドバーの処理\n  // ローカルストレージサポートの確認\n\n  if (storageAvailable('localStorage')) {\n    for (let sideName of sideList) {\n      let linkElement = document.getElementById('link' + sideName); // ローカルストレージから情報を取得\n\n      sideToggle[sideName] = localStorage.getItem(sideName + 'Toggle'); // フラグを元に隠すかの指定\n\n      if (sideToggle[sideName] === null || sideToggle[sideName] === 'false') {// Null\n      } else {\n        linkElement.textContent = '-';\n        linkElement.checked = true;\n      } // イベントの登録\n\n\n      linkElement.addEventListener('change', function () {\n        if (sideToggle[sideName] === null || sideToggle[sideName] === 'false') {\n          sideToggle[sideName] = 'true';\n          localStorage.setItem(sideName + 'Toggle', 'true');\n          linkElement.textContent = '-';\n        } else {\n          sideToggle[sideName] = 'false';\n          localStorage.setItem(sideName + 'Toggle', 'false');\n          linkElement.textContent = '+';\n        }\n      });\n    }\n  }\n  /**\n   * 現在の個数\n   * @const {Element}\n   */\n\n\n  const cntRandom = document.getElementById('countRandom');\n\n  if (cntRandom !== null) {\n    cntRandom.textContent = randomWordList.length;\n  }\n  /**\n   * ランダムワードの出力位置\n   * @const {Element}\n   */\n\n\n  const textRandom = document.getElementById('randomOutput');\n\n  if (textRandom !== null) {\n    randomOutput(randomWordList);\n  }\n\n  setrandomWord();\n  setInterval(function () {\n    secondsInterval(10);\n  }, 50);\n});\n\n//# sourceURL=webpack:///./HTML_Manual/js/Main.js?");

/***/ }),

/***/ "./HTML Manual/js/ajax-response.js":
/*!*****************************************!*\
  !*** ./HTML Manual/js/ajax-response.js ***!
  \*****************************************/
/*! exports provided: SendAjax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SendAjax\", function() { return SendAjax; });\n/**\n * @fileoverview Ajaxレスポンス取得処理に使用するAjax\n *\n * @module ajax-response\n * @since   1.0.0\n * @version 1.0.0\n */\n\n/**\n * HTTPステータスコードの確認\n *\n * @param  {Response}       response    レスポンスデータ\n * @return {Response|Error}             HTTPステータスコードが200番台ならレスポンスデータ、そうでなければエラー\n * @since   1.0.0\n * @version 1.0.0\n */\nfunction checkStatus(response) {\n  // HTTPステータスコードが200番台ではない場合\n  // 類似方法にresponse.okがあるが大部分のブラウザが非対応なので非推奨\n  if (response.status >= 200 && response.status < 300) {\n    return response;\n  } else {\n    let error = new Error(response.statusText);\n    error.response = response;\n    throw error;\n  }\n}\n/**\n * JSONデータの切り出し\n *\n * @param  {Response}   response    レスポンスデータ\n * @return {JSON}                   レスポンスに格納されているJSONデータ\n * @since   1.0.0\n * @version 1.0.0\n */\n\n\nfunction parseJSON(response) {\n  // console.log(response);\n  return response.json();\n}\n/**\n * Ajax転送処理\n *\n * @param       {string}                        sendURL 転送先URL\n * @param       {FormData}                      form    転送するForm Data\n * @return      {Promise.JSON|Promise.Error}            JSONデータもしくはエラー内容\n * @since   1.0.0\n * @version 1.0.0\n */\n\n\nfunction SendAjax(sendURL, form) {\n  return new Promise((resolve, reject) => {\n    fetch(sendURL, {\n      method: 'POST',\n      body: form\n    }).then(checkStatus).then(parseJSON).then(function (json) {\n      resolve(json);\n    }).catch(function (error) {\n      reject(error);\n    });\n  });\n}\n\n//# sourceURL=webpack:///./HTML_Manual/js/ajax-response.js?");

/***/ })

/******/ });