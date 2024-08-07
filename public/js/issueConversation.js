document.addEventListener('DOMContentLoaded', async () => {
    const issueTitleElement = document.getElementById('issueTitle');
    const issueMetaElement = document.getElementById('issueMeta');
    const conversationsContainer = document.getElementById('conversationsContainer');
    const addCommentBtn = document.getElementById('addCommentBtn');
    const commentEditor = document.getElementById('commentEditor');
    const fileUpload = document.getElementById('fileUpload');
    const axiosInstance = createAxiosInstance();

    // Function to fetch issue conversations by issue ID
    async function fetchIssueConversations(issueId) {
        try {
            const response = await axiosInstance.get(`issue/getConversations/${issueId}`);
            const data = response.data.data;

            // Populate the title and meta information
            issueTitleElement.textContent = data.title;
            issueMetaElement.textContent = `${data.openedBy} opened this issue ${data.timeSinceOpened}`;

            // Clear the container before adding new conversations
            conversationsContainer.innerHTML = '';

            // Add the description as the first conversation
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'conversation';

            descriptionElement.innerHTML = `
                <div class="conversation-meta">
                    <span class="anonymous-name">${data.openedBy}</span> created this issue ${data.timeSinceOpened}
                </div>
                <div class="conversation-content">
                    ${data.description}
                </div>
                <hr class="conversation-divider" />
            `;

            conversationsContainer.appendChild(descriptionElement);

            // Populate the container with the fetched conversations
            data.conversations.forEach(conversation => {
                const conversationElement = document.createElement('div');
                conversationElement.className = 'conversation';

                conversationElement.innerHTML = `
                    <div class="conversation-meta">
                        <span class="anonymous-name">${conversation.anonymousName}</span> commented ${conversation.timeSince}
                    </div>
                    <div class="conversation-content">
                        ${conversation.content}
                    </div>
                    <hr class="conversation-divider" />
                `;

                if (conversation.fileUrl) {
                    const fileLink = document.createElement('a');
                    fileLink.href = conversation.fileUrl;
                    fileLink.textContent = 'Download Attached File';
                    fileLink.className = 'file-download-link';
                    conversationElement.appendChild(fileLink);
                }

                conversationsContainer.appendChild(conversationElement);
            });

        } catch (error) {
            console.error('Error fetching conversations:', error);
            conversationsContainer.innerHTML = '<p>Error fetching conversations. Please try again later.</p>';
        }
    }

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

    // Function to handle adding a new comment
    async function addComment(issueId, content, file) {
        try {
            const formData = new FormData();
            
            formData.append('content', content);
            if (file) {
                formData.append('file', file);
            }
            await axiosInstance.post(`issue/addComment/${issueId}`, {content: content});
            fetchIssueConversations(issueId);

        } catch (error) {
            console.log(issueId, comment)
            console.error('Error adding comment:', error);
        }
    }

    // Event listener for the Add Comment button
    addCommentBtn.addEventListener('click', () => {
        const content = commentEditor.value;
        const file = fileUpload.files[0];
        const issueId = window.location.pathname.split('/').pop();

        if (content) {
            addComment(issueId, content, file);
            commentEditor.value = ''; // Clear the comment editor
            fileUpload.value = ''; // Clear the file input
        }
    });

    // Fetch conversations on page load
    const issueId = window.location.pathname.split('/').pop();
    fetchIssueConversations(issueId);
});
