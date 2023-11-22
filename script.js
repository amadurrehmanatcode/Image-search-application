const accesskey = "whP2uu1jPfCTrCeiKh-LKkiuvi63cimTeppxRtgoo1M";

const searchForm = document.getElementById("search-form");
const inputE1 = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
let inputdata = "";
let page = 1;

// Add your Unsplash API access key here
const accessKey = 'whP2uu1jPfCTrCeiKh-LKkiuvi63cimTeppxRtgoo1M';

async function searchimages() {
  inputdata = inputE1.value;

  if (!inputdata) {
    // Handle the case when the input is empty
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchresults.innerHTML = "";
    }

    results.forEach(result => {
      const imagewrapper = document.createElement("div");
      imagewrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imagelink = document.createElement("a");
      imagelink.href = result.links.html;
      imagelink.target = "_blank";
      imagelink.textContent = result.alt_description;

      imagewrapper.appendChild(image);
      imagewrapper.appendChild(imagelink);
      searchresults.appendChild(imagewrapper);
    });

    page++;
    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchimages();
});

showMore.addEventListener("click", () => {
  searchimages();
});



