<?php
$conn = new mysqli("localhost", "root", "Noon1422", "umbrella_system");

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]));
}
?>