const bodegaId = document.getElementById('bodega-section');
const clasificacionId = document.getElementById('chart');
const ucrea = document.getElementById('chart');

export  function  getDataForRanking(data){
const types = ['Bodega', 'Clasificacion', 'ucrea'];

for(let i=0; i<types.length; i++){
    let dataInGroup = data.reduce((acc, curr) => {
        let type = curr[types[i]];
        if(!acc[type]){
            acc[type] = []
        } else {
            acc[type]++
        }
    
        return acc
    }, {})

    const sortedData = Object.entries(dataInGroup)
    .sort((a, b) => b[1] - a[1]); 

    const top5 = sortedData.slice(0, 5);

    switch (type) {
        case 'Bodega':
            bodegaId.innerHTML = `<h3>Top 5 Bodegas:</h3><ul>${top5.map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}</ul>`;
            break;
        case 'Clasificacion':
            clasificacionId.innerHTML = `<h3>Top 5 Clasificaciones:</h3><ul>${top5.map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}</ul>`;
            break;
        case 'ucrea':
            ucreaId.innerHTML = `<h3>Top 5 Ucreas:</h3><ul>${top5.map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}</ul>`;
            break;
        default:
            console.log('Tipo no reconocido');
    }

    

    
}

    
  
}   