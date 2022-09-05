

//Años, días, minutos y segundos en milisegundos
// 1s = 1000 ms
// 1min= 60s
// 1hora= 60min
// 1dia= 24horas
// 1año= 365dias

const unAño= 365*24*60*60*1000;
const unDia= 24*60*60*1000;
const unaHora= 60*60*1000;
const unMin= 60*1000;
const unSeg= 1000;

var now=null; //aquí se irá guardando la fecha actual (cada segundo)
var ofertonDate;

document.getElementById("enviar").onclick= (e)=>{

    e.preventDefault();

    now= new Date(); //creo la fecha de hoy

    if(oferton==""){ //no se ha introducido fecha
        alert("Debes introducir una fecha");
        return;
    }


    let ofertonStr= document.getElementById("fecha").value; //obtengo la fecha que se ha introducido    
    //Obtengo el año, mes y día que se ha introducido
    let yearOferton= parseInt(ofertonStr.split("-")[0]);
    let monthOferton= parseInt(ofertonStr.split("-")[1])-1; //debo restar -1, los meses empiezan en 0
    let dayOferton= parseInt(ofertonStr.split("-")[2]);

    let hourOferton= parseInt(document.getElementById("hora").value.split(":")[0]);
    let minOferton= parseInt(document.getElementById("hora").value.split(":")[1]);

    ofertonDate= new Date(yearOferton, monthOferton, dayOferton, hourOferton, minOferton, 0); //creo la fecha "futura"

    //La fecha introducida es anterior a JUSTO AHORA?

    if(now-ofertonDate>0){
        alert("La fecha debe ser posterior a la actual");
        return;
    }

    setInterval(regresivo, 1000); //Cada segundo se actualiza
}


function regresivo(){

    now= new Date(); //cada vez que se repita la función dará la fecha y hora actual  

    //Obtengo los milisegundos restantes
    let restante= ofertonDate.getTime() - now.getTime(); //obtengo los milisegundos restantes

    let año= formatNumber(Math.floor(restante/unAño)); //Divido para ver cuantos años caben en los miliseg que hay
    let dias= formatNumber(Math.floor((restante%unAño)/unDia)); //Primero debo saber cuanto sobra de dividir el restante/unAño, luego con el resto compruebo cuantos días se pueden formar
    let horas= formatNumber(Math.floor((restante%unDia)/unaHora)); //Primero debo saber cuanto sobra de dividir el restante/unDia, luego con el resto compruebo cuantas horas se puden formar
    let min= formatNumber(Math.floor((restante%unaHora)/unMin)); //Primero debo saber cuanto sobra de dividir el restante/unaHora, luego con el resto compruebo cuantos minutos se puden formar
    let seg= formatNumber(Math.floor((restante%unMin)/unSeg)); //Primero debo saber cuanto sobra de dividir el restante/unMin, luego con el resto compruebo cuantos segundos se puden formar

    document.querySelector("#years p:nth-of-type(2)").innerHTML= año;
    document.querySelector("#days p:nth-of-type(2)").innerHTML= dias;
    document.querySelector("#hours p:nth-of-type(2)").innerHTML= horas;
    document.querySelector("#minutes p:nth-of-type(2)").innerHTML= min;
    document.querySelector("#seconds p:nth-of-type(2)").innerHTML= seg;
}

/**
 * Función que da formato de dos cifras a un número
 * @param {*} num -> Número a fomartear
 * @returns -> Si el nº es menor o igual que 9, le añade un 0 delante (09), si es mayor, devuelve el nº tal y como le llega
 */
function formatNumber(num){
    if(num<=9)
        return "0"+num;
    return num;
}