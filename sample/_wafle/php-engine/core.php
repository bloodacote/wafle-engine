<?php

	// Ядро движка
	class WafleCore {
		function __construct() {
			$name = "Wafle";
			$author = "Bloodacote";
			$version = "alpha";

			$this -> options = array(

				// При получении ошибки в API [ add_error(400) ], весь код обрывается и возвращает ошибку
				"strict_exit" => true

			);
		}

		// Получить опцию
		public function get_option($key) {
			return $this -> options[$key];
		}

		// Поставить опцию
		public function set_option($key, $val) {
			$this -> options[$key] = $val;
		}

	}


	// Инициализация ядра
	$wafle = new WafleCore();

?>