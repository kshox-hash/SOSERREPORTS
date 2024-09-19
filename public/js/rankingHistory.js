const bodegaId = document.getElementById('bodega-section');
const clasificacionId = document.getElementById('proveedor-section');
const ucreaId = document.getElementById('clasificacion-section');

export  function  getDataForRanking(data){
const types = ['Bodega', 'Clasificacion', 'ucrea'];

for(let i=0; i<types.length; i++){
    let type = types[i]
    let dataInGroup = data.reduce((acc, curr) => {
        let value = curr[type];
        if(!acc[value]){
            acc[value] = 1
        } else {
            acc[value]++
        }
    
        return acc
    }, {})

    const sortedData = Object.entries(dataInGroup)
    .sort((a, b) => b[1] - a[1]); 

    console.log(sortedData)

    const top5 = sortedData.slice(0, 5);

   
    let listItems = top5.map(([key, value], index) => 
        `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class=" me-auto">
                <div">${index + 1}. ${key}</div>
            </div>
            <span class="badge text-bg-primary rounded-pill">${value}</span>
        </li>`
    ).join('');

    switch (type) {
        case 'Bodega':
            bodegaId.innerHTML = `<ol class="list-group ">${listItems}</ol>`;
            break;
        case 'Clasificacion':
            clasificacionId.innerHTML = `<ol class="list-group ">${listItems}</ol>`;
            break;
        case 'ucrea':
            ucreaId.innerHTML = `<ol class="list-group ">${listItems}</ol>`;
            break;
        default:
            console.log('Tipo no reconocido');
    }
  
}

    
  
}   