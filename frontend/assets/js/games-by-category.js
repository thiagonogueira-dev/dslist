let gamePosOriginal;

const getGames = () => {
    return Array.from(document.querySelectorAll('.title'));
}

const changePosition = (target) => {
    const gamesPosModified = getGames();
    const sourceIndex = gamePosOriginal.findIndex(g => g.innerHTML === target);
    const destinationIndex = gamesPosModified.findIndex(g => g.innerHTML === target);
    const listId = JSON.parse(window.sessionStorage.getItem('listId'));
    fetch(`http://localhost:8080/lists/${listId}/replacement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "sourceIndex": parseInt(sourceIndex),
            "destinationIndex": parseInt(destinationIndex)
        })
    });
    gamePosOriginal = gamesPosModified;
}

const draggableGamesConfig = () => {
    $('#games-list').sortable();

    $("#games-list").on('sortstop', (e, ui) =>{
        const regex = /\<p class\=\"title\"\>(.*?)\<\/p\>/
        const target = regex.exec(ui.item[0].innerHTML)[1];
        changePosition(target);
    });
}

document.getElementById('add').addEventListener('click', () => {
    document.querySelector('.add-form').classList.remove('disp-none');
    const listId = JSON.parse(window.sessionStorage.getItem('listId'));

    fetch(`http://localhost:8080/lists/${listId}/games/available`)
        .then(r => r.json())
        .then(games =>{
            const gamesHtml = games.map(g => `
                <option value=${g.id}>
                    ${g.title}
                </option>
            `).join('');
            document.getElementById('games').innerHTML = gamesHtml;
        })
});


window.addEventListener('DOMContentLoaded', () => {

    const categoryName = location.href.split('?')[1].split('=')[1];

    fetch(`http://localhost:8080/lists/${categoryName}/id`)
        .then(r => r.json())
        .then(gameList =>{
            fetch(`http://localhost:8080/lists/${gameList.id}/games`)
                .then(r => r.json())
                .then(r => {
                    const games = Array.from(r);
                    if(games.length > 0){
                        document.querySelectorAll('p').forEach(p => p.classList.remove('disp-none'));
                    }
                    const gamesList = document.getElementById('games-list');
                    gamesList.innerHTML = games.map(g => `
                        <li>
                            <a href="./game.html?id=${g.id}">   
                                <div>
                                    <img src="${g.imgUrl}">
                                    <div class="details">
                                        <p class="title">${g.title}</p>
                                        <p class="year">${g.year}</p>
                                        <p class="short-desc">${g.shortDescription}</p>
                                    </div>
                                </div>
                            </a>
                        </li>
                    `).join('');
                    gamePosOriginal = getGames();
                    draggableGamesConfig();
                    window.sessionStorage.setItem('listId', gameList.id);
                });
        })

})
