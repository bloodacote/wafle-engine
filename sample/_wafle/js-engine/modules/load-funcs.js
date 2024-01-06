

// Настройки
wafle.options.disableCacheLinks = true;


// - - - - - - - - - - - -
// Кеширование ссылки (добавляет временную метку)
function removeCacheURL(url) {
	var timestamp = "?t=" + Date.now();
	return url + timestamp;
}


// - - - - - - - - - - - -
// Загрузка стиля CSS
async function loadCSS(url) {
	return new Promise(function (resolve, reject) {

		if (url.slice(url.length - 4) != ".css") {
			url += ".css";
		}

		if (wafle.options.disableCacheLinks == true) {
			url = removeCacheURL(url);
		}

		var styleElem = document.createElement("link");
		styleElem.rel = "stylesheet";
		styleElem.href = url;

		styleElem.onload = function () {
			resolve(true);
		}

		document.head.appendChild(styleElem);

	});
}


// - - - - - - - - - - - -
// Главная функция загрузки
async function loadURL(url, data = null, method = "POST", headers = {}) {
	return new Promise(function (resolve, reject) {

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		// Установка Header-данных
		for (let [headType, headValue] of Object.entries(headers)) {
			xhr.setRequestHeader(headType, headValue);
		}

		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status <= 299) {
				resolve(xhr.responseText); // <- ДАННЫЕ
			}
		};

		xhr.send(JSON.stringify(data));
	});
}


// - - - - - - - - - - - -
// Функция загрузки API (loadURL, но с компиляцией JSON)
async function loadAPI(url, data = null, method = "POST", headers = {}) {
	
	var jsonData = await loadURL(url, data, method, headers);

	try {
		jsonData = JSON.parse(jsonData);
		return jsonData;

	} catch (err) {
		wafle.say(`API выдал не JSON! [${url}] \n Вывод: ${jsonData}`, "error");
	}
}


// - - - - - - - - - - - -
// Функция загрузки JSON-файла
async function loadJSON(url) {
	var jsonData = await loadURL(url, null, "GET");

	try {
		jsonData = JSON.parse(jsonData);
		return jsonData;

	} catch (err) {
		wafle.say(`JSON имеет неверный формат! [${url}] Вывод: ${jsonData}`, "error");
	}
}



// - - - - - - - - - - - -
// Функция загрузки скриптов HTML-страницы
async function runScriptsFromHTML(pageText) {
	var startIndex = pageText.indexOf('<script>');
	var endIndex = pageText.indexOf('</script>', startIndex);

	while (startIndex !== -1 && endIndex !== -1) {

		var scriptCode = pageText.substring(startIndex + 8, endIndex);
		eval(scriptCode);

		startIndex = pageText.indexOf('<script>', endIndex);
		endIndex = pageText.indexOf('</script>', startIndex);
	}

	return pageText;
}



// - - - - - - - - - - - - - - - - -
wafle.say(`(Load funcs) loaded`);
// - - - - - - - - - - - - - - - - -