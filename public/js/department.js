document.addEventListener('DOMContentLoaded', function() {
    function createAxiosInstance() {
        // Create an Axios instance
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8001/v1', // Set the base URL for your backend API
        });
    
        // Add a request interceptor to include the token in the Authorization header
        axiosInstance.interceptors.request.use(
            function (config) {
                // Get the token from the cookies
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];
                console.log(token);
    
                // If the token exists, include it in the Authorization header
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
    
                return config;
            },
            function (error) {
                // Handle request error
                return Promise.reject(error);
            }
        );
    
        return axiosInstance;
    }

    const articlesList = document.getElementById('articlesList');
    const yearFilter = document.getElementById('yearFilter');

    function fetchArticlesByDepartment(departmentName) {
        const axiosInstance = createAxiosInstance();
        axiosInstance.get(`/journal/departmentArticles?department=${departmentName}`)
            .then(response => {
                const { data } = response.data;
                displayArticles(data);
                populateYearFilter(data);
            })
            .catch(error => {
                console.error("Error fetching article:", error);
                alert("An error occurred while fetching Journals. Please try again later.");
            });
    }

    function displayArticles(data) {
        articlesList.innerHTML = '';
        for (const year in data) {
            const yearSection = document.createElement('div');
            yearSection.classList.add('year-section');
            data[year].forEach(article => {
                const articleItem = document.createElement('div');
                articleItem.classList.add('article-item');
                articleItem.innerHTML = `
                    <a href="/journalapp/${departmentName}/article/${article.id}" class="article-link">
                        <div class="article-details">
                            <h2 class="article-title">${article.title.toUpperCase()}</h2>
                            <p class="article-author">Author: ${article.author}</p>
                            <p class="article-date">${new Date(article.publishedDate).toLocaleDateString()}</p>
                        </div>
                    </a>
                `;
                yearSection.appendChild(articleItem);
            });
            articlesList.appendChild(yearSection);
        }
    }

    function populateYearFilter(data) {
        const years = Object.keys(data);
        yearFilter.innerHTML = '<option value="">All Years</option>';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    yearFilter.addEventListener('change', function() {
        const selectedYear = yearFilter.value;
        const yearSections = document.querySelectorAll('.year-section');
        yearSections.forEach(section => {
            if (selectedYear === '' || section.querySelector('h2').textContent === selectedYear) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });

    // Fetch articles if department is present in the URL
    const pathArray = window.location.pathname.split('/');
    const departmentName = decodeURIComponent(pathArray[pathArray.length - 1]);
    if (departmentName) {
        fetchArticlesByDepartment(departmentName);
    }

});
