//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null; 
let tarjeta2 = null;
let primerResultado = null; 
let segundoResultado = null;
let movimiento = 0; 
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30; 
let tiempoRegresivoId = null;

//Apuntar a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Desordenar el array aleatoriamente
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>Math.random()-0.5);
console.log(numeros);

//Funciones
function contarTiempo(){    
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        console.log(timer);
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            mostrarTiempo.innerHTML = `Se acabo el tiempo 😰`;
        }
    }, 1000); 
}

function bloquearTarjetas(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;    

    if(tarjetasDestapadas == 1){
       //Mostrar primer numero
       tarjeta1 = document.getElementById(id);
       primerResultado =  numeros[id];
       tarjeta1.innerHTML = primerResultado;
       
       //Deshabilitar primer boton clickeado
       tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
       //Mostrar segundo numero
       tarjeta2 = document.getElementById(id);
       segundoResultado =  numeros[id];
       tarjeta2.innerHTML = segundoResultado;
       //Deshabilitar segundo boton clickeado
       tarjeta2.disabled = true;

       //Incrementar movimientos
       movimiento++;
       mostrarMovimientos.innerHTML = `Movimientos: ${movimiento}`;

       //Evaluar si primerResultado es igual al segundoResultado
       if(primerResultado == segundoResultado){
        //volver a inicializar en cero las tarjetas destapadas
        tarjetasDestapadas = 0;

        ///Incrementar los aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

        if(aciertos == 8){
            clearInterval(tiempoRegresivoId);
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🥳️`;
            mostrarTiempo.innerHTML = `Fantastico!🎉 solo demoraste ${timerInicial - timer} segundos`;
            mostrarMovimientos.innerHTML = `Movimientos: ${movimiento} 🌍`;
        }
       }else{
        //Mostrar momentaneamente valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        }, 800);
       }
    }    
}

function volverJugar(){
    location.reload();
}