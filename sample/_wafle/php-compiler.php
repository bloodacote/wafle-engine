<?php


/* - - - - - - - - - - - - - -
	PHP компилятор для PHP-кода
- - - - - - - - - - - - - - */

// Установка корневых папок и файлов
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\php-engine";
$compiler_tools_dir = __DIR__ . "\compiler-tools";
$info_file = __DIR__ . "\main-info.json";


// Подключение инструментов компилятора
require $compiler_tools_dir . "\\modifiers.php";
require $compiler_tools_dir . "\\regex-funcs.php";
require $compiler_tools_dir . "\\compile.php";



/* - - - - - - - - - - - - - -
	Функции для компиляции и сборки
- - - - - - - - - - - - - - */

// Функция вставки скрипта
function insertScript($script_path) {
	global $code_content, $engine_dir, $compile_mods;

	$script_path = $engine_dir . "/" . $script_path;
	$script_path = str_replace("/", "\\", $script_path);

	$script_content = file_get_contents($script_path);
	$script_content = $compile_mods -> eraseComments($script_content);
	$script_content = $compile_mods -> clearPhpBorders($script_content);
	$script_content = $compile_mods -> eraseLines($script_content);

	$code_content .= $script_content;
}



/* - - - - - - - - - - - - - -
	Компиляция
- - - - - - - - - - - - - - */

// Установка пустого кода
$code_content = "";

// Загрузка PHP-скриптов и их компиляция
compileAndPrint(array(
	"core.php",

	"modules/api/data.php",
	"modules/api/funcs.php",

	"modules/mysql/system.php",
	"modules/mysql/funcs.php",

	"modules/secure/jwt.php",
	"modules/secure/passhash.php"

), "", "");

?>