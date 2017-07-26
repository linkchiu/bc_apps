<?php
$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");
if (!$con) {
    die('Could not connect: ' .mysqli_connect_errno());
}
//echo 'Connected successfully';

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>

