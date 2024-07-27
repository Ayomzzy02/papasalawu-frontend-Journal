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
// Assume $articleStatus is a variable that contains the current status of the article

$content = '
<div id="article-container" class="container mt-3">
    <nav class="article-nav">
        <a href="#in-review" class="article-nav-item" data-status="In-Review"><i class="fas fa-clipboard-check"></i> In-Review</a>
        <a href="#accepted-rejected" class="article-nav-item" data-status="Accepted/Rejected"><i class="fas fa-check-circle"></i> Accepted/Rejected</a>
        <a href="#published" class="article-nav-item" data-status="Published"><i class="fas fa-book"></i> Published</a>
    </nav>
    <div id="article-content">
        <!-- In-Review Section -->
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
                        <tr>
                            <td><i class="fas fa-file-pdf"></i> Initial Upload</td>
                            <td>John Doe, Jane Smith</td>
                            <td>2024-07-01</td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-file-pdf"></i> Seeing the Usefulness of this</td>
                            <td>John Doe, Jane Smith</td>
                            <td>2024-07-01</td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-file-pdf"></i> Seeing the Usefulness of this</td>
                            <td>John Doe, Jane Smith</td>
                            <td>2024-07-01</td>
                        </tr>
                        <!-- Additional rows here -->
                    </tbody>
                </table>
            </div>
            <div class="issue-content" id="issue" style="display:none;">
                <!-- Issue content goes here -->
                <p>No issues reported.</p>
            </div>
        </section>
        <!-- Accepted/Rejected Section -->
        <section id="accepted-rejected" style="display: none;">
            <!-- Placeholder for the accepted/rejected content -->
        </section>
    </div>
</div>
<script src="http://localhost/journalapp/public/js/article.js"></script>';
include './views/layouts/main.php';
?>
