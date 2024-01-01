<?php

	require $_SERVER["DOCUMENT_ROOT"] . "/api/main.php";

	// Получаем пути
	check_user_input("runner_path", "string");

	// Проверка пути
	$runner_path = $root_dir . get_input("runner_path");

	$runner_dir = explode("/", $runner_path);
	array_pop($runner_dir);
	$runner_dir = implode("/", $runner_dir);

	if (!is_dir($runner_dir)) {
		add_error(422, "dir-not-exists");
	}

	//---------------------------------------------

	// Компиляция движка
	$compiler_path = $root_dir . "/_wafle/php-compiler.php";
	$compiler_code = shell_exec("php $compiler_path");
	$compiler_code = "<?php\n" . $compiler_code . "\n?>";
	file_put_contents($runner_path, $compiler_code);

	// Инициализация данных
	$info_title = $compile_info["title"];
	$info_version = $compile_info["version"];
	$info_creator = $compile_info["creator"];

	$compile_time = date("Y-m-d H:i:s");

	set_output("title", $info_title);
	set_output("version", $info_version);
	set_output("time", $compile_time);
	send_output_data();

?>