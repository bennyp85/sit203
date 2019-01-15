<?php
  /* Set oracle user login and password info */
  $dbuser = "bpritch";  /* your deakin login */
  $dbpass = "myDeakinpass99$";  /* your deakin password */
  $dbname = "SSID";
  $db = oci_connect($dbuser, $dbpass, $dbname);

  if (!$db)  {
    echo "An error occurred connecting to the database";
    exit;
  }

?>
