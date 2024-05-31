document.addEventListener('DOMContentLoaded', function() {
    const filmsList = document.getElementById('films-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-nom');

    const films = [
        {
            titre: "Inception",
            année_de_sortie: 2010,
            realisateur: "Christopher Nolan",
            genre: "Science-fiction, Action"
        },
        {
            titre: "Jurassic Park",
            année_de_sortie: 1993,
            realisateur: "Steven Spielberg",
            genre: "Science-fiction, Aventure"
        },
        {
            titre: "The Irishman",
            année_de_sortie: 2019,
            realisateur: "Martin Scorsese",
            genre: "Biographique, Drame"
        },
        {
            titre: "Pulp Fiction",
            année_de_sortie: 1994,
            realisateur: "Quentin Tarantino",
            genre: "Crime, Drame"
        },
        {
            titre: "Avatar",
            année_de_sortie: 2009,
            realisateur: "James Cameron",
            genre: "Science-fiction, Aventure"
        },
        {
            titre: "Lost in Translation",
            année_de_sortie: 2003,
            realisateur: "Sofia Coppola",
            genre: "Drame, Romance"
        }
    ];

    function displayFilms(films) {
        filmsList.innerHTML = '';
        films.forEach(film => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${film.titre}</h5>
                        <p class="card-text">Année de sortie: ${film.année_de_sortie}</p>
                        <p class="card-text">Réalisateur: ${film.realisateur}</p>
                        <p class="card-text">Genre: ${film.genre}</p>
                    </div>
                </div>
            `;
            filmsList.appendChild(col);
        });
    }

    function searchFilms(query) {
        const filteredFilms = films.filter(film => film.titre.toLowerCase().includes(query.toLowerCase()));
        displayFilms(filteredFilms);
    }

    searchButton.addEventListener('click', () => searchFilms(searchInput.value));
    displayFilms(films); 
});
