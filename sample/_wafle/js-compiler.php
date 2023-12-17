<?php

/* - - - - - - - - - - - - - -
	PHP компилятор для JS-кода
- - - - - - - - - - - - - - */

// Установка корневых папок и файлов
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\js-engine";
$compiled_filename = $site_dir . "\wafle-runner.js";




// Модификации кода для компилятора
class compilerModifier {

	// Удаление комментов из кода
	public function eraseComments($content) {

		// One-line comments: // comment
		$pattern = '/\/\/.+/';
		$content = preg_replace($pattern, "", $content);

		// Many-line comments: /* comment */
		$pattern = '/\/\*.+\*\//sU';
		$content = preg_replace($pattern, "", $content);

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

	// Поиск функций на всякий случай
	// ([\w]+\.[\S]+[\s]*=[\s]*)(async[\s]*function|function)\(.*\)

	// Старый регекс
	/* /(?>".+")|(?>`.+`)|(?>}[\s]+[}])|(?>}[\s]+catch)|(?<sel>}[\s]+[^}])/sUm
	*/
}

// Инициализация модификатора
$compile_mods = new compilerModifier();


// Загрузка контента JS-скрипта
function insertScript($script_path) {
	global $compile_mods, $engine_dir;

	$script_path = $engine_dir . $script_path;
	$script_path = str_replace("/", "\\", $script_path);

	$script_content = file_get_contents($script_path);

	$script_content = $compile_mods -> eraseComments($script_content);
	$script_content = $compile_mods -> eraseLines($script_content);
	$script_content = $compile_mods -> addCommandEnds($script_content);

	return $script_content;
}


// Добавление строки
function addCommentLine($text) {
	return nl2br("//$text\n");
}


// Очередь на загрузку JS-скриптов
$scripts_loader_query = array(
	"/core.js",
	"/modules/load-funcs.js",
	"/modules/partos-ultra.js"
);


// Установка времени компиляции
$compile_time = date("Y-m-d H:i:s");


// Установка пустого кода
$code_content = "";


// Добавление начальной информации
$code_content .= addCommentLine(" WAFLE JS-engine compiler ");
$code_content .= addCommentLine(" Compiled at: $compile_time ");
$code_content .= addCommentLine("");

// Загрузка JS-скриптов по очереди
foreach ($scripts_loader_query as $script_path) {
	$code_content .= insertScript($script_path);
}

// Сохранение скомпилированного кода
file_put_contents($compiled_filename, $code_content);


// Вывод о том, что всё прошло успешно
echo "
+- - - - - - - - - - - - -+
Компиляция прошла успешно!
+- - - - - - - - - - - - -+
";


?>