/* -----------------------
    Load news Caregory
------------------------- */
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}
/* ----------------------------
    Display News Caregory
--------------------------- */
const displayCategory = categories => {
    const categorySection = document.getElementById('category-section');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category-item', 'w-full', 'lg:w-auto')
        categoryDiv.innerHTML = `
            <a onclick="loadCategoryNews('${category.category_id}')" class="text-base font-bold text-gray-500 hover:text-blue-600 focus:text-blue-600 active:text-blue-600 hover:bg-blue-300 active:bg-blue-300 focus:bg-blue-300 hover:px-2 focus:px-2 active:px-2 hover:py-1 focus:py-1 active:py-1 hover:rounded focus:rounded active:rounded" href="#">${category.category_name}</a>
        `;
        categorySection.appendChild(categoryDiv);
    });
}
/*--------------------------------
    Load News following categroy
 --------------------------------*/
const loadCategoryNews = async categoryId => {
    //start loader
    spinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsInfo(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
/* ------------------------------------
    Display News infomations
 ------------------------------------*/
const displayNewsInfo = allNewsInfo => {
    const newsCounter = document.getElementById('counter');
    if (allNewsInfo.length !== 0) {
        newsCounter.innerText = allNewsInfo.length;
    }
    else {
        newsCounter.innerText = 'NO';
    }

    /* Sorting and Reverse the array */
    allNewsInfo.sort((a, b) => a.total_view - b.total_view);
    allNewsInfo.reverse();

    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = ``;
    allNewsInfo.forEach(allInfo => {
        const newsCardsDiv = document.createElement('div');
        newsCardsDiv.classList.add('news-card')
        newsCardsDiv.innerHTML = `
            <div onclick="loadModal('${allInfo._id}')" class="card-item md:flex flex-col lg:flex-row gap-5 shadow-lg p-2 rounded-lg border">
                <div class="lg:w-3/12">
                    <img class="h-full" src='${allInfo.image_url}'>
                </div>
                <div class="lg:w-3/4">
                    <h3 class="text-xl font-semibold mb-2">${allInfo.title}</h3>
                    <p class="mb-3">${allInfo.details.slice(0, 300)}...</p>
                    
                    <div class="grid grid-cols-2 justify-items-center mb-2 md:mb-0 md:flex justify-between">
                        <div class="flex gap-3">
                            <img class="rounded-full h-12" src="${allInfo.author.img}">
                            <div>
                                <h5 class="text-sm md:text-lg font-semibold">${allInfo.author.name ? allInfo.author.name : "Not Available."}</h5>
                                <p class="font-thin md:font-medium text-slate-500">${allInfo.author.published_date ? allInfo.author.published_date.slice(0, 10) : 'not available.'}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-eye"></i>
                            <h5>${allInfo.total_view ? allInfo.total_view : "Not available."}</h5>
                        </div>
                        <div class="flex items-center gap-1">
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="flex items-center mr-5">
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        newsCardContainer.appendChild(newsCardsDiv);
    });
    // stop spinner
    spinner(false);
}