document.addEventListener('DOMContentLoaded', function() {
    // Function to create Axios instance
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

    const axiosInstance = createAxiosInstance();

    // Function to fetch and display issues
    function fetchAndDisplayIssues(articleId) {
        axiosInstance.get(`issue/getAllIssues/${articleId}`)
            .then(response => {
                const data = response.data.data;

                const openIssuesCountElement = document.getElementById('openIssuesCount');
                const closedIssuesCountElement = document.getElementById('closedIssuesCount');
                const issueListElement = document.getElementById('issueList');
                const noIssuesMessageElement = document.getElementById('noIssuesMessage');

                // Update the counts
                openIssuesCountElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${data.openIssuesCount} Open`;
                closedIssuesCountElement.innerHTML = `<i class="fas fa-check-circle"></i> ${data.closedIssuesCount} Closed`;

                // Clear the existing issues
                issueListElement.innerHTML = '';

                if (data.issues.length === 0) {
                    noIssuesMessageElement.style.display = 'block';
                } else {
                    noIssuesMessageElement.style.display = 'none';

                    // Populate the issues
                    data.issues.forEach(issue => {
                        const issueItem = document.createElement('li');
                        issueItem.classList.add('issue-item');

                        issueItem.innerHTML = `
                            <div class="issue-title">${issue.title}</div>
                            <div class="issue-meta">
                                Opened ${issue.timeSinceOpened} by ${issue.openedBy}
                            </div>
                            <div class="issue-conversations">
                                <i class="fas fa-comments"></i> ${issue.conversationCount}
                            </div>
                        `;

                        issueListElement.appendChild(issueItem);
                    });
                }
            })
            .catch(error => {
                console.error(error);
                // Handle error (e.g., show error modal)
                const errorMessageElement = document.getElementById('errorMessage');
                errorMessageElement.innerText = 'An error occurred while fetching issues.';
                const errorModal = document.getElementById('errorModal');
                errorModal.style.display = 'block';
            });
    }

    const pathArray = window.location.pathname.split('/');
    const articleId = decodeURIComponent(pathArray[pathArray.length - 1]);
    if (articleId) {
        fetchAndDisplayIssues(articleId);
    }

    // Event listeners for modals
    const createIssueBtn = document.getElementById('createIssueBtn');
    const createIssueModal = document.getElementById('createIssueModal');
    const closeCreateIssueModalButton = document.getElementById('closeCreateIssueModalButton');
    const closeErrorModalButton = document.getElementById('closeErrorModalButton');

    createIssueBtn.addEventListener('click', function() {
        createIssueModal.style.display = 'block';
    });

    closeCreateIssueModalButton.addEventListener('click', function() {
        createIssueModal.style.display = 'none';
    });

    closeErrorModalButton.addEventListener('click', function() {
        const errorModal = document.getElementById('errorModal');
        errorModal.style.display = 'none';
    });

    // Event listener for creating a new issue
    const createIssueForm = document.getElementById('createIssueForm');
    createIssueForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const issueTitle = document.getElementById('issueTitle').value;
        const issueDescription = document.getElementById('issueDescription').value;

        axiosInstance.post(`issue/createIssue/${articleId}`, {
            title: issueTitle,
            description: issueDescription
        })
        .then(response => {
            createIssueModal.style.display = 'none';
            fetchAndDisplayIssues(articleId);
        })
        .catch(error => {
            console.error(error);
            // Handle error (e.g., show error modal)
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.innerText = 'An error occurred while creating the issue.';
            const errorModal = document.getElementById('errorModal');
            errorModal.style.display = 'block';
        });
    });
});
