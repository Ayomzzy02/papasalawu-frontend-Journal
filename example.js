document.addEventListener('DOMContentLoaded', async () => {
    const issuesTableBody = document.getElementById('issuesTableBody');
    const openIssuesCount = document.querySelector('.open-issues');
    const closedIssuesCount = document.querySelector('.closed-issues');
    const axiosInstance = createAxiosInstance();

    // Function to fetch issues by article ID
    async function fetchIssuesByArticleId(articleId) {
        try {
            const response = await axiosInstance.get(`/issues/article/${articleId}`);
            const data = response.data;

            // Clear the table body before adding new rows
            issuesTableBody.innerHTML = '';

            // Update the open and closed issues count
            openIssuesCount.textContent = `${data.openIssuesCount} Open`;
            closedIssuesCount.textContent = `${data.closedIssuesCount} Closed`;

            // Check if there are issues to display
            if (data.issues.length === 0) {
                const noIssuesRow = document.createElement('tr');
                noIssuesRow.innerHTML = `
                    <td colspan="2">There are no issues reported for this article.</td>
                `;
                issuesTableBody.appendChild(noIssuesRow);
                return;
            }

            // Populate the table with the fetched issues
            data.issues.forEach((issue, index) => {
                const row = document.createElement('tr');
                row.className = 'issue-row';

                row.innerHTML = `
                    <td>
                        <a href="/journalapp/issues/${index + 1}">
                            <span class="issue-status-icon">
                                <i class="material-icons">${issue.status === 'Opened' ? 'error_outline' : 'check_circle_outline'}</i>
                            </span>
                            <div class="issue-title">${issue.title}</div>
                            <div class="issue-meta">Opened ${issue.timeSinceOpened} by ${issue.openedBy}</div>
                        </a>
                    </td>
                    <td class="text-right">
                        <span class="issue-conversations"><i class="material-icons">comment</i> ${issue.conversationCount}</span>
                    </td>
                `;

                issuesTableBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error fetching issues:', error);
            const errorRow = document.createElement('tr');
            errorRow.innerHTML = `
                <td colspan="2">Error fetching issues. Please try again later.</td>
            `;
            issuesTableBody.appendChild(errorRow);
        }
    }

    const pathArray = window.location.pathname.split('/');
    const articleId = decodeURIComponent(pathArray[pathArray.length - 1]);
    if (articleId) {
        fetchIssuesByArticleId(articleId);
    }

    // New Issue button click event to show the modal
    const newIssueBtn = document.querySelector('.new-issue-btn');
    const newIssueModal = new bootstrap.Modal(document.getElementById('newIssueModal'));

    newIssueBtn.addEventListener('click', () => {
        newIssueModal.show();
    });

    // Form submission for creating a new issue
    const newIssueForm = document.getElementById('newIssueForm');
    newIssueForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const issueTitle = document.getElementById('issueTitle').value;
        const issueDescription = document.getElementById('issueDescription').value;

        try {
            const response = await axiosInstance.post(`/issues/article/${articleId}`, {
                title: issueTitle,
                description: issueDescription
            });

            // Assuming the response contains the updated list of issues
            fetchIssuesByArticleId(articleId);

            // Clear the form
            newIssueForm.reset();

            // Hide the modal
            newIssueModal.hide();

        } catch (error) {
            console.error('Error creating new issue:', error);
            alert('Error creating new issue. Please try again.');
        }
    });
});

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
