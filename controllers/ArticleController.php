<?php

class ArticleController {
    public function index($params) {
        $articleId = $params['id'];
        
        include './views/article.php';
    }

    public function department($params) {
        $departmentName = htmlspecialchars($params['department'], ENT_QUOTES, 'UTF-8');
        include './views/departments.php';
    }

    public function getArticle($params) {

        include './views/getArticle.php';
    }
}
?>