<?php
    if(empty($_POST)){
    echo 'No...';
    exit;
    }

    $name = '';
    $email = '';
    $subject = '';
    $message = '';
    $recipient = 'victoriacollierdd@gmail.com';

    //some validations
    if(isset($_POST['name'])){
        $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    }

    if(isset($_POST['email'])){
        $email = str_replace(array("\r", "\n", "%0a", "%0d"),'',$_POST['email']);
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    if(isset($_POST['subject'])){
        $subject = filter_var($_POST['subject'],FILTER_SANITIZE_STRING);
    }

    if(isset($_POST['message'])){
        $message = $_POST['message'];
    }

    $headers = [
    'From'=>'noreply@test.ca',
    'Reply-To'=>$name.'<'.$email.'>'
    ];

    if(mail($recipient, $subject, $message, $headers)){
        echo '<p>It sent! I will be reading your message as soon as possible. I promise tog et beck to you within two business days! Talk soon.</p>';
    }else{
        echo '<p>Oops. Someting went wrong, the message did not send. Try again shortly.</p>';
    }
?>
