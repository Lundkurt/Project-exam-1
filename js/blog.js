const url = "https://lundkurt.one/wp-json/wp/v2/posts";
const urlPage = "https://lundkurt.one/wp-json/wp/v2/posts/?page=2"
const blogPostContainer = document.querySelector(".bloglisting")
const search = document.querySelector("#search");
const viewMore = document.querySelector("#view-more");

async function callApi(url) {
    try {
    const response = await fetch(url);
    const blogs = await response.json();
    console.log(blogs);
    postBlogs(blogs);
    searchBlogs(blogs);
    } catch (error) {
        console.warn(error);
        blogPostContainer.classList.remove("loader");
        blogPostContainer.innerHTML = validateMessage("Could not fetch blog posts at this moment", "error")
        viewMore.style.display = "none";
    }
}
callApi(url);


function searchBlogs(blogs) {
    search.onkeyup = function (event) {
        const searchValue = event.target.value.trim().toLowerCase();



        const filteredBlogs = blogs.filter(function(blog) {
            if(blog.title.rendered.toLowerCase().includes(searchValue)) {
                return true;
            }
        });
        postBlogs(filteredBlogs);
    };
}

function postBlogs(resource) {
    blogPostContainer.classList.remove("loader")

    resource.forEach(function(blog) {
        blogPostContainer.innerHTML += `<div class="blogpost">
        <h2>${blog.title.rendered}</h2>
        <img src="${blog.better_featured_image.source_url}" alt="${blog.title.rendered}" class="blog-preview-img">
        <div class="preview-text">${trimmer(blog.content.rendered, 112)}...</div>
        <a href="details.html?id=${blog.id}" class="blog-cta">Read more</a></div>
     `
    })


}

viewMore.onclick = function(){
    callApi(urlPage);
    viewMore.style.display = "none";
}


