<?php
function writeShoppingCart() {
	$cart = $_SESSION['cart'];
	if (!$cart) {
		return '<p>You have no items in your shopping cart</p>';
	} else {
		// Parse the cart session variable
		$items = explode(',',$cart);
		$s = (count($items) > 1) ? 's':'';
		return '<p>You have <a href="basket.php">'.count($items).' item'.$s.' in your shopping cart</a></p>';
	}
}

function showCart() {
	global $db;
	$cart = $_SESSION['cart'];
	if ($cart) {
		$items = explode(',',$cart);
		$contents = array();
		foreach ($items as $item) {
			$contents[$item] = (isset($contents[$item])) ? $contents[$item] + 1 : 1;
		}

		//change
		$output[] = '
		<form method="post" action="basket.php?action=update">


				<div class="table-responsive">
						<table class="table">
								<thead>
										<tr>
												<th colspan="2">Product</th>
												<th>Quantity</th>
												<th>Unit price</th>
												<th>Discount</th>
												<th colspan="2">Total</th>
										</tr>
								</thead>
		<tbody>';
		foreach ($contents as $id=>$qty) {

			$sql = 'SELECT * FROM PRODUCTS WHERE ID = '.$id;

			// modified by Shang
			$stmt = oci_parse($db, $sql);

			if(!$stmt)  {
				echo "An error occurred in parsing the sql string.\n";
				exit;
			  }
			oci_execute($stmt);

			while(oci_fetch_array($stmt)) {

				//session variables for products
				$name= oci_result($stmt,"PNAME");
				$image = oci_result($stmt,"IMAGE");
				$price = oci_result($stmt,"PRICE");
				$id = oci_result($stmt,"ID");
				$_SESSION['ordername'] = $name;
				$_SESSION['orderimage'] = $image;
				$_SESSION['orderprice'] = $price;
				$_SESSION['orderid'] = $id;
				$_SESSION['orderdiscount'] = $discount;
				$_SESSION['orderqty'] = $qty;
			}

			$output[] = '<td><img src="img/'.$image.'"></img></td>';
			$output[] = '<td>'.$name.'</td>';
			$output[] = '<td>AU$ '.$price.'</td>';
			$output[] = '<td><input type="number" name="qty'.$id.'" value="'.$qty.'" size="$qty" maxlength="3" /></td>';
			$output[] = '<td>0</td>';
			$output[] = '<td>AU$ '.($price * $qty).'</td>';
			
			$total += $price * $qty;
			$output[] = '</tr>';
		}
		$output[] = '</tbody> <tfoot>
				<tr>
						<th colspan="5">Total</th>
						<th colspan="2">AU$'.$total.'</th>
				</tr>
		</tfoot>
</table>

</div>
<!-- /.table-responsive -->



</form>';
$_SESSION['ordertotal'] = $total;


	} else {
		$output[] = '<p>You shopping cart is empty.</p>';
	}
	return join('',$output);
}
?>
