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
    
    <link rel="stylesheet" type="text/css" href="stylesheets/theme.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.css">

    <script src="lib/jquery-1.7.2.min.js" type="text/javascript"></script>

    <!-- Demo page code -->

<script type="text/javascript">
 $(document).ready(function(){ 
         $('#login').click(function(){
		if($('#user_name').val()==""){
		alert("Please enter the user name");
		$('#email').focus();
		return false;
		}
              	
		if($('#password').val()==""){
		alert("Please enter the Password");
		$('#password').focus();
		return false;
		}
	});
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

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
  <!--[if IE 7 ]> <body class="ie ie7 "> <![endif]-->
  <!--[if IE 8 ]> <body class="ie ie8 "> <![endif]-->
  <!--[if IE 9 ]> <body class="ie ie9 "> <![endif]-->
  <!--[if (gt IE 9)|!(IE)]><!--> 
  <body class=""> 
  <!--<![endif]-->
    
    <div class="navbar">
        <div class="navbar-inner">
                <ul class="nav pull-right">
                    
                </ul>
                <a class="brand" href="index.php"><span class="first" style="color:#777;">copaxoneHCP</span> <span class="second">Admin</span></a>
        </div>
    </div>
  
        <div class="row-fluid">
    <div class="dialog">
        <div class="block">
            <p class="block-heading">Sign In</p>
            <div class="block-body">
                <form action="signin.php" method="post" name="form">
              <?php if(isset($_REQUEST['msg'])){ echo "<h5 style='text-align:center;color:red;'>".$_REQUEST['msg']."</h5>"; } ?>
                    <label>Username</label>
                    <input type="text" class="span12" name="user_name" id="user_name" value=<?php
echo $_COOKIE['remember_me']; ?>>
                    <label>Password</label>
                    <input type="password" class="span12" name="password" id="password" value=<?php
echo $_COOKIE['remember_m_pass']; ?>>
                   <!-- <a href="index.html" class="btn btn-primary pull-right">Sign In</a> -->   
                    <input type="submit" value="Sign In" name="submit" class="btn btn-primary pull-right"  id="login"/>               
                    <label class="remember-me"><input type="checkbox" name="remember" value="1"> Remember me</label>
                    <div class="clearfix"></div>
                </form>
            </div>
        </div>
       <!-- <p class="pull-right" style=""><a href="http://www.portnine.com" target="blank">Theme by Portnine</a></p>-->
        <p><a href="reset-password.php">Forgot your password?</a></p> 
    </div>
</div>
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function() {
            $('.demo-cancel-click').click(function(){return false;});
        });
    </script>
    
  </body>
</html>