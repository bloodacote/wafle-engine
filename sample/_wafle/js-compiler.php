<?php

/* - - - - - - - - - - - - - -
	PHP компилятор для JS-кода
- - - - - - - - - - - - - - */

// Установка корневых папок и файлов
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\js-engine";
$compiler_tools_dir = __DIR__ . "\compiler-tools";

$compiled_filename = $site_dir . "\wafle-runner.js";



// Подключение инструментов компилятора
include $compiler_tools_dir . "\\modifiers.php";
include $compiler_tools_dir . "\\regex-funcs.php";
include $compiler_tools_dir . "\\compile.php";



// Загрузка контента JS-скрипта
function insertScript($script_path) {
	global $compile_mods, $engine_dir;

	$script_path = $engine_dir . $script_path;
	$script_path = str_replace("/", "\\", $script_path);

	$script_content = file_get_contents($script_path);

	$script_content = $compile_mods -> eraseComments($script_content);
	$script_content = $compile_mods -> eraseLines($script_content);
	$script_content = $compile_mods -> addCommandEnds($script_content);

	return $script_content;
}



/* - - - - - - - - - - - - - -
	Компиляция
- - - - - - - - - - - - - - */


// Установка пустого кода
$code_content = "";

// Загрузка JS-скриптов и их компиляция
compileAndPrint(array(
	
	"/core.js",
	"/modules/load-funcs.js",
	"/modules/partos-ultra.js"

), "", "");


?>