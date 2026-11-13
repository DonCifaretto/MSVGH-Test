<?php



if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('error');
}




$hrEmail = 'hr.msvgh@gmail.com';




$firstName = trim($_POST['first_name'] ?? '');
$lastName  = trim($_POST['last_name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$phone     = trim($_POST['phone'] ?? '');
$interest  = trim($_POST['interest'] ?? '');
$message   = trim($_POST['message'] ?? '');




if ($firstName === '' ||
    $lastName === '' ||
    $phone === '' ||
    $interest === '' ||
    !filter_var($email, FILTER_VALIDATE_EMAIL)) {

    exit('error');
}




if (!isset($_FILES['resume']) ||
    $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {

    exit('error');
}

$resume = $_FILES['resume'];

$allowedExtensions = array('pdf', 'doc', 'docx');
$extension = strtolower(pathinfo($resume['name'], PATHINFO_EXTENSION));

if (!in_array($extension, $allowedExtensions, true)) {
    exit('error');
}



if ($resume['size'] > 10 * 1024 * 1024) {
    exit('error');
}


/*----------------------------------------------------*/
/*  SANITIZE VALUES USED IN THE EMAIL
/*----------------------------------------------------*/

$firstNameSafe = str_replace(array("\r", "\n"), '', $firstName);
$lastNameSafe  = str_replace(array("\r", "\n"), '', $lastName);
$emailSafe     = str_replace(array("\r", "\n"), '', $email);
$phoneSafe     = str_replace(array("\r", "\n"), '', $phone);
$interestSafe  = str_replace(array("\r", "\n"), '', $interest);

$subject = 'MSVGH Job Application - ' . $firstNameSafe . ' ' . $lastNameSafe;


/*----------------------------------------------------*/
/*  EMAIL BODY
/*----------------------------------------------------*/

$body  = "A new application has been submitted through the MSVGH website.\r\n\r\n";
$body .= "Applicant: " . $firstNameSafe . ' ' . $lastNameSafe . "\r\n";
$body .= "Email: " . $emailSafe . "\r\n";
$body .= "Contact Number: " . $phoneSafe . "\r\n";
$body .= "Position / Area of Interest: " . $interestSafe . "\r\n\r\n";

$body .= "Applicant Message:\r\n";
$body .= ($message !== '' ? $message : 'No additional message provided.') . "\r\n\r\n";

$body .= "The applicant's resume is attached to this email.";




$fileContents = file_get_contents($resume['tmp_name']);

if ($fileContents === false) {
    exit('error');
}

$fileContents = chunk_split(base64_encode($fileContents));

$fileName = basename($resume['name']);
$fileName = preg_replace('/[^A-Za-z0-9._-]/', '_', $fileName);

$boundary = md5(uniqid((string)mt_rand(), true));

$headers  = "From: " . $hrEmail . "\r\n";
$headers .= "Reply-To: " . $emailSafe . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

$messageBody  = "--" . $boundary . "\r\n";
$messageBody .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$messageBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$messageBody .= $body . "\r\n\r\n";

$messageBody .= "--" . $boundary . "\r\n";
$messageBody .= "Content-Type: application/octet-stream; name=\"" . $fileName . "\"\r\n";
$messageBody .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n";
$messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
$messageBody .= $fileContents . "\r\n";
$messageBody .= "--" . $boundary . "--";




if (mail($hrEmail, $subject, $messageBody, $headers)) {
    echo 'success';
} else {
    echo 'error';
}

?>
