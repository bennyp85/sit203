<?php
$value = $_GET['query'];
$formfield = $_GET['field'];

if ($formfield == "fname") {
if (strlen($value) < 2) {
echo "Must be 2+ letters";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "lname") {
if (strlen($value) < 2) {
echo "Must be 2+ letters";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "address") {
if (strlen($value) < 2) {
echo "Must be 2+ letters";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "company") {
if (strlen($value) < 2) {
echo "Must be 2+ letters";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "city") {
if (strlen($value) < 2) {
echo "Must be 2+ letters";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "postcode") {
if (strlen($value) != 4) {
echo "Must be 4 numbers";
} else {
echo "<span>Valid</span>";
}
}


if ($formfield == "telephone") {
if (!preg_match("/^\d{2}-\d{4}-\d{4}$/", $value)) {
echo "Invalid telephone number";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "email") {
if (!preg_match("/.+\@.+\..+/", $value)) {
echo "Invalid email";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "cardname") {
if (!preg_match("/^[A-Z][a-z]+\s[A-Z][a-z]+$/", $value)) {
echo "Invalid name";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "cardnumber") {
if (strlen($value) != 16) {
echo "Must be 16 numbers";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "expmonth") {
if (strlen($value) != 2) {
echo "Must be 2 number";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "cvv") {
if (strlen($value) != 3) {
echo "Must be 3 numbers";
} else {
echo "<span>Valid</span>";
}
}

if ($formfield == "expyear") {
if (strlen($value) != 2) {
echo "Must be 2 numbers";
} else {
echo "<span>Valid</span>";
}
}

?>
