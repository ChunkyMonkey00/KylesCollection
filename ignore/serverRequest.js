// JavaScript: Sending a POST request to the Flask server
async function fetchGameUrl(page = 1, tags = [], gameIndex = null) {
  const apiUrl = 'http://localhost:5000/get-game-url'; // Replace with the actual server URL if hosted remotely

  // Prepare the payload
  const payload = {
    page: page,
    tags: tags,
  };

  // Add gameIndex to the payload only if it's valid
  if (gameIndex !== null) {
    payload.game_index = gameIndex;
  }

  try {
    // Send the POST request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Log or process the returned data
    console.log('Iframe Source:', data.iframe_src || data.error);
    return data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching game URL:', error);
    return { error: error.message };
  }
}

// Example usage:
fetchGameUrl(1, [], 1).then((result) => {
  if (result.iframe_src) {
    console.log('Iframe Source:', result.iframe_src);
  } else {
    console.error('Error:', result.error);
  }
});
