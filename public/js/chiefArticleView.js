document.addEventListener('DOMContentLoaded', function() {
    const associatedReviewersList = document.getElementById('associatedReviewersList');
    const reviewerSelect = document.getElementById('reviewerSelect');
    const addReviewerForm = document.getElementById('addReviewerForm');

    const articleId = window.location.pathname.split('/').pop();

    // Fetch and display reviewers when the page loads
    fetchReviewers();

    addReviewerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedReviewerId = reviewerSelect.value;
        if (selectedReviewerId) {
            addReviewer(selectedReviewerId);
        }
    });

    async function fetchReviewers() {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.get(`/chief-editor/getArticleReviwers/${articleId}`);
            const { reviewers, allReviewers } = response.data.data;

            // Populate reviewers section
            associatedReviewersList.innerHTML = '';
            reviewers.forEach(reviewer => {
                const listItem = document.createElement('li');
                listItem.textContent = `${reviewer.name} (${reviewer.anonymousName})`;
                associatedReviewersList.appendChild(listItem);
            });

            // Populate dropdown for adding reviewers
            reviewerSelect.innerHTML = '<option value="">Select Reviewer</option>'; // Default option
            allReviewers.forEach(reviewer => {
                const option = document.createElement('option');
                option.value = reviewer._id;
                option.textContent = `${reviewer.name} (${reviewer.anonymousName})`;
                reviewerSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching reviewers:', error);
            alert('An error occurred while fetching reviewers. Please try again later.');
        }
    }

    async function addReviewer(reviewerID) {
        try {
            const axiosInstance = createAxiosInstance();
            await axiosInstance.post(`/chief-editor/addReviwer/${articleId}`, { reviewerID });
            // Refetch and display reviewers after adding a new one
            fetchReviewers();
        } catch (error) {
            console.error('Error adding reviewer:', error);
            alert('An error occurred while adding the reviewer. Please try again later.');
        }
    }

    function createAxiosInstance() {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8001/v1', // Set the base URL for your backend API
        });

        // Add a request interceptor to include the token in the Authorization header
        axiosInstance.interceptors.request.use(
            function(config) {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='))
                    ?.split('=')[1];

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );

        return axiosInstance;
    }
});
