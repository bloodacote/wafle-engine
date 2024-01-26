

class LinkNavigator {
	constructor(defaultPage = "/index.html", notExistPage = "/404.html") {
		this.linkMap = {};
		this.defaultPage = defaultPage;
		this.notExistPage = notExistPage;
	}

	getMap() {
		return this.linkMap;
	}

	setMap(map) {
		this.linkMap = map;
		return map;
	}

	// Ищет страницу для ссылки по карте
	findLink(link) {
		var result = null;

		if (link == "/") {
			return this.defaultPage;

		} else {

			// Преобразование ссылки
			var newLink = link.split("?");
			newLink = newLink[0];
			newLink = newLink + "/";

			// Проверка схожести
			for (let [page, pagePath] of Object.entries(this.linkMap)) {
				//console.log(`KEY: ${page} -- PATH: ${pagePath}`);

				page = page + "/";
				//console.log(`${newLink} == ${page}`);
				if (newLink.startsWith(page) == true) {
					result = pagePath;
				}
			}
		}

		if (result == null) {
			return this.notExistPage;
		}

		return result;
	}
}


// Функция для получения данных по ссылке
function getLink(link = window.location.href) {
	return link;
}


// Функция для получения частей ссылки
function getLinkParts(link = window.location.pathname) {
	var url = link;
	url = url.split("/");

	url = url.filter(
		function(part) {
			if (part != "") {
				return part;
			}
		}
	);

	return url;
}


// Функция загрузить страницу
function setLink(url) {
	window.location.href = url;
}


// Функция изменить ссылку
function changeLink(url) {
	history.pushState(null, null, url);
}