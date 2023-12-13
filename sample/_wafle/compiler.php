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
		$pattern = '/\/\/.+/';
		$content = preg_replace($pattern, "", $content);

		// Many-line comments: /* comment */
		$pattern = '/\/\*.+\*\//s';
		$content = preg_replace($pattern, "", $content);

		return $content;
	}

	public function eraseLines($content) {

		$content = str_replace(PHP_EOL, "", $content);
		
		return $content;
	}

	public function findScripts($content) {
		$pattern = '/(await |)loadScript *\( *".*\);/';
		preg_match_all($pattern, $content, $script_list, PREG_PATTERN_ORDER);

		echo nl2br(print_r($script_list, true));
	}


}

$compile_mods = new compilerModifier();


// Загрузка контента JS-скрипта
function insertScript($script_path) {
	global $compile_mods, $engine_dir;

	$script_path = $engine_dir . $script_path;
	$script_content = file_get_contents($script_path);

	$script_content = $compile_mods -> eraseComments($script_content);
	$script_content = $compile_mods -> eraseLines($script_content);

	$compile_mods -> findScripts($script_content);

	//echo nl2br($script_content);
}

echo "// WAFLE JS-engine compiler \n";

insertScript("/run.js");

?>