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

    function displayMessage(message, type) {
        messageContainer.textContent = message;
        messageContainer.className = `message ${type}`;
        messageContainer.style.display = 'block';

        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 30000); // Hide after 30 seconds
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
