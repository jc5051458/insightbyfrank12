

      // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const description = urlParams.get('desc');

    // Set content
    document.getElementById('card-title').textContent = title;
    document.getElementById('card-description').textContent = description;

