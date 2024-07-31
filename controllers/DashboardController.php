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

    public function chiefArticleView() {
        include './views/chiefArticleView.php';
    }

    public function reviewerDashboard() {
        include './views/reviewerDashboard.php';
    }

    public function reviewerArticleView() {
        include './views/reviewerArticleView.php';
    }
}
?>