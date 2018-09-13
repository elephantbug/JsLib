<?php

exit(json_encode($_POST));

if (empty($_POST['recaptcha'])) {
	exit('Please set recaptcha variable');
}
// validate recaptcha
$response = $_POST['recaptcha'];
$post = http_build_query(
 	array (
 		'response' => $response,
 		'secret' => 'yoursecretkey',
 		'remoteip' => $_SERVER['REMOTE_ADDR']
 	)
);
$opts = array('http' => 
	array (
		'method' => 'POST',
		'header' => 'application/x-www-form-urlencoded',
		'content' => $post
	)
);
$context = stream_context_create($opts);
$serverResponse = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
if (!$serverResponse) {
	exit('Failed to validate Recaptcha');
}
$result = json_decode($serverResponse);
if (!$result -> success) {
	exit('Invalid Recaptcha');
}
exit('Recaptcha Validated');
