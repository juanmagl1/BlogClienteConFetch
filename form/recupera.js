fetch('http://localhost:3000/posts')
.then(response => response.json())
.then( lista =>{
    for(i=0;i<lista.length;i++){
        let ul = document.querySelector('ul');
        let li = document.createElement('li');
        let contenido = document.createTextNode("Título: " + lista[i].title + ", Autor: " + lista[i].authorId);
        let a = document.createElement('a');
        a.setAttribute('href',`articulo.html?id=${lista[i].id}`);
        a.appendChild(contenido);
        li.appendChild(a);
        ul.appendChild(li);
    }
})
.catch( err => console.log(err))