document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.article-nav-item');
    const sections = document.querySelectorAll('section');
    
    // Function to disable nav items based on status
    function disableNavItems(status) {
        navItems.forEach(item => {
            const itemStatus = item.getAttribute('data-status');
            if ((status === 'Submitted' && itemStatus !== 'In-Review') ||
                (status === 'In-Review' && itemStatus !== 'In-Review') ||
                (status === 'Accepted' && itemStatus === 'Published') ||
                (status === 'Rejected' && itemStatus === 'Published')) {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
        });
    }

    

    // Extract articleId from URL path
    function getArticleIdFromPath() {
        const pathParts = window.location.pathname.split('/');
        return pathParts[pathParts.length - 1];  // Assuming articleId is the last part of the path
    }

    // Function to fetch and display issues
function fetchAndDisplayIssues(articleId) {
    const axiosInstance = createAxiosInstance();  // Ensure axiosInstance is created here
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

                    issueItem.addEventListener('click', function() {
                        window.location.href = `/journalapp/issues/${issue.issueId}`;
                    });

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

    // Fetch user articles from the backend
    function fetchUserArticle() {
        const articleId = getArticleIdFromPath();
        console.log('articleId:', articleId);  // Log to check if articleId is being retrieved
        const axiosInstance = createAxiosInstance();
        axiosInstance.get(`/journal/getUserArticle?articleId=${articleId}`)
            .then(response => {
                const article = response.data.data;
                const articleStatus = article.status;
                
                // Populate article data
                populateArticleData(article);
                
                // Update the content based on the journal status
                disableNavItems(articleStatus);
                displayContent(articleStatus);
            })
            .catch(error => {
                console.error('Error fetching article:', error);
            });
    }

    function fetchArticleHistory() {
        const articleId = getArticleIdFromPath();
        const axiosInstance = createAxiosInstance();
        axiosInstance.get(`/journal/history/${articleId}`)
            .then(response => {
                const history = response.data.data;
                populateHistoryTable(history);
            })
            .catch(error => {
                console.error('Error fetching article history:', error);
            });
    }

    function populateHistoryTable(history) {
        const tbody = document.querySelector('.history-table tbody');
        tbody.innerHTML = '';  // Clear the table body first

        history.forEach(entry => {
            const row = document.createElement('tr');
            const issueCell = document.createElement('td');
            const reviewersCell = document.createElement('td');
            const dateCell = document.createElement('td');

            issueCell.innerHTML = `<i class="fas fa-file-pdf"></i> ${entry.versionName}`;
            reviewersCell.textContent = entry.reviewers.join(', ');
            dateCell.textContent = new Date(entry.dateAdded).toLocaleDateString();

            row.appendChild(issueCell);
            row.appendChild(reviewersCell);
            row.appendChild(dateCell);
            tbody.appendChild(row);
        });
    }



    // Populate article data
    function populateArticleData(article) {
        const acceptedRejectedSection = document.querySelector('#accepted-rejected');
        if (article.status === 'Accepted') {
            acceptedRejectedSection.innerHTML = `
                <div class="status-container accepted">
                    <i class="fas fa-check-circle status-icon"></i>
                    <p class="status-message">Your journal has been approved.</p>
                    <p class="payment-details">Please send the payment to the following account details for online publishing:</p>
                    <p class="account-details">Account Name: XYZ Publishing<br>Account Number: 1234567890<br>Bank: ABC Bank</p>
                    <form class="payment-form">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="receipt">Receipt of Transaction</label>
                            <input type="file" id="receipt" class="form-control-file" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Verify Payment</button>
                    </form>
                </div>
            `;

            // Handle form submission for payment verification
            const paymentForm = document.querySelector('.payment-form');
            paymentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData();
                formData.append('name', document.getElementById('name').value);
                formData.append('receipt', document.getElementById('receipt').files[0]);
                submitPaymentDetails(formData);
            });
        } else if (article.status === 'Rejected') {
            acceptedRejectedSection.innerHTML = `
                <div class="status-container rejected">
                    <i class="fas fa-times-circle status-icon"></i>
                    <p class="status-message">Your journal has been rejected by the Chief-Editor.</p>
                </div>
            `;
        } else if (article.status === 'Published') {
            const publishedSection = document.querySelector('#published');
            publishedSection.innerHTML = `
                <div class="status-container published">
                    <i class="fas fa-book status-icon"></i>
                    <p class="status-message">Your journal has been published.</p>
                    <p class="journal-details">Title: ${article.title}</p>
                    <p class="journal-details">Abstract: ${article.abstract}</p>
                    <p class="journal-details">Keywords: ${article.keywords.join(', ')}</p>
                    <p class="journal-details">Published Date: ${new Date(article.publishedDate).toLocaleDateString()}</p>
                </div>
            `;
        }

        fetchArticleHistory();
    }

 
// In-Review Navigation
const inReviewNavItems = document.querySelectorAll('.in-review-nav-item');
const historyContent = document.getElementById('history');
const issueContent = document.getElementById('issue');

inReviewNavItems.forEach(item => {
    item.addEventListener('click', function() {
        inReviewNavItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        const target = item.getAttribute('data-target');
        if (target === 'history') {
            historyContent.style.display = 'block';
            issueContent.style.display = 'none';
        } else if (target === 'issue') {
            historyContent.style.display = 'none';
            issueContent.style.display = 'block';
            
            // Fetch and display issues when the Issue tab is clicked
            const articleId = getArticleIdFromPath();
            fetchAndDisplayIssues(articleId);
        }
    });
});

    // Switch content based on article status
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = item.getAttribute('href').substring(1);
            if (!item.classList.contains('disabled')) {
                sections.forEach(section => {
                    if (section.id === targetSection) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    });

    // Initial setup
    fetchUserArticle();

    // Function to submit payment details
    function submitPaymentDetails(formData) {
        const articleId = getArticleIdFromPath();
        const axiosInstance = createAxiosInstance();
        axiosInstance.post(`/journal/payment/${articleId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            if (response.status === 201) {
                // Reload and update the page UI
                const acceptedRejectedSection = document.querySelector('#accepted-rejected');
                acceptedRejectedSection.innerHTML = `
                    <div class="status-container accepted">
                        <i class="fas fa-spinner fa-spin status-icon"></i>
                        <p class="status-message">Your payment is being verified.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Payment verification failed:', error);
            showPaymentErrorModal();
        });
    }

    // Function to show payment error modal
    function showPaymentErrorModal() {
        const modalHtml = `
            <div class="modal fade" id="paymentErrorModal" tabindex="-1" role="dialog" aria-labelledby="paymentErrorModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paymentErrorModalLabel">Payment Verification Failed</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Payment verification failed. Please try again.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        $('#paymentErrorModal').modal('show');
    }
});

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
