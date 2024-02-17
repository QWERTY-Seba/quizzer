


function extraer_parrafo(posicion){
	return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor elit sed vulputate mi sit amet. Cras fermentum odio eu feugiat pretium. Et tortor at risus viverra adipiscing at in tellus. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lobortis feugiat vivamus at augue eget arcu dictum. Massa enim nec dui nunc mattis enim ut tellus elementum. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. Nisi quis eleifend quam adipiscing vitae proin. Vitae congue eu consequat ac felis donec et odio pellentesque. Lectus quam id leo in. Eu ultrices vitae auctor eu augue ut lectus arcu."
}
function cargar_parrafo(parrafo){}
function extraer_palabras_ingles(){}

function generar_palabra_incompleta(pct_maximo_espacios_incompletos, palabra) {
  
	if(pct_maximo_espacios_incompletos <= 0 || pct_maximo_espacios_incompletos > 10){
  	throw "fuera de rango"
  }
	let largo_palabra = palabra.length - 1
	let indices = []
  let indices_espacios = Array.from(palabra).flatMap((letra, indice) => letra == " " ? indice : [] )
  let cantidad_a_quitar = Math.ceil(largo_palabra/10*pct_maximo_espacios_incompletos)
  
  function generar(){
  	let random = (Math.random() * largo_palabra).toFixed();
  	random = Number(random);

    if(!indices.includes(random) && !indices_espacios.includes(random)) {
        indices.push(random);
        return random
     }else{
     		return generar()
     }
  }
 
 
  for(var i = 0; i< cantidad_a_quitar; i++){
 			let valor = generar()
      palabra = palabra.slice(0, valor) + "-" + palabra.slice(valor + 1)
  }
  return palabra
    
}



//GUARDAR REFERIENCIAS
var inputs_actuales = []


function crear_test_palabra(palabra){
	let div_palabra = document.createElement("div")
  div_palabra.classList.add("div_palabra")
	for(let id in palabra){
  	let letra = palabra[id]
  	let campo_letra;
    
    if(letra == "-"){
     	campo_letra = document.createElement("input")
      campo_letra.classList.add("input_letra")
      campo_letra.type = "text"
      campo_letra.addEventListener("input", () => {cambiar_foco_siguiente(campo_letra)})
      campo_letra.setAttribute("maxlength","1")
      campo_letra.setAttribute("size","1")
      
      
            
      
    }else{
    	campo_letra = document.createElement("p")
      campo_letra.innerText = letra
    
    }
 	   
     
     div_palabra.append(campo_letra)   
  
  }
  document.body.append(div_palabra)
}
function validar_test_completo(){}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
//SI SON SHUFFLE TALVEZ HAYA MULTIPLE OPCIONES CORRECTAS, A NO SER QUE TENGAN TRADUCCION
//AGREGAR EVITAR QUE EL RANDOM DEJE LA PALABRA IGUAL
function generar_palabra_shuffle(palabra){
  let palabras_splited = palabra.split(" ")
  let resp = ""
    
  for(var palabra of palabras_splited){
    let array_palabra = Array.from(palabra)         
    resp += shuffle(array_palabra).join("") + " "
  }
	return resp.slice(0,-1)
}

libro = [{
posicion_parrafo : [55,23],
 	preguntas : [{
	fecha_creacion : "2024/01/01",
  historial_respuestas : [],
  escala_actual : "dia",
  fecha_siguiente_evaluacion : "7/2/2024",
  pregunta  : "como estas?"

},{
	fecha_creacion : "2024/01/01",
  historial_respuestas : [],
  escala_actual : "semana",
  fecha_siguiente_evaluacion : "8/2/2024",
  pregunta  : "como te llamas?"

}],
ingles : [],
ya_explorado : true
}]

palabras_ingles = [
	["assesment", "todo"],
  ["work", "talvez"],
  ["test out","nolose"]
]

function cambiar_foco_siguiente(currentInput){
let allInputs = currentInput.parentElement.querySelectorAll('input[type="text"]');
  
  // Find the index of the current input
  let currentIndex = Array.from(allInputs).indexOf(currentInput);

  // Find the next input based on the index
  let nextIndex = currentIndex + 1;
  let nextInput = allInputs[nextIndex];

  // Set focus on the next input if it exists
  if (nextInput) {
    nextInput.focus();
  }
	
}



function crear_evaluacion_ingles(){
	var pct_exigencia = 3
  /*
  	modo 1, incompleta mas traduccion
    modo 2, incompleta, no mostrar traduccion
    modo 3, mostrar solo traduccion
    modo 4, shuffle palabras,con traduccion
    modo 5, shuffle sin traduccion
    modo 6, intercalar entre shuffle e incompleto
  
  */
  var modo = 1
	for(var palabra of palabras_ingles){
  	palabra = palabra[0]
  	switch(modo){
    	case 1:
      	crear_test_palabra(generar_palabra_incompleta(pct_exigencia, palabra))
      	console.log(palabra)
      	break
        
      case 2:
      console.log(generar_palabra_incompleta(pct_exigencia, palabra))
        break

      case 3:
      	console.log(palabra)
        break

      case 4:
      	console.log(generar_palabra_shuffle(palabra), palabra)
      
        break

      case 5:
     	 console.log(generar_palabra_shuffle(palabra))
        break

    
    }
  	
  	
  
  }


}

crear_evaluacion_ingles()
const escalas = {
"dia" : 1,
"semana" : 7,
"mes" : 30,
"cuarto_semestre" : 60,
"semestre" : 120
}

//FECHA EN EPOCH?
//SI SE FALLA SE BAJA 1 ESCALA, SINO SE SUBE
function calcular_siguiente_fecha_evaluacion(fecha, escala, escalar){
		let llaves = Object.keys(escalas)
    let cantidad_escalar = escalar ? 1 : -1
    
    
    
    let idx_actual = llaves.findIndex(e => e == escala) 
    
    if((escalar &&  idx_actual == llaves.length - 1 ) || (escalar == false &&  idx_actual <= 0 )){
    		cantidad_escalar = 0
        
     }
   
    
    let idx_siguiente = idx_actual +  1 * cantidad_escalar
               
    cantidad_dias = escalas[llaves[idx_siguiente]]
    
    let fecha_resp = new Date(fecha.getTime())
    
    fecha_resp.setDate(fecha_resp.getDate() + cantidad_dias)

    return (fecha_resp, llaves[idx_siguiente])
  	
}


function crear_evaluacion(){
		const fecha_hoy = new Date()
		for(var grupo of libro){
  	cargar_parrafo(extraer_parrafo(grupo.posicion_parrafo))

  	for(var pregunta of grupo.preguntas){
    		//CARGAR TODAS LAS PREGUNTAS Y DESHABILITAR LAS QUE NO CORRESPONDAN, MOSTRARLAS IGUAL
    	
    	let a_preguntar = pregunta.fecha_siguiente_evaluacion == fecha_hoy
				console.log(a_preguntar, pregunta.pregunta)
        console.log(calcular_siguiente_fecha_evaluacion(fecha_hoy,pregunta.escala_actual, false))
    	if(ya_explorado == false){
      		extraer_palabras_ingles()
      }
    
    	
    }
  	
  
  }
}

