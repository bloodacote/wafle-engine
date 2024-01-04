
# WAFLE Engine
#### Лёгкая, быстрая и удобная библиотека для создания веб-приложений!
Библиотека для создания **фронтенда (JS)** и **бэкенда (PHP)** веб-приложений. Помогает создать бесконечно масштабируемый вебсайт с максимально чистым кодом.



## Преимущества:
 + **Легкий вес!** Библиотека весит всего 6 Кбайт
 + **Простая система!** Полное упрощение кода и работы с DOM-деревом
 + **Только полезное!** Под капотом только самый необходимый функционал
 + **Фирменный компилятор!** Рабочий билд библиотеки сжат в один файл с удалением всего ненужного
 + **Легко подключить!** Скачал, закинул, подключил
 + **FULL-STACK!** Библиотека разделена на JS и PHP версии для полного контроля
 + **Простая API-система!** PHP-версия обладает простой и удобной API-системой



## Сравнение и примеры:
#### Создание элемента:
```js
//- - - - - - - - - - - - - - - -
// Оригинальный JS
var elem = document.createElement("button");
elem.id = "my-button";
elem.innerText = "Button text!";
elem.classList.add("menu-btn");
elem.classList.add("bold");
document.querySelector("article#second").appendChild(elem);

//- - - - - - - - - - - - - - - -
// WAFLE
addElem("button #my-button .menu-btn .bold",
	"Button text!",
	"article#second");
```

#### Поиск элемента:
```js
//- - - - - - - - - - - - - - - -
// Оригинальный JS
elem = document.getElementById("my-button");

//- - - - - - - - - - - - - - - -
// WAFLE
toElem("#my-button");
```

#### Поиск от родительского элемента:
```js
//- - - - - - - - - - - - - - - -
// Оригинальный JS
elem = document.querySelector("article#second").getElementById("my-button");

//- - - - - - - - - - - - - - - -
// WAFLE
toEdit("article#second").find("#my-button");
```


