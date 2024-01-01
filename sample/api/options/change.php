<?php

	require $_SERVER["DOCUMENT_ROOT"] . "/api/main.php";

	check_user_input("version", "string");

	$info_data = file_get_contents($info_file);
	$info_data = json_decode($info_data, true);

	$info_data["version"] = get_input("version");
	file_put_contents($info_file, json_encode($info_data, JSON_PRETTY_PRINT));

	send_output_data();

?>