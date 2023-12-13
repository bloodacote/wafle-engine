

// - - - - - - - - - - - -
// Кеширование ссылки (добавляет временную метку)
wafle.uncacheUrl = function(url) {
	var timestamp = "?t=" + Date.now();
	return url + timestamp;
}


// - - - - - - - - - - - -
// Загрузка стиля CSS
wafle.loadCSS = async function(url) {
	return new Promise(function (resolve, reject) {

		if (url.slice(url.length - 4) != ".css") {
			url += ".css";
		}

		// Удаление кэша (если настройка вкл.)
		if (wafle.options.disableCacheLinks == true) {
			url = wafle.uncacheUrl(url);
		}

		// Создание элемента
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
// (САМОЕ ЗАПАРНОЕ!)
// Главная функция загрузки
wafle.loadURL = async function(method, url, data = null, headers = {}) {
	return new Promise(function (resolve, reject) {

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		// Установка Header-данных
		for (let [headType, headValue] of Object.entries(headers)) {
			xhr.setRequestHeader(headType, headValue);
		}

		// При успешной загрузке возвращаются данные
		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status <= 299) {
				resolve(xhr.responseText); // Вот эти данные
			}
		};

		// Отправка наших данных (payload)
		xhr.send(JSON.stringify(data));

	});
}


// - - - - - - - - - - - -
// Функция загрузки JSON-файла
wafle.loadJSON = async function(url) {
	var jsonData = await wafle.loadURL("GET", url);

	try {
		jsonData = JSON.parse(jsonData);
		return jsonData;

	} catch (err) {
		wafle.say(`JSON имеет неверный формат! [${url}]`, "error");

	}
}


// - - - - - - - - - - - -
// Функция проверки, существует ли файл
wafle.loadFileExist = async function(url) {
	try {
		var fileCheck = await wafle.loadURL("HEAD", url);
		return true;
	
	} catch (err) {
		return false;

	}
}



// - - - - - - - - - - - - - - - - -
wafle.say("Загрузочные функции готовы", "log");
// - - - - - - - - - - - - - - - - -