<?php

  session_start();
  
$_SESSION['copaxone_username']="";
$_SESSION['copaxone_password']="";
//header("Location: http://mycoach.demo.technosoftwares.co.in/index.php"); /* Redirect browser */
echo "<script>window.location='../copaxone/sign-in.php';</script>";

?>