document.addEventListener("DOMContentLoaded", async function () {
    const dashboardContainer = document.getElementById("dashboard-container");
    if (!dashboardContainer) {
        // Not the dashboard page, do nothing
        return;
    }

    try {
        function createAxiosInstance() {
            // Create an Axios instance
            const axiosInstance = axios.create({
                baseURL: 'http://journalapp.zyplexmedia.com:8001/v1', // Set the base URL for your backend API
            });
        
            // Add a request interceptor to include the token in the Authorization header
            axiosInstance.interceptors.request.use(
                function (config) {
                    // Get the token from the cookies
                    const token = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('token='))
                        ?.split('=')[1];
                    console.log(token)
        
                    // If the token exists, include it in the Authorization header
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
        
                    return config;
                },
                function (error) {
                    // Handle request error
                    return Promise.reject(error);
                }
            );
        
            return axiosInstance;
        }
        
        // Usage
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/journal/getUserArticles");

        const articlesTable = document.getElementById("articlesTableBody");
        const noArticlesMessage = document.getElementById("noArticlesMessage");
        const articlesTableContainer = document.getElementById("articlesTable");

        if (response.status === 200) {
            const articles = response.data.articles;

            if (articles.length > 0) {
                // Hide the no articles message
                noArticlesMessage.style.display = "none";
                articlesTableContainer.style.display = "block";

                // Populate the table with articles
                articles.forEach((article, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${article.title}</td>
                        <td>${article.submissionDate}</td>
                        <td>${article.acceptedDate}</td>
                        <td><span class="badge badge-${getStatusBadge(article.status)}">${article.status}</span></td>
                        <td><a href="/journalapp/article/${article._id}" class="btn btn-info btn-sm">View</a></td>
                    `;
                    articlesTable.appendChild(row);
                });
            } else {
                // Hide the articles table
                articlesTableContainer.style.display = "none";
                // Show the no articles message
                noArticlesMessage.style.display = "block";
            }
            // Check if the error response is a 401 Unauthorized
        }
    } catch (error) {
        if(error.response && error.response.status === 401) {
            // Delete the authToken cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";

            // Redirect to the logout PHP script
            window.location.href = "/journalapp/logout.php";
        }
        console.error("Error fetching articles:", error);
        alert("An error occurred while fetching your articles. Please try again later.");
    }

    // Modal handling
    const submitArticleButton = document.getElementById("submitArticleButton");
    const submitArticleModal = new bootstrap.Modal(document.getElementById("submitArticleModal"));

    submitArticleButton.addEventListener("click", function () {
        submitArticleModal.show();
    });

    // Handle form submission
    const submitArticleForm = document.getElementById("submitArticleForm");
    submitArticleForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = new FormData(submitArticleForm);

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        

        try {
            const axiosInstance = createAxiosInstance();
            const response = await axiosInstance.post("/journal/createArticle", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 201) {
                location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Delete the authToken cookie
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";

                // Redirect to the logout PHP script
                window.location.href = "/journalapp/logout.php";
            }
            console.error("Error submitting article:", error);
            alert("An error occurred while submitting your article. Please try again later.");
        }
        // Close the modal
        submitArticleModal.hide();
    });
});

function getStatusBadge(status) {
    switch (status) {
        case "Published":
            return "success";
        case "Under Review":
            return "warning";
        case "Rejected":
            return "danger";
        case "Submitted":
            return "info";
        default:
            return "secondary";
    }
}