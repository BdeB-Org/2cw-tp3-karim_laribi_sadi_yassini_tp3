document.addEventListener('DOMContentLoaded', function() {
    const genresList = document.getElementById('genres-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-nom');
    function fetchGenres(query = '') {
        let url = 'http://127.0.0.1:8080/ords/streaming/genres/';
        if (query) {
            url += `?q={"nom":{"$like":"%${query}%"}}`;
        }
        console.log('Fetching URL:', url);
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de connexion ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('DonnÃ©es recues:', data);
            genresList.innerHTML = '';
            data.items.forEach(genre => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${genre.nom}</h5>
                            <p class="card-text">${genre.description}</p>
                        </div>
                    </div>
                    `;
                    genresList.appendChild(col);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    searchButton.addEventListener('click', () => fetchGenres(searchInput.value));
    fetchGenres();
});
