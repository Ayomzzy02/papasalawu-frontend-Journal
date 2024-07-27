<?php
require './router/Router.php';
require './controllers/HomeController.php';
require './controllers/AboutController.php';
require './controllers/AuthController.php';
require './controllers/DashboardController.php';
require './controllers/ArticleController.php';

$router = new Router();

// Define routes
$router->add('/journalapp', [new HomeController(), 'index']);
$router->add('/journalapp/about', [new AboutController(), 'index']);
$router->add('/journalapp/signup', [new SignupController(), 'index']);
$router->add('/journalapp/login', [new LoginController(), 'index']);
$router->add('/journalapp/dashboard', [new DashboardController(), 'index']); 
$router->add('/journalapp/dashboard/chief-Editor', [new DashboardController(), 'chiefEditorDashboard']);
$router->add('/journalapp/dashboard/admin', [new DashboardController(), 'adminDashboard']);
$router->add('/journalapp/article/:id', [new ArticleController(), 'index']);
$router->add('/journalapp/:department', [new ArticleController(), 'department']);
$router->add('/journalapp/:department/article/:articleId', [new ArticleController(), 'getArticle']);



// Dispatch the request
$router->dispatch();

?>