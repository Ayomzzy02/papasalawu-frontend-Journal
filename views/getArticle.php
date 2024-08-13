<?php ob_start(); ?>

<div class="article-details-container">
    <h1 id="articleTitle" class="article-title"></h1>
    <p id="articleAuthor" class="article-author"></p>
    <h2 class="abstract-heading">Abstract</h2>
    <div class="underline"></div>
    <p id="articleAbstract" class="article-abstract"></p>
    <p class="keywords-heading">Keywords:</p>
    <ul id="articleKeywords" class="article-keywords"></ul>
    <a id="pdfLink" class="pdf-link" href="#" target="_blank">
        <img src="https://nijetunilorin.com/journalapp/public/images/pdficon.svg" alt="PDF Icon" class="pdf-icon">
    </a>
</div>

<script src="https://nijetunilorin.com/public/js/getArticle.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
