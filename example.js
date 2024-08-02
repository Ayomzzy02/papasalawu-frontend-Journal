document.addEventListener('DOMContentLoaded', async () => {
    const issuesTableBody = document.getElementById('issuesTableBody');
    const openIssuesCount = document.querySelector('.open-issues');
    const closedIssuesCount = document.querySelector('.closed-issues');
    const newIssueForm = document.getElementById('newIssueForm');
    const axiosInstance = createAxiosInstance();

    // Function to fetch issues by article ID
    async function fetchIssuesByArticleId(articleId) {
        try {
            const response = await axiosInstance.get(`issue/getAllIssues/${articleId}`);
            const data = response.data.data;

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

    // Function to create a new issue
    newIssueForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        console.log('Hello World')

        const issueTitle = document.getElementById('issueTitle').value;
        const issueDescription = document.getElementById('issueDescription').value;

        const newIssue = {
            title: issueTitle,
            description: issueDescription,
            status: 'Opened',
            openedBy: 'Reviewer', // Adjust this according to your implementation
            timeSinceOpened: 'Just now',
            conversationCount: 0,
        };

        try {
            const articleId = getArticleIdFromPath();
            await axiosInstance.post(`issue/createIssue/${articleId}`, newIssue);
            $('#newIssueModal').modal('hide');
            fetchIssuesByArticleId(articleId);
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    });

    function getArticleIdFromPath() {
        const pathArray = window.location.pathname.split('/');
        return decodeURIComponent(pathArray[pathArray.length - 1]);
    }

    const articleId = getArticleIdFromPath();
    if (articleId) {
        fetchIssuesByArticleId(articleId);
    }
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
