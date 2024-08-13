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

<?php ob_start(); ?>

<div class="issue-page-container">
    <!-- Header Section -->
    <div class="issue-heade">
        <h1 class="issue-title">Sample Issue Title</h1>
        <div class="issue-meta">
            <span class="issue-status">
                <i class="material-icons">error_outline</i> Opened
            </span>
            by AnonymousReviewer1 opened this issue 2 hours ago
            <span class="issue-comments">2 comments</span>
        </div>
        <hr>
    </div>

    <!-- Message Container -->
    <div class="messages-container">
        <div class="message-box">
            <div class="message-header">
                <span class="message-author">AnonymousReviewer1 (Reviewer)</span>
                commented 2 hours ago
            </div>
            <div class="message-content">
                <p>This is a sample comment message by the reviewer.</p>
            </div>
        </div>
        <div class="message-connector"></div>
        <div class="message-box">
            <div class="message-header">
                <span class="message-author">Author</span>
                commented 1 hour ago
            </div>
            <div class="message-content">
                <p>This is a sample comment message by the author.</p>
            </div>
        </div>
        <div class="message-connector"></div>
        <!-- More messages can be added here -->
    </div>

    <!-- Add Comment Section -->
    <div class="add-comment-section">
        <h2>Add a Comment</h2>
        <textarea class="comment-editor" placeholder="Write your comment here..."></textarea>
        <button class="btn btn-primary add-comment-btn">Add Comment</button>
    </div>
</div>

<script src="https://nijetunilorin.com/public/js/reviewer.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
