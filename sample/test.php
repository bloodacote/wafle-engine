<?php

	// Подключение движка
	include $_SERVER["DOCUMENT_ROOT"] . "/wafle-runner.php";


	// Проверка ввода
	check_user_input("id", "integer");
	check_user_input("name", "string", 3, 16);


	// Немного математики
	$new_input = get_input("id") + 100;
	$new_name = get_input("name");


	// Подготовка данных для вывода
	set_output("newid", "Input + 100 = $new_input");
	set_output("hello", "Welcome, $new_name");


	// Вывод данных
	send_output_data();

?>