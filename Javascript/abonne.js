document.addEventListener('DOMContentLoaded', function() {
    const abonneList = document.getElementById('abonne-list');
    function fetchAbonne() {
        fetch('http://127.0.0.1:8080/ords/streaming/abonne/')
            .then(response => response.json())
            .then(data => {
                abonneList.innerHTML = '';
                data.items.forEach(abonne => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4';
                    col.innerHTML = `
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${abonne.nom}</h5>
                        <p class="card-text">ID: ${abonne.id_abonne}</p>
                        <p class="card-text">Adresse: ${abonne.email}</p>
                        <p class="card-text">Téléphone: ${abonne.numero_telephone}</p>
                        <p class="card-text">Date dMinscription:  ${new Date(abonne.date_inscription).toLocaleDateString()}</p>
                    </div>
                </div>
            `;
            abonneList.appendChild(col);
        });
    })
    .catch(error => console.error('Erreur:', error));
}

fetchAbonne();
});
