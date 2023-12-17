

class WafleCore {
	constructor() {
		this.name = "Wafle";
		this.author = "Bloodacote";
		this.version = "alpha";
		this.options = {};
	}

	say(text) {
		console.log(`[${this.name}] => ${text}`);
	}
}

var wafle = new WafleCore();
wafle.say(`Wafle core loaded`);