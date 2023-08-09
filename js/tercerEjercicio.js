const documento = document.getElementById('titulo');
const apiKey = '43f0b32bd483d426b48da06527d219f6';
const apiUrl = 'http://api.openweathermap.org/';

async function obtenerClimaPorPais(pais) {
  try {
    const respuesta = await fetch(`${apiUrl}data/2.5/weather?q=${pais}&appid=${apiKey}&units=metric`);
    const datos = await respuesta.json();

    const temperaturaActual = datos.main.temp;
    const temperaturaMinima = datos.main.temp_min;
    const temperaturaMaxima = datos.main.temp_max;
    const descripcionClima = datos.weather[0].description;

    return {
      temperaturaActual,
      temperaturaMinima,
      temperaturaMaxima,
      descripcionClima
    };
  } catch (error) {
    console.error(`Error al obtener datos climáticos para ${pais}: ${error.message}`);
    return null;
  }
}

async function obtenerInfoClimaticaParaPaises(paises) {
  const resultados = {};

  for (const pais of paises) {
    const datosClimaticos = await obtenerClimaPorPais(pais);

    if (datosClimaticos) {
      resultados[pais] = datosClimaticos;
    }
  }

  return resultados;
}

const paisesSolicitados = ['Uruguay', 'Argentina', 'Brasil']; // Lista de países a consultar
obtenerInfoClimaticaParaPaises(paisesSolicitados)
  .then(resultados => {
    for (const pais in resultados) {
      const datos = resultados[pais];
      documento.innerHTML += `
        País: ${pais}
        Descripción del clima: ${datos.descripcionClima}
        Temperatura actual: ${datos.temperaturaActual}°C
        Temperatura mínima: ${datos.temperaturaMinima}°C
        Temperatura máxima: ${datos.temperaturaMaxima}°C
        -------------------------------
      `;
    }
  });
