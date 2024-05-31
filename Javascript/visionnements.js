document.addEventListener('DOMContentLoaded', function() {
    const visionnementsList = document.getElementById('visionnements-list');
    function fetchVisionnements() {
        fetch('http://127.0.0.1:8080/ords/streaming/visionnements/')
            .then(response => response.json())
            .then(data => {
                visionnementsList.innerHTML = '';
                data.items.forEach(visionnements => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Visionnement ID: ${visionnements.id_visionnement}</h5>
                        <p class="card-text">Date de visionnement: ${new Date(visionnements.date_visionnement).toLocaleDateString()}</p>
                        <p class="card-text">RÃ©alisateur ID: ${visionnements.abonnes_id_abonne}</p>
                        <p class="card-text">Film ID: ${visionnements.id_films}</p>
                    </div>
                </div>
                `;
                visionnementsList.appendChild(col);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

fetchVisionnements();
});
