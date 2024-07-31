document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    const articlesTableBody = document.getElementById('articlesTableBody');

    categoryDropdown.addEventListener('change', function() {
        const category = this.value;
        fetchArticlesByCategory(category);
    });

    async function fetchArticlesByCategory(category) {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.get(`/chief-editor/getUserArticles`);
            const articles = response.data.data;

            if (category === 'pending') {
                displayArticles(articles.pending);
            } else if (category === 'published') {
                displayArticles(articles.published);
            } else if (category === 'accepted') {
                displayArticles(articles.accepted);
            } else if (category === 'rejected') {
                displayArticles(articles.rejected);
            } 
        } catch (error) {
            console.error('Error fetching articles:', error);
            alert('An error occurred while fetching articles. Please try again later.');
        }
    }

    function displayArticles(articles) {
        articlesTableBody.innerHTML = '';
        articles.forEach(article => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${article.title}</td>
                <td>${article.author.name}</td>
                <td>${new Date(article.submissionDate).toLocaleDateString()}</td>
                <td><button class="action-btn" data-article-id="${article._id}">View</button></td>
            `;
            articlesTableBody.appendChild(row);
        });

        // Add click event listener to "View" buttons after they are added to the DOM
        document.querySelectorAll('.action-btn').forEach(button => {
            button.addEventListener('click', function() {
                const articleId = this.getAttribute('data-article-id');
                window.location.href = `/journalapp/chief-Editor/view/${articleId}`;
            });
        });
    }

    // Initialize by fetching Pending articles
    fetchArticlesByCategory('pending');
});

function createAxiosInstance() {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8001/v1', // Set the base URL for your backend API
    });

    // Add a request interceptor to include the token in the Authorization header
    axiosInstance.interceptors.request.use(
        function (config) {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
            console.log(token)

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
