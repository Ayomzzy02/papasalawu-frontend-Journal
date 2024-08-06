document.addEventListener('DOMContentLoaded', function() {
    function createAxiosInstance() {
        const axiosInstance = axios.create({
            baseURL: 'http://journalapp.zyplexmedia.com:8001/v1',
        });

        axiosInstance.interceptors.request.use(
            function (config) {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

        return axiosInstance;
    }

    function fetchArticle(articleId) {
        const axiosInstance = createAxiosInstance();
        axiosInstance.get(`/journal/article?articleId=${articleId}`)
            .then(response => {
                const { data } = response.data;
                populateArticleDetails(data);
            })
            .catch(error => {
                console.error("Error fetching article:", error);
                alert("An error occurred while fetching the article. Please try again later.");
            });
    }

    function populateArticleDetails(article) {
        document.getElementById('articleTitle').textContent = article.title;
        document.getElementById('articleAuthor').textContent = `By ${article.authorName}`;
        document.getElementById('articleAbstract').textContent = article.abstract;
        
        const keywordsList = document.getElementById('articleKeywords');
        article.keywords.forEach(keyword => {
            const listItem = document.createElement('li');
            listItem.textContent = keyword;
            keywordsList.appendChild(listItem);
        });

        const pdfLink = document.getElementById('pdfLink');
        pdfLink.href = article.latestDocumentUrl;
    }

    const pathArray = window.location.pathname.split('/');
    const articleId = decodeURIComponent(pathArray[pathArray.length - 1]);
    if (articleId) {
        fetchArticle(articleId);
    }
});