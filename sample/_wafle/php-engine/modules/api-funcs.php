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


	// Функция проверяет введённые данные
	function check_user_input($key, $type = null, $min_length = null, $max_length = null) {
		global $input;

		// Проверка существования данных
		if (array_key_exists($key, $input)) {

			// То, что будем проверять
			$check_value = $input[$key];
			$check_value_type = gettype($check_value);

			// Проверка на тип переменной
			if ($type != $check_value_type and $type != null) {
				add_error(422, "input-wrong-type--$key");

			// Проверка на длину переменной
			} elseif ($check_value_type == "string") {
				$check_value_len = strlen($check_value);

				if ($check_value_len < $min_length and $min_length != null) {
					add_error(422, "input-too-short--$key");
				}

				if ($check_value_len > $max_length and $max_length != null) {
					add_error(422, "input-too-long--$key");
				}
			}

		} else {
			add_error(422, "input-no-value--$key");
		}
	}

?>