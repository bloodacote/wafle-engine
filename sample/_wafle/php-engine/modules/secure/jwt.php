<?php


	// Base64 - URL версия
	function hash64_encode($str) {
		return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($str));
	}


	// Base64 - URL версия
	function hash64_decode($str) {
		return base64_decode(str_replace(['-', '_'], ['+', '/'], $str));
	}

		//--  --  --  --  --  --  --  --  --  --  --  --

	// Генератор JWT-токена
	function jwt_gen($payload, $secret_key) {
		$header = array(
			"typ" => "JWT",
			"alg" => "HS256"
		);

		// Кодирование данных
		$base_header = hash64_encode(json_encode($header));
		$base_payload = hash64_encode(json_encode($payload));
		
		// Генерация хэш-ключа
		$signature = hash_hmac("sha256", $base_header .'.'. $base_payload, $secret_key, true);
		$base_signature = hash64_encode($signature);

		// Токен
		$token = $base_header .'.'. $base_payload .'.'. $base_signature;
		return $token;
	}


	// Дегенератор JWT-токена (сам такой)
	function jwt_degen($token, $secret_key) {
		$token_parts = explode(".", $token);

		if ($token == "") {
			add_error(500, "no-token");
		}

		if (count($token_parts) != 3) {
			add_error(500, "wrong-token-format");
	    }

	    // Иниц данных
		$base_header = $token_parts[0];
		$base_payload = $token_parts[1];
		$base_signature = $token_parts[2];

		// Декодирование
		$header = hash64_decode($base_header);
		$payload = hash64_decode($base_payload);
		$signature = hash64_decode($base_signature);

		// Проверка ключа
		$new_signature = hash_hmac("sha256", $base_header .'.'. $base_payload, $secret_key, true);
		$is_valid = hash_equals($signature, $new_signature);
		if ($is_valid != 1) {$is_valid = 0;}

		// Вывод данных
		$output = array(
			"valid" => $is_valid,
			"data" => json_decode($payload, true)
		);
		return $output;
	}

?>