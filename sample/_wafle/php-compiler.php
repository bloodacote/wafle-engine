<?php


/* - - - - - - - - - - - - - -
	PHP компилятор для PHP-кода
- - - - - - - - - - - - - - */

// Установка корневых папок и файлов
$site_dir = $_SERVER["DOCUMENT_ROOT"];
$engine_dir = __DIR__ . "\php-engine";
$compiled_filename = $site_dir . "\wafle-runner.php";


/* - - - - - - - - - - - - - -
	Модификации дял компиляции
- - - - - - - - - - - - - - */

// Модификации кода для компилятора
class compilerModifier {

	// Очищение от PHP-границ
	public function clearBorders($content) {

		$pattern = '/<\?php|\?>/';
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

}

// Инициализация модификатора
$compile_mods = new compilerModifier();



/* - - - - - - - - - - - - - -
	Функции для компиляции и сборки
- - - - - - - - - - - - - - */

// Функция вставки скрипта
function insertScript($script_path) {
	global $code_content, $engine_dir, $compile_mods;

	$script_path = $engine_dir . "/" . $script_path;
	$script_path = str_replace("/", "\\", $script_path);

	$script_content = file_get_contents($script_path);
	$script_content = $compile_mods -> clearBorders($script_content);
	$script_content = $compile_mods -> eraseLines($script_content);

	$code_content .= $script_content;
}

// Добавление строки
function addCommentLine($text) {
	return nl2br("//$text\n");
}



/* - - - - - - - - - - - - - -
	Компиляция
- - - - - - - - - - - - - - */

// Установка времени компиляции
$compile_time = date("Y-m-d H:i:s");

// Инициализация кода
$code_content = "";

// Список загружаемых скриптов
$scripts_loader_query = array(
	"core.php",
	"file1.php",
	"file2.php"
);


// Добавление начальной информации
$code_content .= addCommentLine(" WAFLE PHP-engine compiler ");
$code_content .= addCommentLine(" Compiled at: $compile_time ");
$code_content .= addCommentLine("");


// Загрузка скриптов по очереди
foreach ($scripts_loader_query as $script_path) {
	insertScript($script_path);
}


$code_content = "<?php\n" . $code_content . "\n?>";

// Сохранение скомпилированного кода
file_put_contents($compiled_filename, $code_content);


// Вывод о том, что всё прошло успешно
echo "
+- - - - - - - - - - - - -+
Компиляция прошла успешно!
+- - - - - - - - - - - - -+
";

?>