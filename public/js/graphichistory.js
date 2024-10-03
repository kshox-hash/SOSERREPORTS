  import { fetchDataToDb } from '/js/fetchdata.js';
  import { getDataForRanking } from '/js/rankingHistory.js';

  document.addEventListener('DOMContentLoaded', function() {

  const video = document.getElementById('video');
  const chartContainer = document.getElementById('chart');
  //init video
  chartContainer.style.display = 'none';
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;  
  video.removeAttribute('controls');  


  video.addEventListener('ended', function() {
    video.style.display = 'none';
    chartContainer.style.display = 'block';

  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const graph = chartContainer.getContext('2d');

  const dataGraphic = {
      labels: labels,
      datasets: [{
          label: "Productos faltantes por mes",
          data: [], 
          backgroundColor: 'rgba(255, 255, 204, 0.8)',
      }]
  };

  const config = {
      type: 'bar',
      data: dataGraphic,
      options: {
          plugins: {
              tooltip: {
                  enabled: true
              },
              legend: {
                  display: false
              }
          },

          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
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
