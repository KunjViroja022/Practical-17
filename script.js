document.getElementById('githubForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    fetchProfileData(username);
});

async function fetchProfileData(username) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = ''; // Clear previous profile

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('User not found');

        const data = await response.json();
        displayProfile(data);
    } catch (error) {
        profileDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function displayProfile(data) {
    const profileDiv = document.getElementById('profile');
    const profileHTML = `
        <img src="${data.avatar_url}" alt="${data.login}">
        <h2>${data.name || data.login}</h2>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Repositories:</strong> ${data.public_repos}</p>
        <p><strong>Bio:</strong> ${data.bio || 'No bio available.'}</p>
        <p><a href="${data.html_url}" target="_blank">View Profile on GitHub</a></p>
    `;
    profileDiv.innerHTML = profileHTML;
}