

// Главная функция загрузки
async function loadURL(method, url, data = null, headers = {}) {
	return new Promise(function (resolve, reject) {

		var xhr = new XMLHttpRequest(); // Создаём XHR-объект

		// Добавляем настройки
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