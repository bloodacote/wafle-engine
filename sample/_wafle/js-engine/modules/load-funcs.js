

// - - - - - - - - - - - -
// Кеширование ссылки (добавляет временную метку)
function removeCacheURL(url) {
	var timestamp = "?t=" + Date.now();
	return url + timestamp;
}



// Настройки
wafle.options.disableCacheLinks = true;


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
async function loadURL(method, url, data = null, headers = {}) {
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
// Функция загрузки JSON-файла
async function loadJSON(url) {
	var jsonData = await loadURL("GET", url);

	try {
		jsonData = JSON.parse(jsonData);
		return jsonData;

	} catch (err) {
		wafle.say(`JSON имеет неверный формат! [${url}]`, "error");
	}
}



// - - - - - - - - - - - - - - - - -
wafle.say("Загрузочные функции готовы", "log");
// - - - - - - - - - - - - - - - - -