<?php session_start();
header('Access-Control-Allow-Origin: *'); 
  if($_SESSION['copaxone_username']=="" && $_SESSION['copaxone_password']=="" )
  {
  
   echo "<script>window.location='../copaxone/sign-in.php';</script>";
  }


 ?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>copaxoneHCP</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/datepicker.css">
    <link rel="stylesheet" type="text/css" href="stylesheets/bootstrap-datetimepicker.min.css">

    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">

   
<script src="../copaxone/lib/jquery-1.7.2.min.js" type="text/javascript"></script>

<script src="../copaxone/lib/bootstrap-datepicker.js" type="text/javascript"></script>
<script src="../copaxone/lib/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="http://code.jquery.com/ui/1.9.1/jquery-ui.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="../copaxone/lib/bootstrap/js/bootstrap.js"></script>
<script src="../copaxone/lib/bootstrap/js/jscolor.js"></script>



<script>
  $(function() {
    $( "#datepicker" ).datepicker({dateFormat: 'MM d, yy'});
     $( "#datepicker1" ).datepicker({dateFormat: 'MM d, yy'});
  });
</script>

 
    

    <style type="text/css">
        #line-chart {
            height:300px;
            width:800px;
            margin: 0px auto;
            margin-top: 1em;
        }
        .brand { font-family: georgia, serif; }
        .brand .first {
            color: #ccc;
            font-style: italic;
        }
        .brand .second {
            color: #fff;
            font-weight: bold;
        }
    </style>

   
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

   
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <!--[if lt IE 7 ]><body class="ie ie6"> <![endif]-->
  <!--[if IE 7 ]> <body class="ie ie7 "> <![endif]-->
  <!--[if IE 8 ]> <body class="ie ie8 "> <![endif]-->
  <!--[if IE 9 ]> <body class="ie ie9 "> <![endif]-->
  <!--[if (gt IE 9)|!(IE)]><!--> 
  <body class=""> 
  <!--<![endif]-->
    
    <div class="navbar">
        <div class="navbar-inner">
                <ul class="nav pull-right">
                    
                <!--    <li><a href="#" class="hidden-phone visible-tablet visible-desktop" role="button">Settings</a></li>  -->
                    <li id="fat-menu" class="dropdown">
                        <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-user"></i> <?php echo $_SESSION['copaxone_username']; ?>
                            <i class="icon-caret-down"></i>
                        </a>

                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="myaccount.php">Change password</a></li>
                            <li class="divider"></li>
                            <li><a tabindex="-1" class="visible-phone" href="#">Settings</a></li> 
                            <li class="divider visible-phone"></li>
                            <li><a tabindex="-1" href="logout.php">Logout</a></li>
                        </ul>
                    </li>
                    
                </ul>
                <a class="brand" href="index.php"><span class="first" style="color:#777;">copaxoneHCP</span> <span class="second">copaxone</span></a>
        </div>
    </div>
    