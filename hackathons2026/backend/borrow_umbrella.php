<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$box_id = $data["box_id"] ?? "";

if (!$box_id) {
  echo json_encode([
    "success" => false,
    "message" => "Box ID missing"
  ]);
  exit;
}

/* 1. Find umbrella in this box */
$stmt = $conn->prepare(
  "SELECT umbrella_id FROM umbrellas 
   WHERE current_box_id = ? AND status = 'in_box'"
);
$stmt->bind_param("s", $box_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo json_encode([
    "success" => false,
    "message" => "No umbrella available"
  ]);
  exit;
}

$row = $result->fetch_assoc();
$umbrella_id = $row["umbrella_id"];

/* 2. Update umbrella status */
$stmt = $conn->prepare(
  "UPDATE umbrellas 
   SET status = 'borrowed', current_box_id = NULL 
   WHERE umbrella_id = ?"
);
$stmt->bind_param("s", $umbrella_id);
$stmt->execute();

/* 3. Insert transaction */
$stmt = $conn->prepare(
  "INSERT INTO transactions (box_id, umbrella_id, action) 
   VALUES (?, ?, 'borrow')"
);
$stmt->bind_param("ss", $box_id, $umbrella_id);
$stmt->execute();

echo json_encode([
  "success" => true,
  "umbrella_id" => $umbrella_id,
  "message" => "Umbrella borrowed successfully"
]);
