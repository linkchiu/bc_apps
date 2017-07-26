<?php
header('Access-Control-Allow-Origin: *'); 
$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");


$verfication_code=$_REQUEST['verfication_code'];
$uid=$_REQUEST['uid'];
//$select1=mysqli_query($con,"SELECT * FROM diseasesapp_user WHERE verification_code = '".$verfication_code."'");
$select1=mysqli_query($con,"SELECT * FROM patient_user WHERE verification_code like '%".$verfication_code."' ");
                      while($row1=mysqli_fetch_array($select1))
                      {
                            $hgk['id']=$row1['id'];
                      }

$n=mysqli_num_rows($select1);
if($n>=1)
{
   //echo "success";
   $hg['status']=1;
   $hg['msg']='Successfully login';
   $hg['data']=$hgk;
}
else
{
 $hg['status']=0;
   $hg['msg']='Invalid login';
$hg['data']='';
 
}
echo  json_encode($hg);
?>