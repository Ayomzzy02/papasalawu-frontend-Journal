<?php
session_start(); // Start the session

// Check if the user is authenticated and if the user role is 'Chief-Editor'
if (!isset($_SESSION['authToken']) || !isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'Chief-Editor') {
    // If not authenticated or not a 'Chief-Editor', redirect to the login page
    header("Location: /journalapp/login");
    exit();
}

// If authenticated, proceed with the rest of the page
?>



<?php ob_start(); ?>

<div class="chief-editor-dashboard">
    <h1>Chief Editor Dashboard</h1>
    <div class="category-dropdown-container">
        <label for="categoryDropdown">Select Category:</label>
        <select id="categoryDropdown">
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
        </select>
    </div>
    <div class="articles-table-container">
        <table class="articles-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author's Name</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="articlesTableBody">
                <!-- Articles will be dynamically inserted here -->
            </tbody>
        </table>
    </div>
</div>

<script src="https://nijetunilorin.com/journalapp/public/js/chief.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>

