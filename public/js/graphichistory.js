import { fetchDataToDb }from '/js/fetchdata.js'
import { getDataForRanking } from '/js/rankingHistory.js';


document.addEventListener('DOMContentLoaded', function(){
const btnChart = document.getElementById('btnchart');
const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','mayo', 'junio', 'julio', "agosto", 'septiembre', 'octubre', 'noviembre', 'diciembre']
const graph = document.getElementById('chart').getContext('2d');
//create graphic and pass data;

const dataGraphic = {
    labels: labels,
    datasets: [{
        label:"productos faltantes por mes",
        data: [],
        backgroundColor: 'rgba(58, 142, 255, 1)'
    }]
};

const config = {
    type: 'bar',
    data: dataGraphic,
};

btnChart.addEventListener('click', function(){
    const data = fetchDataToDb()
    data.then(element => {
        getDataForRanking(element)

        const datesGroupedByDate = element.reduce((acc, curr) => {
            const date = new Date(curr.fecha)

            const month = date.getMonth();
            if(!acc[month]){
                acc[month] = 1

            } else {
                acc[month]++

            }

            return acc;
        
        }, {});

        createArrayToGraphic(datesGroupedByDate);

    })
    .catch(err => console.log(err));

});

function createArrayToGraphic(dataGraphic){

    const dataToGraphic = new Array(12).fill(0);

    for(const [key, value] of Object.entries(dataGraphic)){
        let index = Number(key);
        dataToGraphic[index] = value

    }

    changingDataToGraphic(dataToGraphic)
    
    };

function changingDataToGraphic(arrayWithData){
  
    dataGraphic.datasets[0].data = arrayWithData;
    updateChart.update()
    
    };



const updateChart = new Chart(graph, config);



})
