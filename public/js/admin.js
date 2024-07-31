document.addEventListener('DOMContentLoaded', function() {
    const addChiefEditorForm = document.getElementById('addChiefEditorForm');
    const messageContainer = document.createElement('div');
    messageContainer.id = 'messageContainer';
    addChiefEditorForm.prepend(messageContainer);

    addChiefEditorForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(addChiefEditorForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            department: formData.get('department')
        };

        const axiosInstance = createAxiosInstance();
        axiosInstance.post('/admin/addChiefEditor', data)
            .then(response => {
                if (response.data.status === 'success') {
                    displayMessage('Chief-Editor added successfully!', 'success');
                    addChiefEditorForm.reset();
                } else {
                    displayMessage('Failed to add Chief-Editor. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('There was an error adding the Chief-Editor:', error);
                displayMessage('An error occurred. Please try again.', 'error');
            });
    });

    const addReviewerForm = document.getElementById('addReviewerForm');
    const reviewerMessageContainer = document.getElementById('reviewerMessageContainer');

    addReviewerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(addReviewerForm);
        const data = {
            email: formData.get('email'),
            name: formData.get('name'),
            department: formData.get('department'),
            anonymousName: formData.get('anonymousName')
        };

        const axiosInstance = createAxiosInstance();
        axiosInstance.post('/admin/addReviewer', data)
            .then(response => {
                if (response.data.status === 'success') {
                    displayMessage('Reviewer added successfully!', 'success', reviewerMessageContainer);
                    addReviewerForm.reset();
                } else {
                    displayMessage('Failed to add Reviewer. Please try again.', 'error', reviewerMessageContainer);
                }
            })
            .catch(error => {
                console.error('There was an error adding the Reviewer:', error);
                displayMessage('An error occurred. Please try again.', 'error', reviewerMessageContainer);
            });
    });

    function displayMessage(message, type) {
        messageContainer.textContent = message;
        messageContainer.className = `message ${type}`;
        messageContainer.style.display = 'block';

        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 30000); // Hide after 30 seconds
    }

    // Payment view feature
    const pendingPaymentsBtn = document.getElementById('pendingPayments');
    const paidPaymentsBtn = document.getElementById('paidPayments');
    const paymentTableContainer = document.getElementById('paymentTableContainer');
    const modalMessage = document.getElementById('modalMessage');
    const confirmVerifyBtn = document.getElementById('confirmVerifyBtn');

    let selectedTransactionId = '';

    pendingPaymentsBtn.addEventListener('click', function() {
        fetchPayments('Pending');
    });

    paidPaymentsBtn.addEventListener('click', function() {
        fetchPayments('Paid');
    });

    confirmVerifyBtn.addEventListener('click', function() {
        verifyPayment(selectedTransactionId);
        $('#confirmationModal').modal('hide');
    });

    function fetchPayments(status) {
        const axiosInstance = createAxiosInstance();
        axiosInstance.get(`/admin/getPayments?status=${status}`)
            .then(response => {
                const payments = response.data.data.payments;
                renderPaymentTable(payments, status);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
                displayMessage('Error fetching payments. Please try again.', 'error');
            });
    }

    function renderPaymentTable(payments, status) {
        let tableHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Name</th>
                        <th>Receipt</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        payments.forEach(payment => {
            tableHTML += `
                <tr>
                    <td>${payment.transactionId}</td>
                    <td>${payment.receiptName}</td>
                    <td><a href="${payment.receiptUrl}" target="_blank">View Receipt</a></td>
                    <td>${status === 'Pending' ? '<button class="btn btn-warning verify-btn">Verify</button>' : ''}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        paymentTableContainer.innerHTML = tableHTML;

        if (status === 'Pending') {
            const verifyButtons = document.querySelectorAll('.verify-btn');
            verifyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const transactionId = this.closest('tr').querySelector('td:first-child').textContent;
                    showConfirmationModal(transactionId);
                });
            });
        }
    }

    function showConfirmationModal(transactionId) {
        selectedTransactionId = transactionId;
        modalMessage.textContent = `Are you sure you want to verify the payment with Transaction ID: ${transactionId}?`;
        $('#confirmationModal').modal('show');
    }

    function verifyPayment(transactionId) {
        const axiosInstance = createAxiosInstance();
        axiosInstance.post(`/admin/verifyPayment/${transactionId}`)
            .then(response => {
                if (response.status === 200) {
                    fetchPayments('Paid');
                } else {
                    showModal('Payment verification failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error verifying payment:', error);
                showModal('Payment verification failed. Please try again.');
            });
    }

    function showModal(message) {
        const modalHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <p>${message}</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.querySelector('.modal');
        const closeButton = modal.querySelector('.close-btn');

        closeButton.addEventListener('click', function() {
            modal.remove();
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.remove();
            }
        });
    }
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
            console.log(token);

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
