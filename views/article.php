<?php
session_start(); // Start the session

// Check if the user is authenticated
if (!isset($_SESSION['authToken'])) {
    // If not authenticated, redirect to the login page
    header("Location: /journalapp/login");
    exit();
}

// If authenticated, proceed with the rest of the page
?>

<?php
$content = '
<div id="article-container" class="container mt-3">
    <nav class="article-nav">
        <a href="#in-review" class="article-nav-item" data-status="In-Review"><i class="fas fa-clipboard-check"></i> In-Review</a>
        <a href="#accepted-rejected" class="article-nav-item" data-status="Accepted/Rejected"><i class="fas fa-check-circle"></i> Accepted/Rejected</a>
        <a href="#published" class="article-nav-item" data-status="Published"><i class="fas fa-book"></i> Published</a>
    </nav>
    <div id="article-content">
        <section id="in-review">
            <nav class="in-review-nav">
                <div class="in-review-nav-item active" data-target="history"><i class="fas fa-history"></i> History</div>
                <div class="in-review-nav-item" data-target="issue"><i class="fas fa-exclamation-circle"></i> Issue</div>
            </nav>
            <div class="history-content" id="history">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Issue</th>
                            <th>Reviewer(s)</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Dynamic rows will be populated here -->
                    </tbody>
                </table>
            </div>
            <div class="issue-content" id="issue" style="display:none;">
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
                    </div>
                    <ul class="issue-list" id="issueList">
                        <!-- Issue items will be populated here -->
                    </ul>
                    <div id="noIssuesMessage" style="display: none;">There are no Issues Opened for this Article yet.</div>
                </div>
                <div id="errorModal" class="modal">
                      <div class="modal-content">
                            <span class="close-button" id="closeErrorModalButton">&times;</span>
                            <p id="errorMessage"></p>
                        </div>
                </div>

            </div>
        </section>

        <section id="accepted-rejected" style="display: none;">
            <!-- Placeholder for the accepted/rejected content -->
        </section>
        <section id="published" style="display: none;">
            <!-- Placeholder for the published content -->
        </section>
    </div>
</div>
<script src="/journalapp/public/js/article.js"></script>';
include './views/layouts/main.php';
?>
