<?php

class Router {
    private $routes = [];

    public function add($route, $action, $statusCode = 200) {
        // Convert Express.js-like route parameters to regex
        $route = preg_replace('/\//', '\\/', $route);
        $route = preg_replace('/\:[a-zA-Z0-9_]+/', '(?P<$0>[a-zA-Z0-9_%20]+)', $route);
        $route = '/^' . str_replace(':', '', $route) . '$/';
        $this->routes[$route] = ['action' => $action, 'statusCode' => $statusCode];
    }

    public function dispatch() {
        $url = $this->parseUrl();
        foreach ($this->routes as $route => $data) {
            if (preg_match($route, $url, $matches)) {
                $params = [];
                foreach ($matches as $key => $match) {
                    if (is_string($key)) {
                        // Decode URL-encoded parameters
                        $params[$key] = urldecode($match);
                    }
                }
                http_response_code($data['statusCode']);
                call_user_func($data['action'], $params);
                return;
            }
        }
        $this->notFound($url);
    }

    private function parseUrl() {
        $urlPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return rtrim($urlPath, '/');
    }

    private function notFound($url) {
        http_response_code(404);
        echo "404 Not Found: " . htmlspecialchars($url);
    }

    public function redirect($url, $statusCode = 302) {
        http_response_code($statusCode);
        header('Location: ' . $url);
        exit();
    }
}
?>
