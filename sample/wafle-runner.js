// WAFLE JS-engine compiler <br />
// Compiled at: 2023-12-18 00:32:35 <br />
//<br />
 class WafleCore { constructor() { this.name = "Wafle"; this.author = "Bloodacote"; this.version = "alpha"; this.options = {}; };say(text) { console.log(`[${this.name}] => ${text}`); } } var wafle = new WafleCore(); wafle.say(`Wafle core loaded`); wafle.options.disableCacheLinks = true; function removeCacheURL(url) { var timestamp = "?t=" + Date.now(); return url + timestamp; };async function loadCSS(url) { return new Promise(function (resolve, reject) { if (url.slice(url.length - 4) != ".css") { url += ".css"; };if (wafle.options.disableCacheLinks == true) { url = removeCacheURL(url); };var styleElem = document.createElement("link"); styleElem.rel = "stylesheet"; styleElem.href = url; styleElem.onload = function () { resolve(true); };document.head.appendChild(styleElem); }); };async function loadURL(method, url, data = null, headers = {}) { return new Promise(function (resolve, reject) { var xhr = new XMLHttpRequest(); xhr.open(method, url, true); for (let [headType, headValue] of Object.entries(headers)) { xhr.setRequestHeader(headType, headValue); };xhr.onload = function() { if (xhr.status >= 200 && xhr.status <= 299) { resolve(xhr.responseText); } }; xhr.send(JSON.stringify(data)); }); };async function loadJSON(url) { var jsonData = await loadURL("GET", url); try { jsonData = JSON.parse(jsonData); return jsonData; } catch (err) { wafle.say(`JSON имеет неверный формат! [${url}]`, "error"); } } wafle.say(`(Load funcs) loaded`);  class EditableElem { constructor(elem) { this.selector = null; this.element = elemize(elem); this.parent = null; this.init(); };init() { this.parent = this.element.parentNode; };place(parentElem) { parentElem = elemize(parentElem); parentElem.appendChild(this.element); this.init(); };insertBefore(otherElem) { otherElem = elemize(otherElem); var parentElem = otherElem.parentNode; parentElem.insertBefore(this.element, otherElem); this.init(); };insertAfter(otherElem) { otherElem = elemize(otherElem); var parentElem = otherElem.parentNode; this.insertBefore(otherElem); edit(otherElem).insertBefore(this); this.init(); };getContent() { var content = this.element.innerHTML; return content; };setHTML(content) { this.element.innerHTML = content; };setText(content) { this.element.innerText = content; };replace(replaceList) { var content = this.element.innerHTML; for (let [key, value] of Object.entries(replaceList)) { content = content.replace(key, value); };this.element.innerHTML = content; };getSelector() { var selector = ""; selector += this.element.tagName; selector += "#" + this.element.id; for (let className of this.element.classList) { selector += "." + className; } selector = selector.toLowerCase(); return selector; } setSelector(selector) { var selParts = selectorSplit(selector); this.element.id = selParts.id; this.element.classList.value = selParts.classes.join(" "); } getId() { return this.element.id; } setId(newId) { this.element.id = newId; } setClass(classList) { if (typeof(classList) == "array") { this.element.classList.value = classList.join(" "); } else { this.element.classList.value = classList; } } addClass(className) { this.element.classList.add(className); } removeClass(className) { this.element.classList.remove(className); } } function selectorSplit(selector) { var elemTag = ""; var elemId = ""; var elemClasses = []; selector = selector.replaceAll(" ", ""); var selectorSplitter = selector.split("#"); if (selectorSplitter.length != 1) { elemTag = selectorSplitter[0]; selectorSplitter = selector.split("."); elemId = selectorSplitter[0].split("#")[1]; elemClasses = selectorSplitter.slice(1); } else { selectorSplitter = selector.split("."); elemTag = selectorSplitter[0]; elemClasses = selectorSplitter.slice(1); } if (elemTag == "") { elemTag = "div"; } return { tag: elemTag, id: elemId, classes: elemClasses }; } function elemize(elem) { if (elem instanceof EditableElem) { elem = elem.element; } if (typeof(elem) == "string") { elem = document.querySelector(elem); } return elem; } function edit(elem) { if (elem instanceof EditableElem) { elem = elem.element; } else { elem = elemize(elem); } var newElem = new EditableElem(elem); return newElem; } function addElem(selector, content = null, parent = null) { var selectorInfo = selectorSplit(selector); var newElem = document.createElement(selectorInfo.tag); newElem.id = selectorInfo.id; newElem.classList.value = selectorInfo.classes.join(" "); newElem.innerHTML = content; if (parent != null) { elemize(parent).appendChild(newElem); };return newElem; };wafle.say(`(PartOS Ultra) loaded`); 