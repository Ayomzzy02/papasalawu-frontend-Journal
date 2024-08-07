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
                <p>No issues reported.</p>
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
<script src="https://journalapp.zyplexmedia.com/journalapp/public/js/article.js"></script>';
include './views/layouts/main.php';
?>
