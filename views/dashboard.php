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
<div id="dashboard-container" class="container mt-3">
    <div class="d-flex justify-content-end mb-3">
        <button id="submitArticleButton" class="btn btn-primary">Submit Article</button>
    </div>
    <br/>
    <div class="card">
        <div class="card-header">
            <h3>Your Submitted Articles</h3>
        </div>
        <div class="card-body">
            <div id="noArticlesMessage" class="alert alert-info" style="display: none;">
                <i class="fas fa-info-circle"></i> You have not submitted any articles yet.
            </div>
            <div class="table-responsive" id="articlesTable">
                <table class="table table-bordered table-striped table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Submission Date</th>
                            <th>Accepted Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="articlesTableBody">
                        <!-- Articles will be populated here by dashboard.js -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<!-- Modal for submitting an article -->
<div class="modal fade" id="submitArticleModal" tabindex="-1" role="dialog" aria-labelledby="submitArticleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="submitArticleModalLabel">Submit Article</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="submitArticleForm">
                    <div class="form-group">
                        <label for="articleTitle">Article Title</label>
                        <input type="text" class="form-control" id="articleTitle" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="articleAbstract">Abstract</label>
                        <textarea class="form-control" id="articleAbstract" name="abstract" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="articleKeywords">Keywords</label>
                        <input type="text" class="form-control" id="articleKeywords" name="keywords" required>
                    </div>
                    <div class="form-group">
                        <label for="articleDepartment">Department</label>
                        <select class="form-control" id="articleDepartment" name="department" required>
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
                        <label for="articleDocument">Article Document</label>
                        <input type="file" class="form-control-file" id="articleDocument" name="articleDoc" accept="application/pdf" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit article now</button>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="././public/js/dashboard.js"></script>';
include './views/layouts/main.php';
?>
