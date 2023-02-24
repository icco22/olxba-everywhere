const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const searchResults = document.querySelector('.search-results');

searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value;
  const url = `https://api.olx.ba/v3.0/search/?q=${searchQuery}&offset=0&limit=40`;
  searchResults.innerHTML = 'Loading...';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      searchResults.innerHTML = '';
      data.ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.innerHTML = `
          <div class="item">
            <div class="item-image">
              <img src="${ad.image_urls.thumb}" alt="${ad.title}">
            </div>
            <div class="item-info">
              <h3 class="item-title">${ad.title}</h3>
              <p class="item-location">${ad.city_name}</p>
              <p class="item-price">${ad.price.amount} ${ad.price.currency}</p>
              <p class="item-description">${ad.description}</p>
            </div>
          </div>
        `;
        searchResults.appendChild(adElement);
      });
    })
    .catch(error => {
      searchResults.innerHTML = 'An error occurred while searching. Please try again later.';
      console.error(error);
    });
});
