<?php ob_start(); ?>
<?php
include './includes/header.php';
include './includes/sidebar.php';
$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");

$actual_link = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];


$key=$_GET['key'];
$delete=$_GET['delete'];
if ( isset( $delete ) ) {
  $delete=mysqli_query( $con, "DELETE FROM patient_user WHERE id = '".$delete."'" );

  //$delete1=mysqli_query($con,"DELETE FROM dose_reminder WHERE code_id = '".$delete."'");

?>
<script>

alert("successfully delete user");

</script>

<?php
}

$fcompany=$_GET['company'];
$fdepartment=$_GET['department'];

?>

<script type="text/javascript">
            $(document).ready(function(){
                    $('#button1').click(function(){
                            var hg=$('#combo').val() ;
                              if(hg==1)
                              {
                            getValueUsingClass();
                              }
                    });
        });
    </script>
<script>

$(document).ready(function () {

    $("#buttonClass").click(function() {
        getValueUsingClass();
    });

});

function getValueUsingClass(){

    var chkArray = [];


    $(".chk:checked").each(function() {
        chkArray.push($(this).val());
    });


    var selected;
    selected = chkArray.join(',') + ",";




    if(selected.length > 1){
        alert("You have selected " + selected);

         $.ajax({
            type: "POST",
            url: "bulk_mail.php",
            dataType: 'html',
            data: 'myField='+$("textarea[name=myField]").val()+'&myCheckboxes='+chkArray,
            success: function(data){
                $('#myResponse').html(data)
                location.href = "users.php"
            }
        });
        return false;


    }else{
        alert("Please at least one of the checkbox");
    }



}

</script>
<script type="text/javascript">
$(document).ready(function(){

$(".send_mail").click(function () {
var email=$(this).prev().val();


  $.ajax({
  url: 'sends_mail.php',
  type: 'POST',
  data: {email:email},
  success: function(data) {

  alert(data);
     location.reload();
  }
  });
});





$('.checkrecp').change(function(){
var department = $("#department option:selected").val();
var company = $("#company option:selected").val();


var company_sel=$('#company option[value=""]:first').html();


if(!company == ''){
var url ="users.php?company="+company;

}


if(!department == ''){
//var curl=$(location).attr('href');

var url = "users.php?company="+company_sel+"&department="+department;
}

$(location).attr('href',url);

});


$('.checkrecpvalue').change(function(){
var new_value = $("#new_value option:selected").val();


if(!new_value == '')
{

var url ="users.php?new_value_test="+new_value;
}
$(location).attr('href',url);

});



$('#search').click(function(){
var keys = $("#csearch").val();
var url="users.php?key="+keys;
$(location).attr('href',url);
});



});


</script>


    <div class="content">

        <div class="header">

            <h1 class="page-title">Package No.</h1>
        </div>

                <ul class="breadcrumb">
            <li><a href="index.php">Home</a> <span class="divider">/</span></li>
            <li class="active">Package No.</li>
        </ul>

        <div class="container-fluid">
            <div class="row-fluid">

            <?php

