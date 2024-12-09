function show_allArticles(articles, htmlList) {
    let i = 0;
    do {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<div class="allDataItem"><b>Artikel ${articles[i].artnr}</b><br>
            ${articles[i].bezeichnung}<br>
            ${articles[i].preis} €</div>`;
        htmlList.appendChild(listItem);
        i++;
    } while (articles.length > i);
}

export default show_allArticles;