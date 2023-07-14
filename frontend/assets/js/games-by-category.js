const getGames = () => {
    return Array.from(document.querySelectorAll('#games-list li'));
}

const changePosition = e => {
    const gamesPosModified = getGames();
    const sourceIndex = gamePosOriginal.findIndex(g => g.innerHTML === e.target.innerHTML);
    const destinationIndex = gamesPosModified.findIndex(g => g.innerHTML === e.target.innerHTML);
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
    let sortableList = document.getElementById('games-list');
    new Sortable(sortableList, {
        animation: 150,
        ghostClass: 'blue-background-class',
    });
    
    for(let g of gamePosOriginal){
        g.addEventListener('dragstart', e => {
        });
        g.addEventListener('dragend', changePosition);
    }
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