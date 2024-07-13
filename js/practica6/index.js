let boton_registrar = document.getElementById("registrar");
boton_registrar.addEventListener("click", mostrar_registro);

function mostrar_registro(e){
    e.preventDefault();
    let div_padre = e.target.parentNode;
    limpiar_contenido(div_padre);
    mostrar_form_regis(div_padre);
}

function mostrar_form_regis(div_padre){
    let formulario = document.createElement("FORM");
    let label_nombre = document.createElement("LABEL");
    let input_nombre = document.createElement("INPUT");
    let label_apellido = document.createElement("LABEL");
    let input_apellido = document.createElement("INPUT");
    let label_password = document.createElement("LABEL");
    let input_password = document.createElement("INPUT");
    let label_email = document.createElement("LABEL");
    let input_email = document.createElement("INPUT");
    let registro = document.createElement("BUTTON");
    label_nombre.innerText= "Introduzca su nombre: ";
    label_apellido.innerText= "Introduzca su apellido: ";
    label_password.innerText= "Introduzca su contraseña: ";
    label_email.innerText= "Introduzca su email: ";
    input_nombre.id = "input_nombre_regis";
    input_apellido.id = "input_apellido_regis";
    input_password.id = "input_password_regis";
    input_password.setAttribute("type","password");
    input_email.id = "input_email_regis";
    registro.id= "registro";
    registro.addEventListener("click",registrar_usuario);
    registro.innerText= "Registrar usuario";
    //Añadir los elementos al formulario
    formulario.appendChild(label_nombre);
    formulario.appendChild(input_nombre);
    formulario.innerHTML += "<br>";
    formulario.appendChild(label_apellido);
    formulario.appendChild(input_apellido);
    formulario.innerHTML += "<br>";
    formulario.appendChild(label_password);
    formulario.appendChild(input_password);
    formulario.innerHTML += "<br>";
    formulario.appendChild(label_email);
    formulario.appendChild(input_email);
    formulario.innerHTML += "<br>";
    formulario.appendChild(registro);
    //Añadir el formulario al div contenido
    div_padre.appendChild(formulario);
}

function registrar_usuario(e){
    e.preventDefault();
    if(document.getElementById("p_error")){
        document.getElementById("p_error").remove();
    }
    let p_error = document.createElement("P");
    p_error.id = "p_error";
    p_error.classList.add("rojo");
    let formulario = e.target.parentNode;
    let nombre = document.getElementById("input_nombre_regis").value;
    let apellido = document.getElementById("input_apellido_regis").value;
    let password = document.getElementById("input_password_regis").value;
    let email = document.getElementById("input_email_regis").value;

    if(validar_formulario(formulario)){
        if(! email_repetido(email)){
            //Crear un objeto Usuario
            let newUsuario = new Usuario(nombre, apellido, password, email);
            //console.log(newUsuario);
            localStorage.setItem(email,JSON.stringify(newUsuario));
            console.log("¡Nuevo usuario guardado exitosamente!");
            formulario.reset();
        }
        else{
            console.log("Error, el email ya está registrado.");
            p_error. innerText = "Error, el email ya está registrado.";
            formulario.appendChild(p_error);
        }
    }
    else{
        console.log("Error, existe uno o más campos vacios.");
        p_error. innerText = "Error, existe uno o más campos vacios.";
        formulario.appendChild(p_error);
    }
}

function validar_formulario(formulario){
    let inputs = formulario.querySelectorAll("INPUT");
    let valido = true;
    for (let i = 0; i<inputs.length; i++){
        if (inputs[i].value == ""){
            valido = false;
            break;
        }
    }
    return valido;
}

//Verificar que no exista un usuario como el mismo email guardado en el localStorage
function email_repetido(email){
    let repetido = false;
    for(let i=0; i<localStorage.length; i++){
        if (localStorage.key(i) == email){
            repetido = true;
            break;
        }
    }
    return repetido;
}
