const API_KEY = "6d4a308b284d47789e5da13cfcd21f2d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-sources');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} • ${date}`;

    
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById('search-button');
    const searchText = document.getElementById('search-text');  

    if (searchButton && searchText) {
        searchButton.addEventListener("click", () => {
            const query = searchText.value.trim();  
            if (!query) return;  

            fetchNews(query);
            curSelectedNav?.classList.remove("active");
            curSelectedNav = null;
        });
    } else {
        console.error("Search button or search text input not found");
    }
});
