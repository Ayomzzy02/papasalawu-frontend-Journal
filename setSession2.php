<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userRole'])) {
    $_SESSION['userRole'] = $data['userRole'];
    // Log the session data for debugging
    error_log("Session userRole set: " . $_SESSION['userRole']);
    echo json_encode(['status' => 'success', 'userRole' => $_SESSION['userRole']]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'userRole not provided']);
}
?>