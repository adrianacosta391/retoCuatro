const documento = document.getElementById('titulo');
const apiKey = '43f0b32bd483d426b48da06527d219f6';
const apiUrl = 'http://api.openweathermap.org/';


let latitud, longitud, nombreCapital, pais, descripcion, sensacionTermica, presion, humedad, minTemp, maxTemp = '';



async function buscarLatitud(ciudad) {
const respuesta = await fetch(apiUrl + `geo/1.0/direct?q=${ciudad}&appid=${apiKey}`)
const datos = await respuesta.json();
latitud = datos[0].lat;
longitud = datos[0].lon;
nombreCapital = ciudad;

}


async function obtenerConCords(latitud, longitud) {
const respuesta = await fetch(apiUrl + `data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`)
const datos = await respuesta.json();
pais = datos.sys.country;
descripcion = datos.weather[0].description;
sensacionTermica = datos.main.feels_like;
presion = datos.main.pressure;
humedad = datos.main.humidity;
minTemp = datos.main.temp_min;
maxTemp = datos.main.temp_max;


}


async function obtenerDatosClimaticos(capital) {
    await buscarLatitud(capital);
    await obtenerConCords(latitud, longitud);
  }

    
    
    
    obtenerDatosClimaticos('bogota').then(() => {
        documento.innerHTML += `
        
        nombre de la capital: ${nombreCapital};

        país: ${pais};
        
        descripción del clima: ${descripcion};
        
        sensación térmica: ${sensacionTermica};
        
        presión: ${presion};
        
        humedad: ${humedad};
        
        temperatura mínima: ${minTemp};
        
        temperatura máxima: ${maxTemp}; `;
    });

    





