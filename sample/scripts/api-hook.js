

class HookAPI{

	async optionsLoad() {
		var result = await loadAPI("/api/options/load.php");
		return result.data;
	}

	async optionsChange(dataVersion) {
		var result = await loadAPI("/api/options/change.php", {
			version: dataVersion
		});
		return result.data;
	}

	async compileJS(dataRunnerPath) {
		var result = await loadAPI("/api/compile/js.php", {
			runner_path: dataRunnerPath
		});
		return result.data;
	}

	async compilePHP(dataRunnerPath) {
		var result = await loadAPI("/api/compile/php.php", {
			runner_path: dataRunnerPath
		});
		return result.data;
	}
	
}

const api = new HookAPI();