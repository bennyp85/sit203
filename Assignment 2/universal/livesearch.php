<?php

$xmlDoc=new DOMDocument();
$xmlDoc->load("products.xml");

$x=$xmlDoc->getElementsByTagName('NAME');

//get the q parameter from URL
$q=$_GET["q"];

//lookup all links from the xml file if length of q>0
if (strlen($q)>0)
{
$hint="";
for($i=0; $i<($x->length); $i++)
  {
  //$y=$x->item($i)->getElementsByTagName('product');
  // $z=$x->item($i)->getElementsByTagName('url');
  if ($x->item($i)->nodeType==1)
    {
    //find a link matching the search text
    if (stristr($x->item($i)->textContent,$q))
      {
      $id= $i + 1001;
      if ($hint=="")
        {
        $hint="<a href='detail.html?id=".$id."' target='_blank'>" .
        $x->item($i)->textContent . "</a>";
        }
      else
        {
        $hint=$hint . "<br /><a href='detail.html?id=".$id."' target='_blank'>" .
        $x->item($i)->textContent . "</a>";
        }
      }
    }
  }
}

// Set output to "no suggestion" if no hint were found
// or to the correct values
if ($hint=="")
  {
  $response="no suggestion";
  }
else
  {
  $response=$hint;
  }

//output the response
echo $response;
?>
