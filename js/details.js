const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `https://lundkurt.one/wp-json/wp/v2/posts/${id}`;

const blogDetailsContainer = document.querySelector(".detailsContainer")

async function fetchBlogDetails() {
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results);
        setTitle(results);
        createPost(results);

    } catch (error) {
        console.warn(error);
        blogDetailsContainer.classList.remove("loader");
        blogDetailsContainer.innerHTML = validateMessage("Could not fetch details at this moment", "error")
    }
}

fetchBlogDetails()

function setTitle(resource) {
    document.title = `GG | ${resource.title.rendered}`
}

function createPost(resource) {
    blogDetailsContainer.classList.remove("loader")
    blogDetailsContainer.innerHTML = `
    <h1>${resource.title.rendered}</h1>
   <div class="blog-wrapper">
       <img src="${resource.better_featured_image.source_url}" alt="${resource.title.rendered}" class="details-image" onclick="openModal()">
       <div class="details-stamp"><img src="images/timestamp.png" alt="clock" class="timestamp">  ${trimmer(resource.date, 10)} | Author: Kurt Lund </div>
       <h2>${resource.title.rendered}</h2>
       <p class="details-p">${resource.content.rendered}</p>
   </div>`
}
