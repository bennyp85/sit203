<?php
session_start();
	print_r($_POST);
	if(isset($_POST) & !empty($_POST)){
		if($_POST['captcha'] == $_SESSION['code']){
			echo "correct captcha";
		}else{
			echo "Invalid captcha";
		}
	}
?>
<html>
<head>
    <title>Simple CAPTCHA Script in PHP</title>
</head>
  <body>
    <form action="" method="post">
    	<input type="text" name="name" />
    	<input type="email" name="email" />
    	<img src="generate.php" /><input type="text" name="captcha" />
        <input type="submit" value="submit" />
    </form>
  </body>
</html>
