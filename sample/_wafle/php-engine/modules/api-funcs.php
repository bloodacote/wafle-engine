<?php

	// Функция проверяет статус
	function check_status() {
		global $status;

		if ($status >= 200 and $status < 300) {
			return true;

		} else {
			return false;
		}
	}


	// Функция вывода данных
	function send_output_data() {
		global $output, $error_list, $status;

		if (check_status()) {
			$output = array(
				"status" => $status,
				"data" => $output
			);

		} else {
			$output = array(
				"status" => $status,
				"errors" => $error_list
			);

		}

		echo json_encode($output);
	}


	// Функция отправки ошибки
	function add_error($code, $tag) {
		global $error_list, $status;

		$status = $code;
		array_push($error_list, $tag);
		//http_response_code($code);
	}

?>