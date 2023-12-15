

class wafleCore {
	constructor() {
		this.name = "Wafle";
		this.author = "Bloodacote";
		this.options = {};
	}

	say(text) {
		console.log(`[${this.name}] => ${text}`);
	}
}

var wafle = new wafleCore();