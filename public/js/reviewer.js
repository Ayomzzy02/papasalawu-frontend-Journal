document.addEventListener('DOMContentLoaded', async () => {
    const currentPath = window.location.pathname;
    const journalTableBody = document.getElementById('journalTableBody');
    const axiosInstance = createAxiosInstance();

    // Function to fetch reviewer's articles
    async function fetchReviewersArticles() {
        try {
            const response = await axiosInstance.get('/reviewer/getAllReviewersArticle');
            const articles = response.data.data.articles; // Correctly access the articles

            // Clear the table body before adding new rows
            journalTableBody.innerHTML = '';

            // Populate the table with the fetched articles
            articles.forEach((article, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${article.title}</td>
                    <td>${new Date(article.submissionDate).toLocaleDateString()}</td>
                    <td>${article.status}</td>
                    <td><a href="/journalapp/reviewer/view/${article._id}" class="btn btn-primary">View Details</a></td>
                `;

                journalTableBody.appendChild(row);
            });

            // Add event listeners to the "View Details" buttons
            const viewDetailsButtons = document.querySelectorAll('.view-details-button');
            viewDetailsButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const articleId = event.target.getAttribute('data-id');
                    window.location.href = `/journalapp/reviewer/article/${articleId}`;
                });
            });

        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    if (currentPath === '/journalapp/dashboard/reviewer') {
        // Call the function to fetch and populate articles
        fetchReviewersArticles();
    } else {
        // New Issue button click event to show the modal
        const newIssueBtn = document.querySelector('.new-issue-btn');
        const newIssueModal = new bootstrap.Modal(document.getElementById('newIssueModal'));

        newIssueBtn.addEventListener('click', () => {
            newIssueModal.show();
        });

        // Form submission for creating a new issue
        const newIssueForm = document.getElementById('newIssueForm');
        newIssueForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const issueTitle = document.getElementById('issueTitle').value;
            const issueDescription = document.getElementById('issueDescription').value;

            // Here you would send the data to your backend service
            // This example just logs it to the console
            console.log('New Issue Title:', issueTitle);
            console.log('New Issue Description:', issueDescription);

            // Clear the form
            newIssueForm.reset();

            // Hide the modal
            newIssueModal.hide();
        });
    }

});

// Function to create Axios instance
function createAxiosInstance() {
    const axiosInstance = axios.create({
        baseURL: 'https://api.zyplexmedia.com/v1', // Set the base URL for your backend API
    });

    // Add a request interceptor to include the token in the Authorization header
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
