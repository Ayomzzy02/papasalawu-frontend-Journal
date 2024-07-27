<header>
    <nav class="navbar navbar-expand-lg navbar-light yellow">
        <a class="navbar-brand" href="/">JournalApp</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/journalapp">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contact">Contact</a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <?php if (isset($_SESSION['authToken'])): ?>
                    <li class="nav-item"> 
                        <a class="btn btn-danger nav-link mx-2" href="/journalapp/logout.php">Logout</a>
                    </li>
                <?php else: ?>
                    <li class="nav-item">
                        <a class="btn btn-primary nav-link mx-2" href="/journalapp/signup">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-secondary nav-link mx-2" href="/journalapp/login">Login</a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
    </nav>
</header>
