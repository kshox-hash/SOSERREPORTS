import { fetchDataToDb } from '/js/fetchdata.js';
import { getDataForRanking } from '/js/rankingHistory.js';

document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencia al video y al canvas del gráfico
  const video = document.getElementById('video');
  const chartContainer = document.getElementById('chart');

  // Ocultar el gráfico inicialmente
  chartContainer.style.display = 'none';

  // Reproducir el video automáticamente sin mostrar controles
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;  // Para que funcione en dispositivos móviles
  video.removeAttribute('controls');  // Remover los controles del video

  // Cuando termine el video, ocultarlo y mostrar el gráfico
  video.addEventListener('ended', function() {
    // Ocultar el video
    video.style.display = 'none';

    // Mostrar el gráfico
    chartContainer.style.display = 'block';

    // Configuración del gráfico
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const graph = chartContainer.getContext('2d');

    const dataGraphic = {
      labels: labels,
      datasets: [{
        label: "Productos faltantes por mes",
        data: [],
        backgroundColor: 'rgba(58, 142, 255, 1)',
      }]
    };

    const config = {
      type: 'bar',
      data: dataGraphic,
    };

    const updateChart = new Chart(graph, config);

    // Obtener los datos y actualizar el gráfico
    fetchDataToDb().then(element => {
      getDataForRanking(element);

      const datesGroupedByDate = element.reduce((acc, curr) => {
        const date = new Date(curr.fecha);
        const month = date.getMonth();
        if (!acc[month]) {
          acc[month] = 1;
        } else {
          acc[month]++;
        }
        return acc;
      }, {});

      createArrayToGraphic(datesGroupedByDate);
    }).catch(err => console.log(err));

    function createArrayToGraphic(dataGraphic) {
      const dataToGraphic = new Array(12).fill(0);
      for (const [key, value] of Object.entries(dataGraphic)) {
        let index = Number(key);
        dataToGraphic[index] = value;
      }
      changingDataToGraphic(dataToGraphic);
    }

    function changingDataToGraphic(arrayWithData) {
      dataGraphic.datasets[0].data = arrayWithData;
      updateChart.update();
    }
  });

  // Asegurar que el video se reproduzca automáticamente al cargar
  video.play();
});
