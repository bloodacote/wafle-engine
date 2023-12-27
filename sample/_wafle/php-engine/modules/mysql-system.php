<?php

	// Данные для БД
	$default_db = null; // БД по умолчанию

	$db_host = "127.0.0.1";
	$db_user = "root";
	$db_pass = "";
	$db_name = "test_db";

	$db_dsn = "mysql:host=$db_host;dbname=$db_name";

	$db_opts = [
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
	];

	$db = new PDO($db_dsn, $db_user, $db_pass, $db_opts);



	$result = $db -> query("SELECT * FROM users");
	$result = $result -> fetchAll();
	//$result -> fetch();

	print_r($result);


?>