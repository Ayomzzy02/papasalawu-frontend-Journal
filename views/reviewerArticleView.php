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

    <!-- Middle section -->
    <div class="middle-section">
        <h2 class="section-heading">Issues</h2>
        <br/>
        <br/>
        <div class="issues-table-header">
            <div class="issues-count">
                <span class="open-issues"><i class="material-icons">error_outline</i> 0 Open</span>
                <span class="closed-issues"><i class="material-icons">check_circle_outline</i> 0 Closed</span>
            </div>
            <button class="btn btn-primary new-issue-btn" data-bs-toggle="modal" data-bs-target="#newIssueModal">New Issue</button>
        </div>
        <br/>
        <div class="issues-table-container">
            <table class="table table-hover issues-table">
                <tbody id="issuesTableBody">
                    <!-- Dynamic Issue Data will be populated here -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- New Issue Modal -->
    <div class="modal fade" id="newIssueModal" tabindex="-1" aria-labelledby="newIssueModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newIssueModalLabel">New Issue</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="newIssueForm">
                        <div class="mb-3">
                            <label for="issueTitle" class="form-label">Title</label>
                            <input type="text" class="form-control" id="issueTitle" required>
                        </div>
                        <div class="mb-3">
                            <label for="issueDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="issueDescription" rows="10" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom section -->
    <div class="bottom-section">
        <!-- Bottom section content goes here -->
    </div>
</div>
<script src="http://localhost/journalapp/public/js/reviewer2.js"></script>
<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
