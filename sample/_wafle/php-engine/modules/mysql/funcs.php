<?php

	// Функция создаёт PDO для базы данных
	function db_connect($db_host = "127.0.0.1", $db_user = "root", $db_pass = "", $db_name) {

		// Настройки
		$db_dsn = "mysql:host=$db_host;dbname=$db_name";
		$db_opts = [
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
		];

		// Создаём БД
		$pdo = new PDO($db_dsn, $db_user, $db_pass, $db_opts);
		return $pdo;
	}


	// Функция выполняет запрос
	function db_query($pdo, $query, $placeholders = array()) {
		$result = $pdo -> prepare($query);
		$result -> execute($placeholders);
		
		return true;
	}


	// Функция возвращает одну строку
	function db_fetch_one($pdo, $query, $placeholders = array()) {
		$result = $pdo -> prepare($query);
		$result -> execute($placeholders);
		
		return $result -> fetch();
	}


	// Функция возвращает произвольное кол-во строк
	function db_fetch_all($pdo, $query, $placeholders = array()) {
		$result = $pdo -> prepare($query);
		$result -> execute($placeholders);
		
		return $result -> fetchAll();
	}

?>