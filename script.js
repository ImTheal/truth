async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const responseDiv = document.getElementById('response');
    const loader = document.getElementById('loader');
    const searchQuery = searchInput.value;
    
    if (!searchQuery.trim()) {
        alert('Veuillez entrer une question');
        return;
    }

    // Afficher le loader
    loader.style.display = 'flex';
    responseDiv.style.display = 'none';
    
    try {
        const response = await fetch('https://n8n.tambour.in/webhook/1c168a7d-afd5-4861-97d8-e1991a3dc717', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: searchQuery
            })
        });
        
        const data = await response.json();
        
        // Cacher le loader
        loader.style.display = 'none';
        
        // Afficher la réponse
        responseDiv.style.display = 'block';
        responseDiv.innerHTML = data.res.replace(/\n/g, '<br>');
        
    } catch (error) {
        console.error('Erreur lors de l\'appel au webhook:', error);
        loader.style.display = 'none';
        responseDiv.style.display = 'block';
        responseDiv.textContent = 'Une erreur est survenue lors de la recherche. Veuillez réessayer.';
    }
}

// Permettre l'envoi avec la touche Entrée
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
