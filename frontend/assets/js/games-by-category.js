const getGames = () => {
    return Array.from(document.querySelectorAll('.title'));
}

const changePosition = (target) => {
    const gamesPosModified = getGames();
    const sourceIndex = gamePosOriginal.findIndex(g => g.innerHTML === target);
    const destinationIndex = gamesPosModified.findIndex(g => g.innerHTML === target);
    fetch(`http://localhost:8080/lists/${id}/replacement`, {
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

const id = location.href.split('?')[1].split('=')[1];
let gamePosOriginal;

fetch(`http://localhost:8080/lists/${id}/games`)
    .then(r => r.json())
    .then(r => {
        const games = Array.from(r);
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = games.map(g => `
            <li>    
                <div>
                    <img src="${g.imgUrl}">
                    <div class="details">
                        <p class="title">${g.title}</p>
                        <p class="year">${g.year}</p>
                        <p class="short-desc">${g.shortDescription}</p>
                    </div>
                </div>
            </li>
        `).join('');
        gamePosOriginal = getGames();
        draggableGamesConfig();
    });