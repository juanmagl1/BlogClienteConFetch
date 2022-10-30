//Nos traemos el id
const queryString=window.location.search
const params= new URLSearchParams(queryString);
let id=params.get('id');

fetch(`http://localhost:3000/posts/${id}`)
.then(response=>response.json())
.then(comentarios=>{
    let p=document.querySelector('header');
    p.innerHTML=`Articulo ${comentarios.title}`
    //Nos traemos el nick del autor
    fetch(`http://localhost:3000/users/${comentarios.authorId}`)
    .then(res=>res.json())
    .then(autor=>{
        let nom=document.querySelector('#autor');
        nom.innerHTML=`Nick del autor: ${autor.nick}`;
    })
    //Ahora vamos por los comentarios
    //Lleva la ? porque no estamos buscando por el id, sino por el postId que no es la clave
    fetch(`http://localhost:3000/comments?postId=${id}`)
    .then(comm=>comm.json())
    .then(comment=>{
        let list=document.querySelector('#comentario');
        for(let i=0;i<comment.length;i++){
            let texto=document.createElement('li');
            texto.textContent=comment[i].content;
            list.appendChild(texto);
        }
    })
    //Ahora lo que queremos es tener los autores para meterlos en la lista
    fetch('http://localhost:3000/users')
    .then(aut=>aut.json())
    .then(authors=>{
        let sel=document.querySelector('#select');
        for(let i=0;i<authors.length;i++){
        let opt=document.createElement('option');
        opt.textContent=authors[i].nombre;
        opt.value=authors[i].id;
        sel.appendChild(opt);
        }
    })
    //Procedemos a enviar el formulario
    let cont=document.querySelector('#contentComment')
    let bot=document.querySelector('#bot');
    let fecha=new Date();
    bot.addEventListener('click',function(e){
        e.preventDefault();
        //Creamos un comentario nuevo
        const newComment={
            "content":cont.value,
            "authorId":document.getElementById('select').value,
            "postId":id,
            "fecha":fecha
        }
        fetch('http://localhost:3000/comments',{
            method:'POST',
            body:JSON.stringify(newComment),
            headers:{
                'Content-Type':'Application/json'
            }
        })
        .then(res=>{
            if (res.ok){
                alert('Comentario añadido con éxito');
            }
            return Promise.reject(res)
        })
    })
})