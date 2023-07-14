fetch('http://localhost:8080/lists')
    .then(r => r.json())
    .then(r => {
        console.log(r);
        const gameLists = Array.from(r).map(e => `<li><a href="./pages/games-by-category.html?id=${e.id}">${e.name} </a></li>`);
        const categories = document.getElementById('categories');
        categories.innerHTML = gameLists.join('\n');
    })