<?php

class DashboardController {
    public function index() {
        include './views/dashboard.php';
    }

    public function chiefEditorDashboard() {
        include './views/chiefEditorDashboard.php';
    }

    public function adminDashboard() {
        include './views/adminDashboard.php';
    }
}
?>