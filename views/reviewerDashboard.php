<?php
session_start(); // Start the session

// Check if the user is authenticated and if the user role is 'Reviewer'
if (!isset($_SESSION['authToken']) || !isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'Reviewer') {
    // If not authenticated or not a 'Reviewer', redirect to the login page
    header("Location: /journalapp/login");
    exit();
}

// Store the auth token in a cookie
setcookie('token', $_SESSION['authToken'], time() + (86400 * 30), "/"); // 86400 = 1 day

// If authenticated, proceed with the rest of the page
?>

<?php ob_start(); ?>

<div class="reviewer-dashboard-container">
    <h1 class="dashboard-heading">Reviewer Dashboard</h1>

    <!-- Table for displaying assigned journals -->
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="journalTableBody">
                <!-- Rows will be dynamically populated -->
            </tbody>
        </table>
    </div>
</div>

<script src="https://nijetunilorin.com/journalapp/public/js/reviewer.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
