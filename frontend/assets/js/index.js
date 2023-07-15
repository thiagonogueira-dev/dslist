fetch('http://localhost:8080/lists')
    .then(r => r.json())
    .then(r => {
        const gameLists = Array.from(r).map(e => `<li><a href="./pages/games-by-category.html?name=${e.name.replace(/ /g, '-')}">${e.name} </a></li>`);
        const categories = document.getElementById('categories');
        categories.innerHTML = gameLists.join('\n');
    });

document.getElementById('submit').addEventListener('click', e => {
    e.preventDefault();
    const category = document.getElementById('category').value;
    fetch('http://localhost:8080/lists', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: category
        })
        })
        .then(r => {
            if(r.ok)
                document.getElementById('categories').innerHTML += `<li><a href="./pages/games-by-category.html?name=${category.replace(/ /g, '-')}">${category}</a></li>`;
                document.getElementById('category').value = '';
                document.querySelector('.add-form').classList.add('disp-none');
    });
});

document.getElementById('add').addEventListener('click', () => {
    document.querySelector('.add-form').classList.remove('disp-none');
});