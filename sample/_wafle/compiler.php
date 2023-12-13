<?php

/* - - - - - - - - - - - - - -
	PHP компилятор для JS-кода
- - - - - - - - - - - - - - */

// Установка корневых папок
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\jsengine";

//echo $engine_dir;


class compilerModifier {

	public function eraseComments($content) {

		// One-line comments: // comment
		$pattern = "/\/\/.+/";
		$content = preg_replace($pattern, "", $content);

		// Many-line comments: /* comment */
		$pattern = "/\/\*.+\*\//s";
		$content = preg_replace($pattern, "", $content);

		return $content;
	}

	public function eraseLines($content) {

		$pattern = "//";
		$content = preg_replace($pattern, "", $content);
		
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

	echo nl2br($script_content);
}

echo "// WAFLE JS-engine compiler \n";

insertScript("/run.js");

?>