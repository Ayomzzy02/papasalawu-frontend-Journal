<?php
$content = '
<div class="signup-container">
    <div class="signup-card">
        <div class="signup-card-header">
            <h2>Login</h2>
        </div>
        <div class="signup-card-body">
            <form id="loginForm">
                <div id="message"></div> <!-- Container for displaying messages -->
                <div class="signup-form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" class="form-control" required>
                </div>
                <div class="signup-form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control" required>
                </div>
                <button type="submit" class="btn signup-btn-primary">Login</button>
            </form>
            <p>Dont have an account? <a href="/journalapp/signup">Sign up here</a></p>
        </div>
    </div>
</div>
';
include './views/layouts/main.php';
?>
