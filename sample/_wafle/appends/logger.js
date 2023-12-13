

wafle.loggerTypes = {
	log: {
		badge: "[?]",
		color: "#cf9458"
	},
	error: {
		badge: "[x]",
		color: "#ff4141"
	},
	warn: {
		badge: "[!]",
		color: "#d9e532"
	},
	nice: {
		badge: "[v]",
		color: "#6bff53"
	}
};


// Стилизованный вывод в консоль
wafle.say = function(text, type = "log") {
	if (wafle.options.consolePrint == true) {

		const typeData = wafle.loggerTypes[type];

		const sayText = `%c${typeData.badge} ${text}`;
		const sayStyle = `
			background-color: #251b11;
			border-left: 2px solid ${typeData.color};
			border-radius: 0px 3px 3px 0px;

			padding: 3px 5px;
			padding-left: 8px;
			margin: 0;

			color: ${typeData.color};
			font-size: 12pt;
		`;

		console.log(sayText, sayStyle);
	}
}


// - - - - - - - - - - - - - - - - -
wafle.say("Ядро и логгер подгружены", "log");
// - - - - - - - - - - - - - - - - -