<?php


// Добавление строки
function addCommentLine($text) {
	return "//$text\n";
}


// Добавление метки копирайта
function getCopyrightLabel($title, $version, $creator) {
	$label = "";

	// Установка времени компиляции
	$compile_time = date("Y-m-d H:i:s");

	// Добавление начальной информации
	$label .= addCommentLine(" $title Engine (v.$version)");
	$label .= addCommentLine(" Author: $creator ");
	$label .= addCommentLine(" Compiled at: $compile_time ");
	$label .= addCommentLine("");

	return $label;
}


// Компиляция и вывод
function compileAndPrint($scripts_loader_query, $str_start, $str_end) {
	global $code_content, $compiled_filename, $info_file;

	// Получить данные
	$compile_info = file_get_contents($info_file);
	$compile_info = json_decode($compile_info, true);

	// Инициализация данных
	$info_title = $compile_info["title"];
	$info_version = $compile_info["version"];
	$info_creator = $compile_info["creator"];
	
	//--  --  --  --  --  --  --  --  --

	// Установка пустого кода
	$code_content = $str_start;

	$code_content .= getCopyrightLabel(
		$info_title,
		$info_version,
		$info_creator
	);


	// Загрузка скриптов по очереди
	foreach ($scripts_loader_query as $script_path) {
		$code_content .= insertScript($script_path);
	}

	// Конец строки
	$code_content .= $str_end;

	//--  --  --  --  --  --  --  --  --

	// Сохранение скомпилированного кода
	echo $code_content;

}

?>