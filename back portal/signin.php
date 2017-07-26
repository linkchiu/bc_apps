<?php 
header('Access-Control-Allow-Origin: *'); 
ob_start();
    session_start();
   
    $username=$_POST['user_name'];
    $password=$_POST['password'];
   // $role=participant;    
    
if($username=="" && $password=="")
{
   echo "user name or password not enter";
}
else
{
     // $password1=md5($password);
    // echo $password1."<br />";
    // echo $username;

$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");

    
     $res = mysqli_query($con,"SELECT * FROM patient_admin  WHERE name='".$username."'  && password='".$password."'"); 
      $n=mysqli_num_rows($res);
    
    if($n==1)
    {
   $_SESSION['copaxone_username']=$username;
   $_SESSION['copaxone_password']=$password;


$year = time() + 31536000;
if($_POST['remember']) {
setcookie('remember_me', $_POST['user_name'], $year);
setcookie('remember_m_pass', $password, $year);
}
elseif(!$_POST['remember']) {
	if(isset($_COOKIE['remember_me'])) {
		$past = time() - 100;
		setcookie(remember_me, gone, $past);
	}
        if(isset($_COOKIE['remember_m_pass'])) {
		$past = time() - 100;
		setcookie(remember_m_pass, gone, $past);
	}
}
   ?>
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
var url = "index.php";
$(location).attr('href',url);
</script>
<?php
      echo "success";
    }
   else
   {
     echo "fail";
header('location:sign-in.php?msg=Invalid Email or Password');
   }

}  
?>