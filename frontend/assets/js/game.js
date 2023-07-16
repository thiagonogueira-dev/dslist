window.addEventListener('DOMContentLoaded', () => {
    const id = location.search.split('=')[1];

    fetch(`http://localhost:8080/games/${id}`)
        .then(r => r.json())
        .then(game => {
            console.log(game);
        });
});