<?php

/* - - - - - - - - - - - - - -
	PHP компилятор для JS-кода
- - - - - - - - - - - - - - */

// Установка корневых папок
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\jsengine";

//echo $engine_dir;

// Загрузка контента JS-скрипта
function insertScript($script_path) {
	global $engine_dir;

	$script_path = $engine_dir . $script_path;
	$script_content = file_get_contents($script_path);
	echo nl2br($script_content);
}

echo "// WAFLE JS-engine compiler \n";

insertScript("/run.js");

?>