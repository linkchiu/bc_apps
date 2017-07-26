<?php 
include './includes/header.php';
include './includes/sidebar.php';

?>

    

    
    <div class="content">
        


        <div class="container-fluid">
            <div class="row-fluid">
                    

<div class="well">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#home" data-toggle="tab">Admin Account</a></li>
    </ul>
    <div>
    <?php

$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");

 $res_new = mysqli_query($con,"SELECT * FROM patient_admin");
     
 while($row2 = mysqli_fetch_array($res_new))
           {
           $user_name=$row2['name'];
           $email=$row2['email'];
           $password=$row2['password'];
           
        //  echo $user_name;
        //  echo $email;
        //  echo $password;
          
           }

          if($_POST['Save']=="submit")
         {
          
          $email=$_POST['email'];
          $password=$_POST['password'];
          $password1=$_POST['password1'];
        //  echo $email;
          
         //echo $email;
         //echo $password;
         //echo $password1;
         
         
         
         if($email=="")
         {
         
         // echo "email not fill";
?>
<div style="
    color: red;
    margin-left: 185px;
">
    Email not fill</div>
<?php
         }
         else
         {
             if($password=="")
             {


             //  echo "password not fill";
?>
<div style="
    color: red;
    margin-left: 185px;
">
    Password not fill</div>
<?php
             }
             else
             {
             if($password1=="")
             {

              // echo "confirm password not fill";
?>
<div style="
    color: red;
    margin-left: 185px;
">
    Confirm password not fill</div>
<?php
             }
             else
             {
                  if($password != $password1)
           {

              //echo "password not match";
?>
<div style="
    color: red;
    margin-left: 185px;
">
   Current password and password not match</div>
<?php
              
           }
            else
          {
          // $password=md5($password);
          //echo $password;
          
$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");
    
 $result=mysqli_query($con,"UPDATE patient_admin SET email='".$email."',password='".$password."'");

        //echo "Successfully update your password";
?>
<div style="
    color: green;
    margin-left: 185px;
">
   Successfully update your password</div>
<?php
    
        } 
             
             }
             
             }
         
        
         }         
 }       

   ?>
</div>
    <div id="myTabContent" class="tab-content">
      <div class="tab-pane active in" id="home">
    <form action="myaccount.php" name="form" method="post">
        <label><strong>Name: <?php echo  $user_name;  ?></strong></label>
   
 
        <label><strong>Email</strong></label>
        
        <input  type="text"  name="email" class="span6" value=<?php echo $email;  ?> >
        

        <label><strong>Password</strong></label>
        <input type="text"  name="password" class="span6">
       
         <label><strong>Confirm Password</strong></label>
        <input type="text"  name="password1" class="span6">


       <div class="btn-toolbar">
     <input type="submit" value="submit" name="Save" class="btn btn-info">
  
</div>  
             
    </form>
      </div>
      
  </div>
</div>        
                    <footer>
                        <hr>                    
                    </footer>
                    
            </div>
        </div>
    </div>
    


  <!--  <script src="lib/bootstrap/js/bootstrap.js"></script> -->
 
    
  </body>
</html>