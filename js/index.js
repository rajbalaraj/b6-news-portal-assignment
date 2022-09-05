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