// Ejercicio 1.1

fetch('https://jsonplaceholder.typicode.com/users')
    .then(respuesta => respuesta.json()) 
    .then(respJson => {
        console.log(respJson);
        const usuariosContainer = document.querySelector('#usuarios');
        
        for(let i = 0; i < 5; i++){
            const usuario = respJson[i];
            const [nombre, apellido] = usuario.name.split(" ");
            usuariosContainer.innerHTML += `
                <tr>
                    <th id="id_${i}" scope="row">${usuario.id}</th>
                    <td id="nombre_${i}">${nombre}</td>
                    <td id="apellido_${i}">${apellido}</td>
                    <td id="email_${i}">${usuario.email}</td>
                </tr>`;
        }

        // Ejercicio 1.2
        document.querySelector('#usuarios').addEventListener('click', (evento) => {
            const idUsuario = evento.target.id.split('_')[1];
            const usuarioSeleccionado = respJson[idUsuario];
            
            document.querySelector('#cardUsu').innerHTML =
                `
                <h5 class="card-title">${usuarioSeleccionado.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Datos</h6>
                <p><strong>Nombre de usuario: </strong> ${usuarioSeleccionado.username}</p>
                <p><strong>Ciudad: </strong> ${usuarioSeleccionado.address.city}</p>
                <p><strong>Teléfono: </strong> ${usuarioSeleccionado.phone}</p>
                <a href="${usuarioSeleccionado.website}" class="card-link">${usuarioSeleccionado.website}</a>
                `;

            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuarioSeleccionado.id}`)
                .then(resp => resp.json()) 
                .then(posts => {
                    console.log(posts);
                    const listaPosts = document.querySelector('#listaPosts');
                    listaPosts.innerHTML = "";
                    for(let i = 0; i < posts.length; i++){
                        const post = posts[i];
                        listaPosts.innerHTML += `
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div id="post_${post.id}" class="ms-2 me-auto">
                                    <div id="titulo_${post.id}" class="fw-bold">${post.title}</div>
                                    <div id="cuerpo_${post.id}" >${post.body}</div>
                                </div>
                                <span class="badge bg-primary rounded-pill">5</span>
                            </li>`;
                    }
                });
        });

    })
    .catch(error => console.log(error))
    .finally(() => console.log('¡Proceso finalizado!'));

// Ejercicio 1.3
fetch('https://jsonplaceholder.typicode.com/comments')
    .then(respuestaComentarios => respuestaComentarios.json()) 
    .then(respJsonComent =>{
        console.log(respJsonComent)
        let palabras = ["Uno", "Dos", "Tres", "Cuatro", "Cinco"];
        for(let i = 0; i < 5; i++){
            document.querySelector('#accordionExample').innerHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading_${palabras[i]}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_${palabras[i]}" aria-expanded="true" aria-controls="collapse_${palabras[i]}">
                            PostId: ${respJsonComent[i].postId}
                        </button>
                    </h2>
                    <div id="collapse_${palabras[i]}" class="accordion-collapse collapse" aria-labelledby="heading_${palabras[i]}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            ${respJsonComent[i].body}
                        </div>
                    </div>
                </div>`;
        }
    })
    .catch(error => console.log(error))
    .finally(() => console.log('¡Proceso finalizado!'));
