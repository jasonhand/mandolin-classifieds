let currentIndex = 0;
let data = [];

function displayImage(index) {
    if (data.length > 0) {
        const imageElement = document.getElementById('imageDisplay');
        const priceTag = document.getElementById('priceTag');
        const detailsText = document.getElementById('detailsText');
        imageElement.src = data[index].ImageSrc;
        priceTag.innerHTML = `Price: ${data[index].Price1 || 'N/A'}`;

        // Handle Details Text
        detailsText.textContent = data[index].Details;

        // Optionally, truncate the details text to a certain length before adding '...' and the read more link
        // This is a simplistic approach; consider a more sophisticated method for handling overflow text.
    }
}


function displayImage(index) {
    if (data.length > 0) {
        const imageElement = document.getElementById('imageDisplay');
        const priceTag = document.getElementById('priceTag');
        const detailsText = document.getElementById('detailsText');
        const readMoreLink = document.getElementById('readMore');

        // Set the image source
        imageElement.src = data[index].ImageSrc;

        // Update the price tag
        priceTag.innerHTML = `${data[index].Price1 || 'N/A'}`;

        // Update the details text
        detailsText.textContent = data[index].Details;

        // Update the "Read More" link with the dynamic ad_number
        if (data[index].Ad_Number) {
            readMoreLink.href = `https://mandolincafe.com/ads/${data[index].Ad_Number}`;
            readMoreLink.style.display = 'block'; // Ensure the link is visible if Ad_Number exists
        } else {
            readMoreLink.style.display = 'none'; // Hide the link if there's no Ad_Number
        }
    }
}

function navigate(direction) {
    currentIndex = (currentIndex + direction + data.length) % data.length;
    displayImage(currentIndex);
}

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % data.length;
    displayImage(currentIndex);
});
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    displayImage(currentIndex);
});

function fetchData() {
    return fetch('output/mandolin_classifieds.json') // Make sure the path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}


// Fetch data and display a random image on load
window.onload = () => {
    fetchData().then(jsonData => {
        data = jsonData; // Assuming 'data' is declared at a higher scope
        currentIndex = Math.floor(Math.random() * data.length);
        displayImage(currentIndex);
    }).catch(error => {
        console.error('Error loading the image data:', error);
    });
};
