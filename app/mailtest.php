<?php 

// Читаем настройки config
require_once('./config.php');

// Подключаем класс FreakMailer
require_once('./MailClass.php');

//Настройки сбора данных
$site['form-name'] = $_POST["form-name"];
$site['name'] = $_POST["name"];
$site['tel'] = $_POST["tel"];

// инициализируем класс
$mailer = new FreakMailer();

// Устанавливаем тему письма
$mailer->Subject = 'Заявка с сайта';
// Задаем тело письма
$mailer->Body = "Заявка из формы: " . $site['form-name'] . " Имя клиента: " . $site['name'] . " Телефон клиента: " . $site['tel'] .

// Добавляем адрес в список получателей
$mailer->AddAddress('lyubakov@63.ru', 'Alex Lyubakov');

if($mailer->Send())
{
  $response = array(
    'status' => 'OK',
    'msg' => 'Сообщение отправлено'
  );
}
else
{
  $response = array(
    'status' => 'FAIL',
    'msg' => 'Ошибка при отправке сообщения'
  );
}

 echo json_encode($response);
 
$mailer->ClearAddresses();
$mailer->ClearAttachments();

?>