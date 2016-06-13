<?php 
include('includes/config.php');

$sql = "SELECT * FROM customers ORDER BY first_name";
$rsd = mysql_query($sql);

 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Display Customers</title>
</head>
<body>
	<a href="new_customer.php" title="Add New Customer">Add New Customer</a>
	<table border="1" cellpadding="3" cellspacing="3"
		<tr>
			<th width="30">No. </th>
			<th width="120">Customer Id. </th>
			<th width="120">First Name. </th>
			<th width="120">Last Name. </th>
			<th width="120">Address. </th>
			<th width="100">Contact. </th>
			<th width="25">&nbsp; </th>
			<th width="25">&nbsp; </th>
		</tr>
	<?php 
$n = 0;
while ($row = mysql_fetch_array($rsd)) {
	$n = $n + 1;
	$f1 = $row['customer_id'];
	$f2 = $row['first_name'];
	$f3 = $row['last_name'];
	$f4 = $row['address'];
	$f5 = $row['contact'];
	 ?>
	 <tr>
	 	<td><?php echo $n; ?></td>
	 	<td><?php echo $f1; ?></td>
	 	<td><?php echo $f2; ?></td>
	 	<td><?php echo $f3; ?></td>
	 	<td><?php echo $f4; ?></td>
	 	<td><?php echo $f5; ?></td>
	 	<td><a href="update.php?id=<?php echo $f1 ?>">Update</a></td>
	 	<td><a href="delete.php?id=<?php echo $f1 ?>">Delete</a></td>
	 </tr>
<?php }//while ?>

	</table>



</body>
</html>