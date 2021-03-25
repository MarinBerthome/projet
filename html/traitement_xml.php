<?php



/*$last_item = $xml->xpath('//player [last()]');
$last_id = (int) $last_item[0]->id;
$newItemId = $last_id + 1;
echo $newItemId; // 3*/

if(isset($_POST['path']) && isset($_POST['pseudo']) && isset($_POST['score']) && isset ($_POST['temps']))
{
    $path = $_POST['path'];
}   

$xml = simplexml_load_file($path);
$sxe = new SimpleXMLElement($xml->asXML());
$player = $sxe->addChild('player');
$player->addChild('pseudo', $_POST['pseudo']);
$player->addChild('score', $_POST['score']);
$player->addChild('temps', $_POST['temps']);  


$sxe->asXML($path);

echo 'cbon';

?>