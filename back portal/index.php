<?php 
include './includes/header.php';
include './includes/sidebar.php';
?>
    <div class="content">
        <div class="header">
            <h1 class="page-title">Dashboard</h1>
        </div>
        
            <ul class="breadcrumb">
            <li><a href="index.php">Home</a> <span class="divider">/</span></li>
            <li class="active">Dashboard</li>
        </ul>

        <div class="container-fluid">
            <div class="row-fluid">
                    
<div class="row-fluid">
</div>

<div class="row-fluid">
    <div class="block span6">
        <a href="#tablewidget" class="block-heading" data-toggle="collapse">Package No.<span class="label label-warning">+10</span></a>
        <div id="tablewidget" class="block-body collapse in">
            <table class="table">

              <thead>
                <tr>
                   <th>Hospital</th>
                  <th>Package No.</th>

                                
                </tr>
              </thead>
              <tbody>

<?php 
$con=mysqli_connect("localhost","thrivase","thrivase#123","copaxone");
 $res2 = mysqli_query($con,"SELECT * FROM  patient_user  limit 10");



       while($row2 = mysqli_fetch_array($res2))
           {
           $verification_code=$row2['verification_code'];
           $hospital = $row2['hospital'];
           
           echo '<tr>';
            echo '<td>' .$hospital. '</td>';
           echo  '<td>'.$verification_code.'</td>';
           
           echo '</tr>';
           }
    ?>
              </tbody>
            </table>
            <p><a href="users.php">More...</a></p>
        </div>
    </div>
</div>

<div class="row-fluid">

</div>
                    <footer>
                        <hr>
                    </footer>
                    
            </div>
        </div>
    </div>
    


 <!--  <script src="lib/bootstrap/js/bootstrap.js"></script>  -->
    <script type="text/javascript">
        $("[rel=tooltip]").tooltip();
        $(function() {
            $('.demo-cancel-click').click(function(){return false;});
        });
    </script>
    <?php 
//session_destroy();
      ?>
  </body>
</html>