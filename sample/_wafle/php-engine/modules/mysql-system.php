<?php

	// Данные для БД
	$default_db = null; // БД по умолчанию


	$db = db_connect("test_db", "127.0.0.1", "root", "");

	$result = db_fetch_one($db, "SELECT * FROM users WHERE role = :role", array(
		"role" => "user"
	));

	print_r($result);


?>