<?php
/*
 * Name: Contact Script
 * URI: http://www.sacredpixel.com
 * Description: Handles contact form and send an email to configured address
 * Version: 1.0.2
 * Author: Mohsen Heydari
 * Author URI: http://www.sacredpixel.com
 */
 
	$ConfigPath = 'config.xml';
	
	//Check for configuration file
	if(!is_readable($ConfigPath))
	{
		echo 'Can\'t read the configuration file!';
		return;
	}
	
	if(!array_key_exists('name', $_POST) ||
	   !array_key_exists('email', $_POST)||
       !array_key_exists('company',$_POST)||
	   !array_key_exists('comment', $_POST))
	{
		echo 'Missing post value!';
		return;
	}
	
	$Name 	 = trim($_POST['name']);
	$From 	 = trim($_POST['email']);
    $Company = trim($_POST['company']);
	$Msg     = trim($_POST['comment']);
	
	
	$erros 	  = array();
	$emailReg = "/^\w+([\-\.]\w+)*@([a-z0-9]+(\-+[a-z0-9]+)?\.)+[a-z]{2,5}$/i";
	
	//Check for name length
	if(strlen($Name) < 1)
		$erros[] = 'Name is less than one char!';
	
	//Check email address
	if(!preg_match($emailReg, $From))
		$erros[] = 'Invalid email address!';

    //Check for company length
    if(strlen($Company) < 1)
        $erros[] = 'Company Name is less than one char!';
	
	//Check for message length
	if(strlen($Msg) < 1)
		$erros[] = 'Message is less than one char!';
	
	//We have error in our form
	if(count($erros))
	{
		echo "Error In Form:\r\n" . implode("\r\n", $erros);
		die();
	}
	
	$SettingsDoc = new DOMDocument(); 
	$SettingsDoc->Load($ConfigPath);
	
	$mailToNode   = $SettingsDoc->getElementsByTagName("mailTo");
	$templateNode = $SettingsDoc->getElementsByTagName("template");
	$subjectNode  = $SettingsDoc->getElementsByTagName("subject");
	$Subject      = $subjectNode->item(0)->nodeValue; 
	$To 		  = $mailToNode->item(0)->nodeValue;
	$Body		  = $templateNode->item(0)->nodeValue;
	
	if(strlen($Subject) < 1)
		$erros[] = 'Email subject is empty';
	
	if(!preg_match($emailReg, $To))
		$erros[] = 'Receiver email address is invalid';

	if(strlen($Body) < 1)
		$erros[] = 'Body Template is empty';
	
	//We have error in settings
	if(count($erros))
	{
		echo "Error In Settings:\r\n" . implode("\r\n", $erros);
		die();
	}
	
	$Body = preg_replace("/\[Name\]/", $Name, $Body);
	$Body = preg_replace("/\[Sender\]/", $From, $Body);
    $Body = preg_replace("/\[Company\]/", $Company, $Body);
	$Body = preg_replace("/\[Message\]/", $Msg, $Body);
	$BodyHtml = preg_replace("/\n/", "<br/>", $Body);
	
	$random_hash = md5(date('r', time()));
	
	//define the headers we want passed. Note that they are separated with \r\n
	$Headers = "From: ".$From."\r\nReply-To: ".$From;
	$Headers .= "\r\nMIME-Version: 1.0";
	//add boundary string and mime type specification
	$Headers .= "\r\nContent-Type: multipart/alternative; boundary=\"PHP-alt-".$random_hash."\"";
	//define the body of the message.
	ob_start(); //Turn on output buffering
?>
--PHP-alt-<?php echo $random_hash; ?>

Content-Type: text/plain; charset="iso-8859-1"

<?php echo strip_tags($Body); ?>

--PHP-alt-<?php echo $random_hash; ?>

Content-Type: text/html; charset="iso-8859-1"

<?php echo $BodyHtml; ?>

--PHP-alt-<?php echo $random_hash; ?>--
<?php
	//copy current buffer contents into $message variable and delete current output buffer
	$Message = ob_get_clean();
	
	//send the email
	$Mail_sent = mail( $To, $Subject, $Message, $Headers );

	echo $Mail_sent ? "OK" : "Error in sending email";
?>