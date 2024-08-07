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
    <!-- Title Section -->
    <div class="issue-title-section">
        <h1 class="issue-title">Issue Title Goes Here</h1>
    </div>

    <!-- Status and Metadata -->
    <div class="issue-status-meta">
        <span class="issue-status-icon"><i class="material-icons">error_outline</i></span>
        <span class="issue-meta-text">AnonymousUser opened this issue 3 days ago</span>
    </div>

    <hr class="issue-divider" />

    <!-- Conversations Container -->
    <div class="conversations-container" id="conversationsContainer">
        <!-- Dynamic Conversation Data will be populated here -->
        <div class="conversation">
            <div class="conversation-meta">
                <span class="anonymous-name">AnonymousUser</span> commented 3 days ago
            </div>
            <div class="conversation-content">
                This is a sample comment.
            </div>
            <hr class="conversation-divider" />
        </div>
        <div class="conversation">
            <div class="conversation-meta">
                <span class="anonymous-name">AnonymousUser</span> commented 3 days ago
            </div>
            <div class="conversation-content">
                This is a sample comment.
            </div>
            <hr class="conversation-divider" />
        </div>
        <div class="conversation">
            <div class="conversation-meta">
                <span class="anonymous-name">AnonymousUser</span> commented 3 days ago
            </div>
            <div class="conversation-content">
                This is a sample comment.
            </div>
            <hr class="conversation-divider" />
        </div>
        <div class="conversation">
            <div class="conversation-meta">
                <span class="anonymous-name">AnonymousUser</span> commented 3 days ago
            </div>
            <div class="conversation-content">
                This is a sample comment.
            </div>
            <hr class="conversation-divider" />
        </div>
        <div class="conversation">
            <div class="conversation-meta">
                <span class="anonymous-name">AnonymousUser</span> commented 3 days ago
            </div>
            <div class="conversation-content">
                This is a sample comment.
            </div>
            <hr class="conversation-divider" />
        </div>
        <!-- More conversations will be added dynamically -->
    </div>

    <!-- Add Comment Section -->
    <div class="add-comment-section">
        <h2 class="add-comment-title">Add a Comment</h2>
        <textarea class="comment-editor" id="commentEditor" placeholder="Write your comment here..."></textarea>
        <div class="file-upload-section">
            <input type="file" id="fileUpload" class="file-upload-input" />
            <label for="fileUpload" class="file-upload-label">Attach a file</label>
        </div>
        <button class="btn btn-primary add-comment-btn" id="addCommentBtn">Add Comment</button>
    </div>
</div>

<script src="https://journalapp.zyplexmedia.com/journalapp/public/js/issueConversation.js"></script>
<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>