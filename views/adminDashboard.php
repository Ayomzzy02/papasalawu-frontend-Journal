<?php
session_start(); // Start the session

// Check if the user is authenticated and if the user role is 'Admin'
if (!isset($_SESSION['authToken']) || !isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'Admin') {
    // If not authenticated or not an 'Admin', redirect to the login page
    header("Location: /journalapp/login");
    exit();
}

// If authenticated, proceed with the rest of the page
?>

<?php ob_start(); ?>

<div class="admin-dashboard-container">
    <h1 class="admin-dashboard-heading">Admin Dashboard</h1>
    
<!-- Top section with forms for adding Chief-Editor and Reviewer -->
<div class="top-section">
        <!-- Form for adding Chief-Editor -->
        <div class="add-chief-editor-container">
            <h2 class="section-heading">Add Chief-Editor</h2>
            <div id="messageContainer"></div> <!-- Message container -->
            <form id="addChiefEditorForm" class="add-chief-editor-form">
                <div class="form-group">
                    <label for="chiefEditorEmail">Email:</label>
                    <input type="email" id="chiefEditorEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="chiefEditorName">Name:</label>
                    <input type="text" id="chiefEditorName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="chiefEditorDepartment">Department:</label>
                    <select id="chiefEditorDepartment" name="department" required>
                        <option value="Adult and Primary Education">Adult and Primary Education</option>
                        <option value="Arts Education">Arts Education</option>
                        <option value="Computer Science Education">Computer Science Education</option>
                        <option value="Counsellor Education">Counsellor Education</option>
                        <option value="Educational Management">Educational Management</option>
                        <option value="Educational Technology">Educational Technology</option>
                        <option value="Environmental Health Education">Environmental Health Education</option>
                        <option value="Human Kinetics Education">Human Kinetics Education</option>
                        <option value="Science Education">Science Education</option>
                        <option value="Social Sciences Education">Social Sciences Education</option>
                    </select>
                </div>
                <button type="submit" class="submit-button">Add Chief-Editor</button>
            </form>
        </div>

        <!-- Form for adding Reviewer -->
        <div class="add-reviewer-container">
            <h2 class="section-heading">Add Reviewer</h2>
            <div id="reviewerMessageContainer"></div> <!-- Message container for reviewer form -->
            <form id="addReviewerForm" class="add-reviewer-form">
                <div class="form-group">
                    <label for="reviewerEmail">Email:</label>
                    <input type="email" id="reviewerEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="reviewerName">Name:</label>
                    <input type="text" id="reviewerName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="reviewerDepartment">Department:</label>
                    <select id="reviewerDepartment" name="department" required>
                        <option value="Adult and Primary Education">Adult and Primary Education</option>
                        <option value="Arts Education">Arts Education</option>
                        <option value="Computer Science Education">Computer Science Education</option>
                        <option value="Counsellor Education">Counsellor Education</option>
                        <option value="Educational Management">Educational Management</option>
                        <option value="Educational Technology">Educational Technology</option>
                        <option value="Environmental Health Education">Environmental Health Education</option>
                        <option value="Human Kinetics Education">Human Kinetics Education</option>
                        <option value="Science Education">Science Education</option>
                        <option value="Social Sciences Education">Social Sciences Education</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="anonymousName">Anonymous Name:</label>
                    <input type="text" id="anonymousName" name="anonymousName" required>
                </div>
                <button type="submit" class="submit-button">Add Reviewer</button>
            </form>
        </div>
    </div>
    
    
    <!-- Middle section -->
    <div class="middle-section">
        <div class="payment-section">
            <h2 class="section-heading">Payment List</h2>
            <div class="dropdown-container">
                <button id="pendingPayments" class="dropdown-button">Pending Payments</button>
                <button id="paidPayments" class="dropdown-button">Paid Payments</button>
            </div>
            <div id="paymentTableContainer" class="payment-table-container"></div>
        </div>
    </div>

    <!-- Modal Container -->
    <div id="confirmationModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="confirmationModalLabel">Confirm Verification</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="modalMessage"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="confirmVerifyBtn">Verify</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bottom section -->
    <div class="bottom-section">
        <!-- Bottom section content goes here -->
    </div>
</div>

<script src="https://nijetunilorin.com/journalapp/public/js/admin.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
