document.addEventListener('DOMContentLoaded', function() {
    const associatedReviewersList = document.getElementById('associatedReviewersList');
    const reviewerSelect = document.getElementById('reviewerSelect');
    const addReviewerForm = document.getElementById('addReviewerForm');
    const acceptButton = document.getElementById('acceptButton');
    const rejectButton = document.getElementById('rejectButton');
    const errorModal = document.getElementById('errorModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const errorMessageElement = document.getElementById('errorMessage');
    const issueList = document.getElementById('issueList');
    const openIssuesCountElement = document.getElementById('openIssuesCount');
    const closedIssuesCountElement = document.getElementById('closedIssuesCount');
    const articleId = window.location.pathname.split('/').pop();

    // Fetch and display reviewers and issues when the page loads
    fetchReviewers();
    fetchIssues();

    addReviewerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedReviewerId = reviewerSelect.value;
        if (selectedReviewerId) {
            addReviewer(selectedReviewerId);
        }
    });

    acceptButton.addEventListener('click', function() {
        acceptArticle();
    });

    closeModalButton.addEventListener('click', function() {
        closeModal();
    });

    async function fetchReviewers() {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.get(`/chief-editor/getArticleReviwers/${articleId}`);
            const { reviewers, allReviewers, articleStatus } = response.data.data;

            console.log(articleStatus)

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

            // Update the UI based on the article status
            const actionButtonsContainer = document.querySelector('.action-buttons');
            if (articleStatus === 'Accepted') {
                acceptButton.disabled = true;
                rejectButton.remove();
                actionButtonsContainer.innerHTML += `
                    <p class="accepted-text">
                        <i class="fas fa-check-circle"></i> This article has been accepted.
                    </p>
                `;
            } else if (articleStatus === 'Rejected') {
                rejectButton.disabled = true;
                acceptButton.remove();
                actionButtonsContainer.innerHTML += `
                    <p class="rejected-text">
                        <i class="fas fa-times-circle"></i> This article has been rejected.
                    </p>
                `;
            } else if (articleStatus === 'Published') {
                acceptButton.disabled = true;
                rejectButton.remove();
                actionButtonsContainer.innerHTML += `
                    <p class="accepted-text">
                        <i class="fas fa-check-circle"></i> This article has been Published.
                    </p>
                `;
            }
        } catch (error) {
            console.error('Error fetching reviewers:', error);
            showErrorModal('An error occurred while fetching reviewers. Please try again later.');
        }
    }

    async function fetchIssues() {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.get(`issue/getAllIssues/${articleId}`);
            const { openIssuesCount, closedIssuesCount, issues } = response.data.data;

            // Update the counts
            openIssuesCountElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${openIssuesCount} Open`;
            closedIssuesCountElement.innerHTML = `<i class="fas fa-check-circle"></i> ${closedIssuesCount} Closed`;

            // Populate issues list
            issueList.innerHTML = '';
            issues.forEach(issue => {
                const issueItem = document.createElement('li');
                issueItem.classList.add('issue-item');
                issueItem.innerHTML = `
                    <div class="issue-title">${issue.title}</div>
                    <div class="issue-meta">Opened ${issue.timeSinceOpened} by ${issue.openedBy}</div>
                    <div class="issue-conversations">
                        <i class="fas fa-comments"></i> ${issue.conversationCount}
                    </div>
                `;
                issueList.appendChild(issueItem);
            });
        } catch (error) {
            console.error('Error fetching issues:', error);
            showErrorModal('An error occurred while fetching issues. Please try again later.');
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
            showErrorModal('An error occurred while adding the reviewer. Please try again later.');
        }
    }

    async function acceptArticle() {
        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.patch(`/chief-editor/acceptArticle/${articleId}`);

            if (response.status === 200) {
                // Update the UI to reflect the accepted status
                const actionButtonsContainer = document.querySelector('.action-buttons');
                acceptButton.disabled = true;
                rejectButton.remove();
                actionButtonsContainer.innerHTML += `
                    <p class="accepted-text">
                        <i class="fas fa-check-circle"></i> This article has been accepted.
                    </p>
                `;
            } else {
                showErrorModal(response.data.data);
            }
        } catch (error) {
            console.error('Error accepting article:', error);
            showErrorModal(`${error.response.data.data} Resolve and close Issues on this article`);
        }
    }

    function closeModal() {
        errorModal.style.display = 'none';
    }

    function showErrorModal(message) {
        errorMessageElement.textContent = message;
        errorModal.style.display = 'block';
    }

    function createAxiosInstance() {
        const axiosInstance = axios.create({
            baseURL: 'https://api.zyplexmedia.com/v1', // Set the base URL for your backend API
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

    function showErrorModal(message) {
        errorMessageElement.textContent = message;
        errorModal.style.display = 'block';
        setTimeout(closeModal, 4000); // Hide the modal after 4 seconds
    }

    function closeModal() {
        errorModal.style.display = 'none';
    }
});
