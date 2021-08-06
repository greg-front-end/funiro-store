<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exceptipon;

require 'phpmailer/src/Exceptipon.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHtml(true);

<!-- от кого письмо -->
$mail->setFrom('site for repair');
<!-- кому -->
$mail->addAdress('infosroydom@gmail.com');
<!-- тема письма -->
$mail->
$mail-Subject = 'Привет! Письмо с сайта';

<!-- рука  радиокнопки-->
$hand = 'Rifht';
if($_POST['hand`'] == 'left') {
  $hand = 'left';
}

<!-- тело письма -->
$body = '<h1>Заявка с сайта</h1>';
if(trim(!empty($_POST['name']))) {
  $body.='<p><strong>Имя:</strong> ' .$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
  $body.='<p><strong>E-mail:</strong> ' .$_POST['email'].'</p>';
}
if(trim(!empty($_POST['hand']))) {
  $body.='<p><strong>Рука:</strong> ' .$hand.'</p>';
}
if(trim(!empty($_POST['age']))) {
  $body.='<p><strong>Возраст:</strong> ' .$_POST['age'].'</p>';
}
if(trim(!empty($_POST['message']))) {
  $body.='<p><strong>Сообщение:</strong> ' .$_POST['message'].'</p>';
}
if(!empty($_FILES['image']['tmp_name'])) {
  <!-- путь загрузки файла -->
  $filePath = _DIR_ . '/files/' . $_FILES['image']['name'];
  <!-- загрузка файла -->
  if(copy($_FILES['image']['tmp_name'], $filePath)) {
    $fileAttach = $filePath;
    $body.='<p><strong>Фото в приложении</strong></p>';
    $mail->addAttachment($fileAttach);
  }
}

$mail->Body = $body;

<!-- оптравляем -->
if(!$mail->send()) {
  $message = 'Error';
}else {
  $message = 'Письмо отправлено';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>