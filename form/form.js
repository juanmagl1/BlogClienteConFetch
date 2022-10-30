let nombre=document.querySelector('#nombre');
let correo=document.querySelector('#correo');
let contr=document.querySelector('#pass');
let form=document.querySelector('#formu');

const checkEmail=()=>{
    let valid=false;
    const corr=correo.value.trim();
    if (!isRequired(corr)){
        showError(correo,'El campo no puede estar vacío');
    }else {
        showSucess(correo)
        valid=true;
    }
    return valid;

}
const checkPasword=()=>{
    let valid=false;
    const pass=contr.value.trim();
    if (!isRequired(pass)){
        showError(contr,'El campo está vacío');
    }else if (!PasswordSecure(pass)){
        showError(contr,'Tiene que ser un numero no una letra');
    }else {
        showSucess(contr);
        valid=true;
    }
    return valid;
}
const PasswordSecure = (password)=> {
    const regularExpresion=new RegExp("^[a-z]{1,4}");
    return regularExpresion.test(password);
}

const isRequired = value => value ===''? false:true;
const isBetween = (length,min,max)=> length<min || length>max?false:true;
const showError=(input,message)=>{
    const formField=input.parentElement;
    const error=formField.querySelector('small');
    error.textContent=message;
}
const showSucess = (input) =>{
    const formField=input.parentElement;
    const error=formField.querySelector('small');
    error.textContent='';
}
form.addEventListener('submit',function(e){
    e.preventDefault();

    let emailValid=checkEmail(),
    pasValid=checkPasword();

    let fomularioValido= emailValid && pasValid;

    if (fomularioValido){
        const newProduct={
            nombre:correo.value,
            nick:contr.value
        }
        fetch('http://localhost:3000/users',{
            method:'POST',
            body:JSON.stringify(newProduct),
            headers:{'Content-type':'application/json'
    }
        })
        .then(response=>{
            if (response.ok){
                alert('Añadido con exito');
            }
            return Promise.reject(response);
        })
        .catch(err=>{
            console.log('Error en la peticion HTTP:'+err.message);
        })
        // const peticion=new XMLHttpRequest();
        // peticion.open('POST','http://localhost:3000/users');
        // peticion.setRequestHeader('Content-type','application/json');
        // peticion.send(JSON.stringify(newProduct));
        // peticion.addEventListener('load',function (){
        //     if (peticion.status===200||peticion.status===201){
        //         alert("Articulo añadido con éxito");
        //     }
        // })
    }
});


