const url = "https://lundkurt.one/wp-json/wp/v2/posts";
const carouselContainer = document.querySelector(".carousel")
const prev = document.getElementById("prev");
const next = document.getElementById("next");


async function callApi(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return data;
}

function firstCarouselCard(resource) {
    const card = document.createElement("div")
    card.classList.add("carousel-card");
    card.classList.add("view");
    card.innerHTML =  `<a href="details.html?id=${resource.id}"><img src="${resource.better_featured_image.source_url}" alt="${resource.title.rendered}"><h3>${resource.title.rendered}</h3></a>`

    return card;

}

function carouselCards(resource) {
    const card = document.createElement("div")
    card.classList.add("carousel-card");
    card.innerHTML =  `<a href="details.html?id=${resource.id}"><img src="${resource.better_featured_image.source_url}" alt="${resource.title.rendered}"><h3>${resource.title.rendered}</h3></a>`

    return card;

}

async function addCarouselCard() {
    try {
        const results = await callApi(url)
        const firstPost = results.slice(0, 1);
        const restPost = results.slice(1, 6);
        const postFirst = firstPost.map(firstCarouselCard);
        const postRest = restPost.map(carouselCards);
        carouselContainer.append(...postFirst);
        carouselContainer.append(...postRest);
        //i'm sure theres a better way than making 2 appends to add view class to only the first one, but atleast ive made it work. Id love some feedback on how to do this better. 
        carouselContainer.classList.remove("loader")
    } catch (error) {
        console.warn(error);
        carouselContainer.classList.remove("loader");
        carouselContainer.innerHTML = validateMessage("Failed to collect content!", "error")
    }
}

addCarouselCard()


function nextCard() {
    const currentCard = document.querySelector(".carousel-card.view");
    const nextCard = currentCard.nextElementSibling
    ? currentCard.nextElementSibling
    : document.querySelector(".carousel").firstElementChild;
    currentCard.classList.remove("view");
    nextCard.classList.add("view");

}

next.addEventListener("click", nextCard);


function prevCard() {
    const currentCard = document.querySelector(".carousel-card.view");
    const previousCard = currentCard.previousElementSibling
    ? currentCard.previousElementSibling
    : document.querySelector(".carousel").lastElementChild;
    currentCard.classList.remove("view");
    previousCard.classList.add("view");

}

prev.addEventListener("click", prevCard);