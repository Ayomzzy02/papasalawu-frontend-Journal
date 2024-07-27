<?php
session_start(); // Start the session

// Check if the user is authenticated and if the user role is 'Chief-Editor'
if (!isset($_SESSION['authToken']) || !isset($_SESSION['userRole']) || $_SESSION['userRole'] !== 'Admin') {
    // If not authenticated or not a 'Chief-Editor', redirect to the login page
    header("Location: /journalapp/login");
    exit();
}

// If authenticated, proceed with the rest of the page
?>


<?php ob_start(); ?>

<div class="admin-dashboard-container">
    <h1 class="admin-dashboard-heading">Admin Dashboard</h1>
    
    <!-- Top section with form for adding Chief-Editor -->
    <div class="top-section">
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
    </div>
    
    <!-- Middle section -->
    <div class="middle-section">
        <!-- Middle section content goes here -->
    </div>
    
    <!-- Bottom section -->
    <div class="bottom-section">
        <!-- Bottom section content goes here -->
    </div>
</div>

<script src="http://localhost/journalapp/public/js/admin.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
