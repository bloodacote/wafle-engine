<?php


	// Инициализация данных
	$output = null;
	$status = 200;
	$root_dir = $_SERVER["DOCUMENT_ROOT"];
	$method = $_SERVER["REQUEST_METHOD"];
	$error_list = array();


	// Инициализация входных данных
	$input = file_get_contents("php://input");
	$input = json_decode($input, true);

	if ($input == null) {
		$input = array();
	}

?>