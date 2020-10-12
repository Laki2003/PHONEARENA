<?php
$to      = "gustav.wagner@gmx.net";
$subject = "New message from website arrived";
$from    = $_POST["sender_email"];
$message = $_POST["sender_message"];
$company = $_POST["sender_company"];
$phone = $_POST["sender_phone"];
$headers = "From: ". $from . ",Phone: " . $phone . ",Company: " .$company. "\r\n" .
    "Reply-To: ". $from . "\r\n" .
    "X-Mailer: PHP/" . phpversion(); 
mail($to, $subject, $message, $headers);
?>