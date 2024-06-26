document.addEventListener('DOMContentLoaded', function() {
    const realisateurList = document.getElementById('realisateur-list');
    const searchButton = document.getElementById('search-button');
    const searchNom = document.getElementById('search-nom');

    function fetchRealisateur(query = '') {
        let url = 'http://127.0.0.1:8080/ords/streaming/realisateur/';
        if (query) {
            url += `?q={"nom":{"$like":"%${query}%"}}`;
        }
        console.log('URL:', url);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de connexion ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Données recues:', data); 
                realisateurList.innerHTML = '';
                data.items.forEach(realisateur => {
                    console.log('Réalisateur:', realisateur); 
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${realisateur.nom}</h5>
                                <p class="card-text">${realisateur.biographie || ''}</p>
                                <p class="card-text"><small class="text-muted">Date de naissance: ${new Date(realisateur.date_naissance).toLocaleDateString()}</small></p>
                                <p class="card-text"><small class="text-muted">Date de décès: ${realisateur.date_deces ? new Date(realisateur.date_deces).toLocaleDateString() : 'N/A'}</small></p>
                            </div>
                        </div>
                    `;
                    realisateurList.appendChild(col);
                });
            })
            .catch(error => {
                console.error('Erreur:', error); 
            });
        }})
