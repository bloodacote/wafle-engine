// WAFLE JS-engine compiler <br />
// Compiled at: 2023-12-14 00:34:47 <br />
//<br />
 function getScriptPath() { var path = document.currentScript.src; var pathParts = path.split("/"); pathParts = pathParts.slice(0, -1); path = pathParts.join("/"); return path; };const waflePath = getScriptPath(); async function wafleStart(pageFunc) { return new Promise(async function (resolve, reject) { wafle.say("Движок Wafle успешно загружен! :)", "nice"); pageFunc(); resolve(true); }); } class WafleCore { constructor() { this.version = "alpha"; this.creator = "Bloodacote"; this.options = { consolePrint: true, disableCacheLinks: true }; };load() { console.warn("[WAFLE] Скрипт загрузки ядра не инициализирован!"); };async start(pageFunc) { await this.load(); pageFunc(); } } window.wafle = new WafleCore(); wafle.loggerTypes = { log: { badge: "[?]", color: "#cf9458" }, error: { badge: "[x]", color: "#ff4141" }, warn: { badge: "[!]", color: "#d9e532" }, info: { badge: "[%]", color: "#78c2f7" }, nice: { badge: "[v]", color: "#6bff53" } }; wafle.say = function(text, type = "log") { if (wafle.options.consolePrint == true) { const typeData = wafle.loggerTypes[type]; const sayText = `%c${typeData.badge} ${text}`; const sayStyle = ` background-color: #251b11; border-left: 2px solid ${typeData.color}; border-radius: 0px 3px 3px 0px; padding: 3px 5px; padding-left: 8px; margin: 0; color: ${typeData.color}; font-size: 12pt; `; console.log(sayText, sayStyle); } }; wafle.say("Ядро и логгер подгружены", "log");  wafle.uncacheUrl = function(url) { var timestamp = "?t=" + Date.now(); return url + timestamp; };async function loadCSS(url) { return new Promise(function (resolve, reject) { if (url.slice(url.length - 4) != ".css") { url += ".css"; };if (wafle.options.disableCacheLinks == true) { url = wafle.uncacheUrl(url); };var styleElem = document.createElement("link"); styleElem.rel = "stylesheet"; styleElem.href = url; styleElem.onload = function () { resolve(true); };document.head.appendChild(styleElem); }); };async function loadURL(method, url, data = null, headers = {}) { return new Promise(function (resolve, reject) { var xhr = new XMLHttpRequest(); xhr.open(method, url, true); for (let [headType, headValue] of Object.entries(headers)) { xhr.setRequestHeader(headType, headValue); };xhr.onload = function() { if (xhr.status >= 200 && xhr.status <= 299) { resolve(xhr.responseText); } }; xhr.send(JSON.stringify(data)); }); };async function loadJSON(url) { var jsonData = await wafle.loadURL("GET", url); try { jsonData = JSON.parse(jsonData); return jsonData; } catch (err) { wafle.say(`JSON имеет неверный формат! [${url}]`, "error"); } } async function loadFileExist(url) { try { var fileCheck = await wafle.loadURL("HEAD", url); return true; } catch (err) { return false; } } wafle.say("Загрузочные функции готовы", "log"); 