<?php


/* - - - - - - - - - - - - - -
	PHP компилятор для PHP-кода
- - - - - - - - - - - - - - */

// Установка корневых папок и файлов
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\php-engine";
$compiler_tools_dir = __DIR__ . "\compiler-tools";

$compiled_filename = $site_dir . "\wafle-runner.php";



// Подключение инструментов компилятора
include $compiler_tools_dir . "\\modifiers.php";
include $compiler_tools_dir . "\\regex-funcs.php";
include $compiler_tools_dir . "\\compile.php";



/* - - - - - - - - - - - - - -
	Функции для компиляции и сборки
- - - - - - - - - - - - - - */

// Функция вставки скрипта
function insertScript($script_path) {
	global $code_content, $engine_dir, $compile_mods;

	$script_path = $engine_dir . "/" . $script_path;
	$script_path = str_replace("/", "\\", $script_path);

	$script_content = file_get_contents($script_path);
	$script_content = $compile_mods -> clearPhpBorders($script_content);
	$script_content = $compile_mods -> eraseComments($script_content);
	$script_content = $compile_mods -> eraseLines($script_content);

	$code_content .= $script_content;
}



/* - - - - - - - - - - - - - -
	Компиляция
- - - - - - - - - - - - - - */


// Загрузка PHP-скриптов и их компиляция
compileAndPrint(array(
	"core.php",

	"api-tools/data-transfer.php"
));



?>