<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['token'])) {
    $_SESSION['authToken'] = $data['token'];
    // Log the session data for debugging
    error_log("Session token set: " . $_SESSION['authToken']);
    echo json_encode(['status' => 'success', 'token' => $_SESSION['authToken']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Token not provided']);
}
?>
