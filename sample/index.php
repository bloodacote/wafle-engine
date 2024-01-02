<html>
	<head>
		<title> Сайт WAFLE </title>
		<meta charset="utf-8">

		<link rel="stylesheet" href="/styles/main.css">
	</head>

	<body>

		<h1> WAFLE Compile Manager v.1 </h1>

		<input id="log-data" placeholder="Результат" disabled>

		<article>
			<input id="opt-version" placeholder="Build version">
			<button id="options-load"> Вернуть настройки </button>
			<button id="options-save"> Сохранить настройки </button>
		</article>

		<article>
			<input id="opt-build-name" placeholder="Build name (Sample: 'wafle-runner')">
			<button id="compile-js"> Компилировать JS </button>
			<button id="compile-php"> Компилировать PHP </button>
		</article>

	</body>
</html>

<script src="/wafle-runner.js"></script>
<script src="/scripts/api-hook.js"></script>
<script src="/scripts/gui-hook.js"></script>

<script>

	// Получение инфы
	async function loadSite() {
		var loadInfo = await api.optionsLoad();

		toElem("#opt-version").value = loadInfo.version;



		// Активные кнопки
		toElem("#options-load").onclick = function() {
			toElem("#opt-version").value = loadInfo.version;
		};

		toElem("#options-save").onclick = function() {
			gui.optionsSave();
		};

		toElem("#compile-js").onclick = function() {
			gui.compileJS();
		};

		toElem("#compile-php").onclick = function() {
			gui.compilePHP();
		};


	}

	loadSite();

</script>