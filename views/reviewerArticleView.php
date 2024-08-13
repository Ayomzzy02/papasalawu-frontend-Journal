<?php
session_start(); // Start the session

// Check if the user is authenticated and if the user role is 'Reviewer'
if (!isset($_SESSION['authToken']) || !isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'Reviewer') {
    // If not authenticated or not a 'Reviewer', redirect to the login page
    header("Location: /journalapp/login");
    exit();
}

// If authenticated, proceed with the rest of the page
?>

<?php ob_start(); ?>

<div class="reviewer-article-view-container">
    <h1 class="page-heading">Article Details</h1>
    
    <!-- Top section -->
    <div class="top-section">
        <h2 class="section-heading">Upload History</h2>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Version</th>
                    <th>Upload Date</th>
                    <th>File</th>
                </tr>
            </thead>
            <tbody id="uploadHistoryTableBody">
                <!-- Sample Data -->
                <tr>
                    <td>1</td>
                    <td>Version 1</td>
                    <td>2024-07-28</td>
                    <td><a href="#" class="btn btn-secondary">Download</a></td>
                </tr>
                <!-- More rows can be added here -->
            </tbody>
        </table>
    </div>

    <!-- Middle section content goes here -->
    <div class="issue-section">
        <div class="issue-header">
            <span class="issue-count open-issues" id="openIssuesCount">
                <i class="fas fa-exclamation-circle"></i>
                0 Open
            </span>
            <span class="issue-count closed-issues" id="closedIssuesCount">
                <i class="fas fa-check-circle"></i>
                0 Closed
            </span>
            <button class="btn btn-primary create-issue-btn" id="createIssueBtn">Create Issue</button>
        </div>
        <ul class="issue-list" id="issueList">
            <!-- Issue items will be populated here -->
        </ul>
        <div id="noIssuesMessage" style="display: none;">There are no Issues Opened for this Article yet.</div>
    </div>

    <!-- Error Modal -->
<div id="errorModal" class="modal">
    <div class="modal-content">
        <span class="close-button" id="closeErrorModalButton">&times;</span>
        <p id="errorMessage"></p>
    </div>
</div>

    <!-- Create Issue Modal -->
    <div id="createIssueModal" class="modal">
        <div class="modal-content">
            <span class="close-button" id="closeCreateIssueModalButton">&times;</span>
            <h2>Create Issue</h2>
            <form id="createIssueForm">
                <div class="form-group">
                    <label for="issueTitle">Title</label>
                    <input type="text" id="issueTitle" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="issueDescription">Description</label>
                    <textarea id="issueDescription" class="form-control" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>

<script src="https://nijetunilorin.com/public/js/reviewer2.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
