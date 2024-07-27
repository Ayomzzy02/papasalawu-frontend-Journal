<?php

class SignupController {
    public function index() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Process form data
            $fullName = $_POST['fullName'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Assume validation and user creation logic here

            // Redirect to welcome page
            $router = new Router();
            $router->redirect('/welcome');
        } else {
            include './views/signup.php';
        }
    }
}

class LoginController {
    public function index() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Process form data
            $fullName = $_POST['fullName'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Assume validation and user creation logic here

            // Redirect to welcome page
            $router = new Router();
            $router->redirect('/welcome');
        } else {
            include './views/login.php';
        }
    }
}

?>
