document.getElementById('btnBuscar').addEventListener('click', function() {
    const busqueda = document.getElementById('inputBuscar').value;


    if (busqueda === '') {
       alert('Por favor ingrese su búsqueda');
    return;
    }


    const urlNasa = `https://images-api.nasa.gov/search?q=${encodeURIComponent(busqueda)}`;


    document.getElementById('contenedor').innerHTML = '';

    // Solicitud a la API de la NASA
    fetch(urlNasa)
        .then(response => response.json())
        .then(data => {
            const items = data.collection.items;
            
            if (items.length === 0) {
                document.getElementById('contenedor').innerHTML = '<p>No se encontraron imágenes.</p>';
                return;
            }

            items.forEach(item => {
                const { title, description, date_created } = item.data[0];
                const img = item.links && item.links.length > 0 ? item.links[0].href : null;
        
    
               const tarjetaHtml = `
                 <div class="col-md-4 mb-4 d-flex justify-content-center"> 
                   <div class="card shadow-sm rounded"> 
                      <img src="${img}" class="card-img-top" alt="${title}">
                      <div class="card-body">
                         <h5 class="card-title">${title}</h5>
                         <p class="card-text">${description || 'No hay una descripción disponible'}</p>
                         <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
                      </div>
                    </div>
                </div>
               `;
        

                document.getElementById('contenedor').innerHTML += tarjetaHtml;
            });
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
            document.getElementById('contenedor').innerHTML = '<p>Ocurrió un error al realizar la búsqueda. Intenta nuevamente.</p>';
        });
});