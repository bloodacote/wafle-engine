<?php

// Модификации кода для компилятора
class compilerModifier {


	// Удаление комментов из кода
	public function eraseComments($content) {

		// One-line comments: // comment
		$pattern = '/(".*")|(\'.*\')|(?<sel>\/\/.*)/';
		$content = regexReplace($content, $pattern, "");

		// Many-line comments: /* comment */
		$pattern = '/(".*")|(\'.*\')|(?<sel>\/\*.+\*\/)/sU';
		$content = regexReplace($content, $pattern, "");

		return $content;
	}


	// Удаление переносов строк, табов и пробелов
	public function eraseLines($content) {

		$pattern = '/[\n|\r|\t]+/s';
		$content = preg_replace($pattern, " ", $content);

		$pattern = '/\s+/s';
		$content = preg_replace($pattern, " ", $content);

		return $content;
	}


	// Очищение от PHP-границ
	public function clearPhpBorders($content) {

		$pattern = '/<\?php|\?>/';
		$content = preg_replace($pattern, "", $content);

		return $content;
	}


	// Добавляет ; где надо (НЕНАВИЖУ ЭТУ ДИЧЬ)
	public function addCommandEnds($content) {
		$pattern = '/(".+")|(`.+`)|(}[\s]+[}])|(}[\s]+catch)|(}[\s]+else)|(?<sel>}[\s]+[^}])/sUm';
		$content = preg_replace_callback($pattern, function ($match) {
				if (isset($match['sel'])) {
			        $match['sel'] = substr_replace($match['sel'], "};", 0, -1);
			        return $match['sel'];
			    } else {
			        return $match[0];
			    }
			},
			$content
		);

		return $content;
	}

}

// Инициализация модификатора
$compile_mods = new compilerModifier();

?>