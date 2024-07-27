document.addEventListener('DOMContentLoaded', function() {
    // Simulated journal status for demonstration purposes
    const journalStatus = 'Rejected'; // Change to 'Accepted' or 'Rejected' to test different statuses

    const navItems = document.querySelectorAll('.article-nav-item');
    const sections = document.querySelectorAll('section');

    // Function to disable nav items based on status
    function disableNavItems(status) {
        navItems.forEach(item => {
            const itemStatus = item.getAttribute('data-status');
            if ((status === 'In-Review' && itemStatus !== 'In-Review') || 
                (status === 'Accepted' && itemStatus === 'Published') || 
                (status === 'Rejected' && itemStatus === 'Published')) {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
        });
    }

    // Function to display content based on status
    function displayContent(status) {
        sections.forEach(section => section.style.display = 'none');
        if (status === 'In-Review') {
            document.getElementById('in-review').style.display = 'block';
        } else if (status === 'Accepted' || status === 'Rejected') {
            document.getElementById('accepted-rejected').style.display = 'block';
        } else if (status === 'Published') {
            document.getElementById('published').style.display = 'block';
        }
    }

    // Update the content based on the journal status
    const acceptedRejectedSection = document.querySelector('#accepted-rejected');
    if (journalStatus === 'Accepted') {
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
    } else if (journalStatus === 'Rejected') {
        acceptedRejectedSection.innerHTML = `
            <div class="status-container rejected">
                <i class="fas fa-times-circle status-icon"></i>
                <p class="status-message">Your journal has been rejected by the Chief-Editor.</p>
            </div>
        `;
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

    // Initial setup based on journal status
    disableNavItems(journalStatus);
    displayContent(journalStatus);

});