<?php
$content = '
<div class="signup-container">
    <div class="signup-card">
        <div class="signup-card-header">
            <h2>Sign Up</h2>
        </div>
        <div class="signup-card-body">
            <form id="signupForm">
            <div id="message"></div> <!-- Container for displaying messages -->
                <div class="signup-form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" class="form-control" required>
                </div>
                <div class="signup-form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>
                <div class="signup-form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>
                <button type="submit" class="btn signup-btn-primary">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/journalapp/login">Login here</a></p>
        </div>
    </div>
</div>
';
include './views/layouts/main.php';
?>
