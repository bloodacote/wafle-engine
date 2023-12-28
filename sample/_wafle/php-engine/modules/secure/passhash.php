<?php


	// Функция хэширует текст
	function passhash_crypt($text) {
		$text = password_hash($text, PASSWORD_DEFAULT);
		return $text;
	}


	// Функция проверяет хэш текста
	function passhash_check($text, $hashed_text) {
		$result = password_verify($text, $hashed_text);
		return $result;
	}


?>