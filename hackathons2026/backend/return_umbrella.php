<?php
header("Content-Type: application/json");
require "db.php";

ini_set('display_errors', 1);
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
  echo json_encode(["success"=>false,"message"=>"No JSON received"]);
  exit;
}

$umbrella_id = $data["umbrella_id"] ?? "";
$to_box_id = $data["to_box_id"] ?? "";

if (!$umbrella_id || !$to_box_id) {
  echo json_encode([
    "success"=>false,
    "message"=>"Missing umbrella_id or to_box_id"
  ]);
  exit;
}

$conn->begin_transaction();

try {
  $stmt1 = $conn->prepare(
    "UPDATE umbrellas SET current_box_id=?, status='in_box' WHERE umbrella_id=?"
  );
  $stmt1->bind_param("ss", $to_box_id, $umbrella_id);
  $stmt1->execute();

  $stmt2 = $conn->prepare(
    "INSERT INTO transactions (box_id, umbrella_id, action)
     VALUES (?, ?, 'return')"
  );
  $stmt2->bind_param("ss", $to_box_id, $umbrella_id);
  $stmt2->execute();

  $conn->commit();

  echo json_encode([
    "success"=>true,
    "message"=>"Umbrella returned successfully"
  ]);

} catch (Exception $e) {
  $conn->rollback();
  echo json_encode([
    "success"=>false,
    "message"=>$e->getMessage()
  ]);
}
