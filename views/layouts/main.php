<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CSS from CDN -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://nijetunilorin.com/public/css/styles.css">
    <link rel="stylesheet" href="https://nijetunilorin.com/public/css/issueConversation.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <title>Unilorin Edu Journal App</title>
</head>
<body>
    <div class="d-flex flex-column min-vh-100">
        <?php include '././views/partials/header.php'; ?>
        <div class="d-flex flex-fill">
            <?php include '././views/partials/sidebar.php'; ?>
            <div class="content-wrapper flex-fill">
                <main class="container">
                    <?php echo $content; ?>
                </main>
            </div>
        </div>
        <?php include '././views/partials/footer.php'; ?>
    </div>
    
    
    <!-- Bootstrap JS and Popper.js from CDN -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://nijetunilorin.com/public/js/auth.js"></script>
</body>
</html>
