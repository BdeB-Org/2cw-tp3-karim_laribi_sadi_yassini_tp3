document.addEventListener('DOMContentLoaded', function() {
    const filmsList = document.getElementById('films-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-nom');

    function fetchFilms(query = '') {
        let url = 'http://127.0.0.1:8080/ords/streaming/films/';
        if (query) {
            url += `?q={"titre":{"$like":"%${query}%"}}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                filmsList.innerHTML = '';
                data.items.forEach(film => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${film.titre}</h5>
                                <p class="card-text">Année de sortie: ${film.année_de_sortie}</p>
                                <p class="card-text">Réalisateur ID: ${film.realisateur_id_realisateur}</p>
                                <p class="card-text">Genre ID: ${film.genres_id_genre}</p>
                            </div>
                        </div>
                    `;
                    filmsList.appendChild(col);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    searchButton.addEventListener('click', () => fetchFilms(searchInput.value));
    fetchFilms();
});
