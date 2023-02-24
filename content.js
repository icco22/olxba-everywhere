var box = document.createElement('div');
box.id = 'my-box';
box.style.position = 'fixed';
box.style.top = '0';
box.style.right = '0';
box.style.width = '300px';
box.style.height = '100%';
box.style.backgroundColor = 'white';
box.style.zIndex = '9999';

var searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.id = 'my-search-bar';
searchBar.placeholder = 'Pretrazi OLX';
searchBar.style.width = '100%';
searchBar.style.padding = '10px';
searchBar.style.boxSizing = 'border-box';
searchBar.style.position = 'relative';
searchBar.style.zIndex = '10000';

box.appendChild(searchBar);

var searchResults = document.createElement('div');
searchResults.id = 'my-search-results';
searchResults.style.padding = '10px';
searchResults.style.overflow = 'auto';
searchResults.style.height = 'calc(100% - 70px)';

box.appendChild(searchResults);

document.body.appendChild(box);

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

function searchOLX(query, appendResults) {
    var xhr = new XMLHttpRequest();
    var url = 'https://olx.ba/api/search?&attr=&q=' + encodeURIComponent(query) + '&per_page=40';
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var items = data.data;
        if (!appendResults) {
          searchResults.innerHTML = '';
        }
        for (var i = 0; i < items.length; i++) {
            // Get results
            const articles = data.data.map((item) => {
                var imageUrl = item.image
                var price = item.display_price
                var date = formatDate(item.date)

                // This will group every result
                return `
                  <div class="article">
                    <a class="article-link" href="https://olx.ba/artikal/${item.id}" target="_blank">
                      <div class="article-image-container">
                        <img class="article-image" src="${imageUrl}" />
                      </div>
                      <div class="article-details">
                        <h2 class="article-title">${item.title}</h2>
                        <div class="article-price">${price}</div>
                        <div class="article-date">${date}</div>
                      </div>
                    </a>
                  </div>
                `;
              });
        
              searchResults.innerHTML = articles.join("");
        
              //Border line
              const articleElements = document.getElementsByClassName("article");
              for (let i = 0; i < articleElements.length; i++) {
                articleElements[i].style.border = "1px solid black";
              }
        }
      } else {
        console.log('Error: ' + xhr.status);
      }
    };
    xhr.send();
  }
  

  searchBar.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      var query = searchBar.value;
      searchOLX(query, true);
    }
  });
  