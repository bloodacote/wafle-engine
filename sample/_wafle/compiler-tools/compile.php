<?php


// Добавление строки
function addCommentLine($text) {
	return nl2br("//$text\n");
}


// Компиляция и вывод
function compileAndPrint($scripts_loader_query) {
	global $script_path, $compiled_filename;

	// Установка времени компиляции
	$compile_time = date("Y-m-d H:i:s");


	// Установка пустого кода
	$code_content = "";


	// Добавление начальной информации
	$code_content .= addCommentLine(" WAFLE Engine Compiler! ");
	$code_content .= addCommentLine(" Compiled at: $compile_time ");
	$code_content .= addCommentLine("");

	// Загрузка JS-скриптов по очереди
	foreach ($scripts_loader_query as $script_path) {
		$code_content .= insertScript($script_path);
	}

	// Сохранение скомпилированного кода
	file_put_contents($compiled_filename, $code_content);

	// Вывод о том, что всё прошло успешно
	echo "
	+- - - - - - - - - - - - -+
	Компиляция прошла успешно!
	+- - - - - - - - - - - - -+
	";

}

?>