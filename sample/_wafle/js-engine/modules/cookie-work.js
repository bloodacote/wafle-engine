

// Функция создаёт куки
function setCookie(key, value, path = "/", expires = "") {
	// Кодировка значений
	key = encodeURIComponent(key);
	value = encodeURIComponent(value);

	// Генерация пути
	var pathParam = "";
	if (path != null) {
		pathParam = `path=${path}; `;
	}

	// Генерация срока
	var expiresParam = "";
	if (expires != null) {
		expiresParam = `expires=${expires};`;
	}

	// Добавление куки
	document.cookie = `${key}=${value}; ${pathParam} ${expiresParam}`;
}


// Функция получает куки
function getCookie(key) {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}


// Функция очищает ВСЕ куки
function clearAllCookies(key = null) {

	if (key != null) {
		setCookie(key, null, "/", "Thu, 01 Jan 1970 00:00:00 UTC");

	} else {
		const cookies = document.cookie.split(";");

	    for (let i = 0; i < cookies.length; i++) {
	        const cookie = cookies[i];
	        const eqPos = cookie.indexOf("=");
	        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	    }
	}
}


// Функция выводит все куки в виде JSON
function getAllCookies() {
    const cookies = document.cookie.split(";");

    const cookiesObject = {};

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        const value = eqPos > -1 ? cookie.substr(eqPos + 1) : "";

        cookiesObject[name] = decodeURIComponent(value);
    }

    return cookiesObject;
}