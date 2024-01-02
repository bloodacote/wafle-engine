

class HookGUI {

	log(text) {
		toElem("#log-data").value = `[${Date.now()}] > ${text}`;
	}

	async optionsSave() {
		var dataVersion = toElem("#opt-version").value;

		await api.optionsChange(dataVersion);
		this.log(`Данные сохранены!`);
	}

	async compileJS() {
		var buildName = toElem("#opt-build-name").value;
		var buildPath = `/compiled/${buildName}.js`;

		await api.compileJS(buildPath);
		this.log(`Билд скомпилирован по пути "${buildPath}"`);
	}

	async compilePHP() {
		var buildName = toElem("#opt-build-name").value;
		var buildPath = `/compiled/${buildName}.php`;

		await api.compilePHP(buildPath);
		this.log(`Билд скомпилирован по пути "${buildPath}"`);
	}

}

const gui = new HookGUI();