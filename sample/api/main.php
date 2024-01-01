<?php

	require $_SERVER["DOCUMENT_ROOT"] . "/wafle-runner.php";

	$info_file = $root_dir . "/_wafle/main-info.json";

	// Получить данные
	$compile_info = file_get_contents($info_file);
	$compile_info = json_decode($compile_info, true);

?>