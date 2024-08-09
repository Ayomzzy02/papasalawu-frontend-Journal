document.addEventListener("DOMContentLoaded", async () => {
    const signupForm = document.getElementById("signupForm");
    const messageDiv = document.getElementById("message");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        messageDiv.innerHTML = ""; // Clear previous messages

        const name = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        try {
            const response = await axios.post("https://api.zyplexmedia.com/v1/auth/signup", { name, email, password });

            if (response.status === 201) {
                messageDiv.innerHTML = `<p class="success-message">${response.data.message}</p>`;
            }
        } catch (error) {
            if (error.response) {
                messageDiv.innerHTML = `<p class="error-message">${error.response.data.message}</p>`;
            } else {
                messageDiv.innerHTML = `<p class="error-message">An error occurred. Please try again.</p>`;
            }
        }
    });
});


document.getElementById("loginForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("https://api.zyplexmedia.com/v1/auth/signin", { email, password });

        if (response.status === 200) {
            // Save user object in local storage
            const user = response.data.data.user;
            const userRole = user.role
            const token = response.data.token;

            console.log(token);
            console.log(userRole);

            const sessionResponse1 = await axios.post("/journalapp/setSession.php", { token });
            const sessionResponse2 = await axios.post("/journalapp/setSession2.php", { userRole });
            
            if (sessionResponse1.data.status && sessionResponse2.data.status === 'success') {
                if(userRole === "Chief-Editor") {
                    document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60};`;
                    // Display success message and redirect to Chief-Editor dashboard
                    document.getElementById("message").innerHTML = `<div class="alert alert-success">Login successful!</div>`;
                    window.location.href = "/journalapp/dashboard/chief-Editor";
                } else if(userRole === "Author") {
                    document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60};`;
                    // Display success message and redirect to dashboard
                    document.getElementById("message").innerHTML = `<div class="alert alert-success">Login successful!</div>`;
                    window.location.href = "/journalapp/dashboard";
                } else if(userRole === "Admin") {
                    document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60};`;
                    // Display success message and redirect to dashboard
                    document.getElementById("message").innerHTML = `<div class="alert alert-success">Login successful!</div>`;
                    window.location.href = "/journalapp/dashboard/admin";
                } else if(userRole === "Reviewer") {
                    document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60};`;
                    // Display success message and redirect to dashboard
                    document.getElementById("message").innerHTML = `<div class="alert alert-success">Login successful!</div>`;
                    window.location.href = "/journalapp/dashboard/reviewer";
                }
             
                
                
            } else {
                console.error('Failed to set session:', sessionResponse.data.message);
            }
        }
    } catch (error) {
        if (error.response) {
            document.getElementById("message").innerHTML = `<div class="alert alert-danger">${error.response.data.message}</div>`;
        } else {
            document.getElementById("message").innerHTML = `<div class="alert alert-danger">An error occurred. Please try again.</div>`;
        }
    }
});