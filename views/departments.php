<?php ob_start(); ?>

<div class="department-container">
    <h1 class="department-heading">Journal of <?php echo $departmentName; ?></h1>
    <div class="filter-container">
        <label for="yearFilter">Filter by Year:</label>
        <select id="yearFilter">
            <option value="all">All</option>
        </select>
    </div>
    <div id="articlesList" class="articles-list"></div>
</div>
<script src="././public/js/department.js"></script>

<?php
$content = ob_get_clean();
include './views/layouts/main.php';
?>
