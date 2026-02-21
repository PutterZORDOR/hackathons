<?php
header("Content-Type: application/json");
require "db.php";

// Read raw input
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Fallback to POST
$box_id = $data["box_id"] ?? $_POST["box_id"] ?? "";

if (!$box_id) {
    echo json_encode([
        "success" => false,
        "message" => "Box ID missing",
        "raw" => $raw
    ]);
    exit;
}

$sql = "SELECT * FROM boxes WHERE box_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $box_id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => true,
        "box" => $result->fetch_assoc()
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Box not found"
    ]);
}


