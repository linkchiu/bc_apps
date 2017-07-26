<?php
include './includes/header.php';
include './includes/sidebar.php';
require 'config.php';

$id=$_GET['id'];
?>
    <div class="content">
        <div class="header">
            <h1 class="page-title">Materials upload</h1>
        </div>
         <ul class="breadcrumb">
            <li><a href="index.php">Home</a> <span class="divider">/</span></li>
            <li class="active">Materials</li>
        </ul>
        <div class="container-fluid">
<?php

if ( $_POST['submit'] == 'Update' ) {

?>
    <!-- <div style="text-align:center; color:red;"> Please fill the about Us </div>-->
        <?php
    //$comment=$_POST['comment'] ;
    $pdf_name= basename( $_FILES['pdf']['name'] );
    $ext=explode( ".", $pdf_name );

    $result=mysqli_query( $con, "select * from patient_about_us WHERE id='1'" );
    if ( mysqli_num_rows( $result ) ) {
        while ( $rows=mysqli_fetch_array( $result ) ) {
            $pd_name=$rows['pdf'];
            $ver=explode( "_", $pd_name );
            $version=$ver[1];
            //echo $version=$version+1;

            $type=array( "pdf" );
            if ( $_FILES['pdf']['size'] < 8000000 ) {
                if ( in_array( $ext[1], $type ) ) {
                    $new_name="new_".$version;
                    $new_name1="new_".$version.'.'.$ext[1];
                    $target_path = "pdf1/";
                    $target_path = $target_path . $new_name1;
                    if ( move_uploaded_file($_FILES['pdf']['tmp_name'], $target_path ) ) {
                        echo "The file ".  basename( $_FILES['pdf']['name'] ). " has been uploaded";
                    }
                    $result10=mysqli_query( $con, "UPDATE patient_about_us SET pdf='".$new_name."'  WHERE id='1'" );
                }
                else {
                    echo "Please upload only .pdf file";
                }
            }
        }
    }
    else {}
}
?>


<div class="row-fluid">
    <div class="block span10 edit_div">
        <a href="#widget1container" class="block-heading" data-toggle="collapse">Materials</a>
        <div id="widget1container" class="block-body in collapse" style="height: auto;margin-top:20px;">
            <form action="about-us-new.php" method="post"  enctype="multipart/form-data">
                <p><span>Upload last Copaxone Consumer Medicine Information Leaflet: <span style="color:red;"></span>: </span> <span style="margin-left:50px;"> <input type="file" name="pdf" class="pdf"/></span> </p>
                <input type="submit" value="Update" name="submit" class="btn btn-primary pull-right">
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</div>
</div>
</div>
</div>
  </body>
</html>