if ( $_POST['submit']=='Save' ) {

  $verification=$_POST['verification'];
  $new_hospital = $_POST['new_hospital'];


  if ( $verification=="" || $new_hospital =="") {
    // echo "Please fill all the required field";
?>
    <div style="text-align:center; color:red;"> Please fill the Package no. or hospital name </div>
    <?php
  }
  else {
    $verification=trim( $verification ) ;
    $v = is_numeric( $verification ) ? true : false;
    if ( $v==true ) {

      $res50 = mysqli_query( $con, "SELECT * FROM  patient_user where verification_code='".$verification."'" );
      $number1=mysqli_num_rows( $res50 );

      if ( $number1==0 ) {
        $insert=mysqli_query( $con, "INSERT INTO patient_user(verification_code, hospital)
VALUES ('"     .$verification."','".$new_hospital. "')" );
        $res2 = mysqli_query( $con, "SELECT * FROM  patient_user where verification_code='".$verification."'" );

        while ( $row2 = mysqli_fetch_array( $res2 ) ) {
          $id=$row2['id'];
        }

?>
 <div style="text-align:center; color:green;"> Successfully  Saved </div>
 <?php
      }
      else {
?>
 <div style="text-align:center; color:red;"> Package No. already exist</div>
 <?php

      }
    }
    else {
?>
 <div style="text-align:center; color:red;"> Please fill only digit</div>
 <?php

    }
  }

}

?>

<div>
<form action="users.php" method="post" enctype="multipart/form-data">
<p>
  <span>Package No.<span style="color:red;">*</span>: </span> <span style="margin-left:25px;"> 
  <input type="text" name="verification"> </span> 
</p>
<p>
  <span>Hospital name<span style="color:red;">*</span>: </span> <span style="margin-left:25px;"> 
  <input type="text" name="new_hospital"> </span> 
</p>
<input type="submit" value="Save" name="submit" class="btn-primary" style="margin-left:120px;"/>
<fieldset>

</form>
</div>
<div id="myResponse"></div>
<div class="well">
    <table class="table">
      <thead>
        <tr>
          <th></th>
<th>Hospital</th>
          <th>Verification Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
<?php
$q="select count(*) \"total\"  from patient_user";

$ros=mysqli_query( $con, $q );
$row=( mysqli_fetch_array( $ros ) );
$total=$row['total'];
$dis=6;
$total_page=ceil( $total/$dis );
$page_cur=( isset( $_GET['page'] ) )?$_GET['page']:1;
$k=( $page_cur-1 )*$dis;
$res2 = mysqli_query( $con, "SELECT * FROM  patient_user  ORDER BY id desc limit $k,$dis " );

while ( $row2 = mysqli_fetch_array( $res2 ) ) {
  $id=$row2['id'];
  $verification_code=$row2['verification_code'];
   $hospital=$row2['hospital'];

  echo '<tr><td><input type="checkbox" value="'.$id.'" class="chk"></td>';
   echo '<td>'.$hospital.'</td>';
  echo '<td>'.$verification_code.'</td>';

?>

<?php  echo '<td><a href="../copaxone/users.php?delete='.$id.'" title="Delete" style="color:red;"><i class="icon-remove"></i></a></td>';  ?>


<?php     echo '</tr>'; }  ?>

      </tbody>
    </table>
</div>


<?php

if ( !$fcompany=='' && $fdepartment=='' ) {
  $baseurl='users.php?company='.$fcompany;
}
else if ( !$fcompany=='' && !$fdepartment=='' ) {
    $baseurl='users.php?company='.$fcompany.'&department='.$fdepartment;
  }
else if ( !$key =='' ) {
    $baseurl='users.php?key='.$key;
  }
else {
  $baseurl='users.php?';
}




if ( $page_cur > 1 ) {
  echo '<a href="'.$baseurl.'&page='.( $page_cur-1 ).'" style="cursor:pointer;color:green;" ><input style="" class="btn-primary" type="button" value="<<"></a>';
}
else {
  echo '<input style="" class="btn-primary" type="button" value="<<">';
}
for ( $i=1;$i<=$total_page;$i++ ) {
  if ( $page_cur==$i ) {
    echo ' <input style="" class="btn-primary" type="button" value="'.$i.'"> ';
  }
  else {
    echo '<a href="'.$baseurl.'&page='.$i.'&new_value_test='.$_GET['new_value_test'].'"> <input style="" class="btn-primary" type="button" value="'.$i.'"> </a>';
  }
}
if ( $page_cur<$total_page ) {
  echo '<a href="'.$baseurl.'&page='.( $page_cur+1 ).'&new_value_test='.$_GET['new_value_test'].'"><input style="" type="button" class="btn-primary" value=">>"></a>';
}
else {
  echo '<input style="" type="button" class="btn-primary" value=">>">';
}
?>
<div>
</div>
                    
                    <footer>
                        <hr>


                    </footer>

            </div>
        </div>
    </div>



 <!--   <script src="lib/bootstrap/js/bootstrap.js"></script> -->
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function() {
            $('.demo-cancel-click').click(function(){return false;});
        });
    </script>

  </body>
</html>
