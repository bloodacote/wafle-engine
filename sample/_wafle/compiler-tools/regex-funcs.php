<?php

// Упрощение замены regex
function regexReplace($content, $pattern, $replaced) {

	$content = preg_replace_callback($pattern, function ($match) use ($replaced) {
		//print_r($match);
			if (isset($match['sel'])) {
				return is_callable($replaced) ? $replaced() : $replaced;
		    } else {
		    	return $match[0];
		    }
		},
		$content
	);

	return $content;
}

?>