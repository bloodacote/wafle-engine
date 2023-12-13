<?php

/* - - - - - - - - - - - - - -
	PHP компилятор для JS-кода
- - - - - - - - - - - - - - */

// Установка корневых папок
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\jsengine";


class compilerModifier {

	public function eraseComments($content) {

		// One-line comments: // comment
		$pattern = '/\/\/.+/';
		$content = preg_replace($pattern, "", $content);

		// Many-line comments: /* comment */
		$pattern = '/\/\*.+\*\//sU';
		$content = preg_replace($pattern, "", $content);

		return $content;
	}

	public function eraseLines($content) {
		$pattern = '/[\n|\r]{5,}/s';
		$content = preg_replace($pattern, "", $content);
		//$content = str_replace(PHP_EOL, "", $content);
		return $content;
	}

	public function addCommandEnds($content) {
		$pattern = '/(?>".+")|(?>`.+`)|(?>}[\s]+[}])|(?>}[\s]+catch)|(?<sel>}[\s]+[^}])/sUm';
		$content = preg_replace_callback($pattern, function ($match) {
				if (isset($match['sel'])) {
			        $match['sel'] = substr_replace($match['sel'], "};", 0, -1);
			        return $match['sel'];
			    } else {
			        return $match[0];
			    }
			},
			$content
		);

		return $content;
	}


}

$compile_mods = new compilerModifier();


// Загрузка контента JS-скрипта
function insertScript($script_path) {
	global $compile_mods, $engine_dir;

	$script_path = $engine_dir . $script_path;
	$script_content = file_get_contents($script_path);

	$script_content = $compile_mods -> eraseComments($script_content);
	//$script_content = $compile_mods -> eraseLines($script_content);
	$script_content = $compile_mods -> addCommandEnds($script_content);

	echo $script_content;
	//echo nl2br($script_content);
}

echo nl2br("// WAFLE JS-engine compiler \n");



$scripts_loader_query = array(
	"/run.js",
	"/core/main.js",
	"/core/logger.js",
	"/appends/load_funcs.js"
);


foreach ($scripts_loader_query as $script_path) {
	insertScript($script_path);
}

?>