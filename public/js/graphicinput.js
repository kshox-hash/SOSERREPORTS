
document.addEventListener('DOMContentLoaded', function(){
const btnChart = document.getElementById('btnchart')
btnChart.addEventListener('click', function(){
    const data = fetchDataToDb()
    data
    .then(element => 
        element.reduce((acc, curr) => {
            const fecha = curr.fecha
            console.log(fecha)
            
        })
    )
    .catch(err => console.log(err))

})

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril','mayo', 'junio', 'julio', "agosto", 'septiembre', 'octubre', 'noviembre', 'diciembre']
const graph = document.getElementById('graphic-form').getContext('2d');

const data = {
    labels: labels,
    datasets: [{
        label:"productos faltantes por mes",
        data: [1, 2, 3, 4],
        backgroundColor: 'rgba(58, 142, 255, 1)'
    }]
};

const config = {
    type: 'line',
    data: data,
};

new Chart(graph, config);

    
})
