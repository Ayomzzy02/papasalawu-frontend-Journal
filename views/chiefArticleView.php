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

<div class="chief-article-view-container">
    <h1 class="chief-article-view-heading">Article Details</h1>
    
    <!-- Top section -->
    <div class="top-section">
        <!-- Dropdown for listing reviewers -->
        <div class="add-reviewer-container">
            <h2 class="section-heading">Add Reviewer</h2>
            <form id="addReviewerForm" class="add-reviewer-form">
                <div class="form-group">
                    <label for="reviewerSelect">Select Reviewer:</label>
                    <select id="reviewerSelect" name="reviewer" required>
                        <!-- Options will be dynamically populated -->
                    </select>
                </div>
                <button type="submit" class="submit-button">Add Reviewer</button>
            </form>
        </div>

        <!-- Display reviewers associated with the article -->
        <div class="associated-reviewers-container">
            <h2 class="section-heading">Associated Reviewers</h2>
            <ul id="associatedReviewersList">
                <!-- Reviewers will be dynamically populated -->
            </ul>
        </div>
    </div>

    <!-- Middle section -->
<div class="middle-section">
    <!-- Action buttons for accept and reject -->
    <div class="action-buttons">
        <button id="acceptButton" class="action-button accept-button">Accept</button>
        <button id="rejectButton" class="action-button reject-button">Reject</button>
    </div>
    <!-- Middle section content goes here -->
    <div class="issue-section">
        <div class="issue-header">
            <span class="issue-count open-issues">
                <i class="fas fa-exclamation-circle"></i>
                10 Open
            </span>
            <span class="issue-count closed-issues">
                <i class="fas fa-check-circle"></i>
                5 Closed
            </span>
        </div>
        <ul class="issue-list">
            <li class="issue-item">
                <div class="issue-title">Issue with article submission</div>
                <div class="issue-meta">
                    Opened 2 hours ago by AnonymousReviewer1
                </div>
                <div class="issue-conversations">
                    <i class="fas fa-comments"></i>
                    3
                </div>
            </li>
            <li class="issue-item">
                <div class="issue-title">Error in the review process</div>
                <div class="issue-meta">
                    Opened 1 day ago by AnonymousReviewer2
                </div>
                <div class="issue-conversations">
                    <i class="fas fa-comments"></i>
                    5
                </div>
            </li>
            <!-- Add more issue items as needed -->
        </ul>
    </div>
</div>

<!-- Error Modal -->
<div id="errorModal" class="modal">
    <div class="modal-content">
        <span class="close-button" id="closeModalButton">&times;</span>
        <p id="errorMessage"></p>
    </div>
</div>
    <!-- Bottom section -->
    <div class="bottom-section">
        <!-- Bottom section content goes here -->
    </div>
</div>

<script src="https://journalapp.zyplexmedia.com/journalapp/public/js/chiefArticleView.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>