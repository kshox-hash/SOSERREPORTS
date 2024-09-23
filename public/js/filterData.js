document.addEventListener('DOMContentLoaded', () => {
    const filterType = document.getElementById('filterType');
    const filterOptions = document.getElementById('filterOptions');
    const filterButton = document.getElementById('filterButton');
    const additionalFilter = document.getElementById('additionalFilter');
    const excel_button =document.getElementById('exportButton');
  
    
   
  
    // Opciones de filtro dinámicas
    const filterOptionsMap = {
        'Bodega': [
          { value: 'Bodega Paine Soser', label: 'BODEGA PAINE' },
          { value: 'Bod. CAÑETE 2024', label: 'BODEGA CAÑETE' },
          { value: 'Bod. FRUTILLAR 2024', label: 'BODEGA FRUTILLAR' },
          { value: 'Bod. CHOLCHOL 2024', label: 'BODEGA CHOL CHOL' },
          { value: 'Bod. SN FERNANDO 2024', label: 'BODEGA SAN FERNANDO' },
          { value: 'Bodega Soser la dehesa', label: 'BODEGA SOSER DEHESA' },
          { value: 'Implementacion Paine', label: 'IMPLEMENTACIÓN PAINE' },
          { value: 'Bod. RANCAGUA 2024', label: 'BODEGA RANCAGUA' },
          { value: 'Bod. VICTORIA 2024', label: 'BODEGA VICTORIA' },
          { value: 'Implementos usados Paine', label: 'IMPLEMENTOS USADOS PAINE' },
          { value: 'Bod. LOS ANGELES 2024', label: 'BODEGA LOS ANGELES' }
  
   
        ],
        'Clasificacion': [
          { value: 'Congelado', label: 'CONGELADO' },
          { value: 'Carnes congeladas', label: 'CARNES CONGELADAS' },
          { value: 'Abarrote', label: 'ABARROTE' },
          { value: 'Otros', label: 'OTROS' },
          { value: 'Gastos operación', label: 'GASTOS OPERACIÓN' },
          { value: 'Pouch', label: 'POUCH' },
          { value: 'Otros perecibles', label: 'OTROS PERECIBLES' },
          { value: 'Verduras congeladas', label: 'VERDURAS CONGELADAS' },
          { value: 'Pan Envasado', label: 'PAN ENVASADO' },
          { value: 'Productos lacteos', label: 'PRODUCTOS LÁCTEOS' },
          { value: 'Fletes', label: 'FLETES' },
          { value: 'Implementación Menor', label: 'IMPLEMENTACIÓN MENOR' },
          { value: 'Aseo', label: 'ASEO' },
          { value: 'Arcitulos de oficina', label: 'ARTÍCULOS DE OFICINA' },
          { value: 'Activo FIjo', label: 'ACTIVO FIJO' },
          { value: 'Frutas', label: 'FRUTAS' },
          { value: 'Verduras', label: 'VERDURAS' },
          { value: 'Verduras pre-elaboradas', label: 'VERDURAS PRE-ELABORADAS' },
          { value: 'Gasfitería', label: 'GASFITERÍA' },
          { value: 'Huevo', label: 'HUEVO' },
          { value: 'Implementación Mayor', label: 'IMPLEMENTACIÓN MAYOR' },
          { value: 'Pan Envasado', label: 'PAN ENVASADO' },
          { value: 'Insumos Informática', label: 'INSUMOS INFORMÁTICA' },
          { value: 'Pescados congelados', label: 'PESCADOS CONGELADOS' },
          { value: 'Asesorías', label: 'ASESORÍAS' }
  
        ],
        'Razon': [
          { value: 'ALIMENTOS VIDA ESTABLE S.A', label: 'ALIMENTOS VIDA ESTABLE S.A' },
          { value: 'TANONI HNOS', label: 'TANONI HNOS' },
          { value: 'SUPERMERCADO DEL NEUMATICO LTDA', label: 'SUPERMERCADO DEL NEUMATICO LTDA' },
          { value: 'AGUA PURIFICADA KUYEN PREMIUM', label: 'AGUA PURIFICADA KUYEN PREMIUM' },
          { value: 'FRUTOS DEL BOSQUE LTDA', label: 'FRUTOS DEL BOSQUE LTDA' },
          { value: 'EMPRESA DE ALIMENTOS SANOS', label: 'EMPRESA DE ALIMENTOS SANOS' },
          { value: 'BEBIDAS REFRESCANTES S.A.', label: 'BEBIDAS REFRESCANTES S.A.' },
          { value: 'CARNES PREMIUM LTDA', label: 'CARNES PREMIUM LTDA' },
          { value: 'PANADERIA Y PASTELERIA DELICIAS', label: 'PANADERIA Y PASTELERIA DELICIAS' },
          { value: 'CONSERVAS NATURALES S.A.', label: 'CONSERVAS NATURALES S.A.' },
          { value: 'DISTRIBUIDORA DE LACTEOS', label: 'DISTRIBUIDORA DE LACTEOS' },
          { value: 'VINOS Y LICORES SELECTOS', label: 'VINOS Y LICORES SELECTOS' },
          { value: 'PRODUCTOS ORGANICOS CHILE', label: 'PRODUCTOS ORGANICOS CHILE' },
          { value: 'QUESERIA LOS ANDES', label: 'QUESERIA LOS ANDES' },
          { value: 'PESCADOS Y MARISCOS DEL PACIFICO', label: 'PESCADOS Y MARISCOS DEL PACIFICO' },
          { value: 'DULCES Y GOLOSINAS S.A.', label: 'DULCES Y GOLOSINAS S.A.' },
          { value: 'CEREALES Y LEGUMBRES S.A.', label: 'CEREALES Y LEGUMBRES S.A.' },
          { value: 'HELADOS ARTESANALES', label: 'HELADOS ARTESANALES' },
          { value: 'EMBUTIDOS DEL SUR', label: 'EMBUTIDOS DEL SUR' },
          { value: 'FRUTOS SECOS Y DESHIDRATADOS', label: 'FRUTOS SECOS Y DESHIDRATADOS' },
          { value: 'JUGOS NATURALES S.A.', label: 'JUGOS NATURALES S.A.' },
          { value: 'MERKADO VERDE', label: 'MERKADO VERDE' },
          { value: 'CHOCOLATES Y BOMBONES', label: 'CHOCOLATES Y BOMBONES' },
          { value: 'CAFÉ Y TÉ DEL MUNDO', label: 'CAFÉ Y TÉ DEL MUNDO' },
          { value: 'PANIFICADORA EL BUEN PAN', label: 'PANIFICADORA EL BUEN PAN' },
          { value: 'ALIMENTOS GOURMET', label: 'ALIMENTOS GOURMET' },
          { value: 'FRUTERIA LOS POMARES', label: 'FRUTERIA LOS POMARES' },
          { value: 'HORTALIZAS FRESCAS', label: 'HORTALIZAS FRESCAS' },
          { value: 'SUPERMERCADO LA FAMILIA', label: 'SUPERMERCADO LA FAMILIA' },
          { value: 'TIENDA DE ALIMENTOS SALUDABLES', label: 'TIENDA DE ALIMENTOS SALUDABLES' },
          { value: 'PRODUCTOS INTEGRALES', label: 'PRODUCTOS INTEGRALES' },
          { value: 'BODEGA DE CARNES', label: 'BODEGA DE CARNES' },
          { value: 'FABRICA DE PASTAS FRESCAS', label: 'FABRICA DE PASTAS FRESCAS' },
          { value: 'DISTRIBUIDORA DE BEBIDAS', label: 'DISTRIBUIDORA DE BEBIDAS' },
          { value: 'ALMACÉN NATURAL', label: 'ALMACÉN NATURAL' },
          { value: 'SUPERMERCADO DEL CAMPO', label: 'SUPERMERCADO DEL CAMPO' },
          { value: 'BODEGA DE LICORES', label: 'BODEGA DE LICORES' },
          { value: 'TIENDA VEGANA', label: 'TIENDA VEGANA' },
          { value: 'COMIDAS PREPARADAS', label: 'COMIDAS PREPARADAS' },
          { value: 'GALLETERÍA ARTESANAL', label: 'GALLETERÍA ARTESANAL' },
          { value: 'VINOS FINOS S.A.', label: 'VINOS FINOS S.A.' },
          { value: 'GRANJA FRESCA', label: 'GRANJA FRESCA' },
          { value: 'PESCADOS Y MARISCOS DEL MAR', label: 'PESCADOS Y MARISCOS DEL MAR' },
          { value: 'DISTRIBUIDORA DE FRUTAS', label: 'DISTRIBUIDORA DE FRUTAS' },
          { value: 'HORTICULTURA SUSTENTABLE', label: 'HORTICULTURA SUSTENTABLE' },
          { value: 'TIENDA ECOLÓGICA', label: 'TIENDA ECOLÓGICA' },
          { value: 'ALIMENTOS CONGELADOS S.A.', label: 'ALIMENTOS CONGELADOS S.A.' },
          { value: 'PRODUCTOS SIN GLUTEN', label: 'PRODUCTOS SIN GLUTEN' }
          
          
            
        ],
        'ucrea': [
          { value: 'rsalinas', label: 'RODRIGO SALINAS' },
          { value: 'goyarce', label: 'GONZALO OYARCE' },
          { value: 'dvasquez', label: 'DIEGO VAZQUEZ' },
          { value: 'csalazar', label: 'CAROLINA SALAZAR' },
          { value: 'jcastaneda', label: 'JUAN CASTAÑEDA' },
          { value: 'sfernandez', label: 'SEBASTIAN FERNANDEZ' }
  
  
        ]
    };
  
    // Cambiar opciones del filtro según el tipo seleccionado
    filterType.addEventListener('change', () => {
        const selectedFilter = filterType.value;
        const options = filterOptionsMap[selectedFilter] || [];
  
        // Limpiar opciones actuales
        filterOptions.innerHTML = '<option value="">Seleccione una opción</option>';
      
  
        // Agregar nuevas opciones
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            filterOptions.appendChild(opt);
        });
  
        // Mostrar el tercer filtro solo si el primer filtro es 'bodega'
        if (selectedFilter === 'Bodega') {
          additionalFilterContainer.style.display = 'block';
      } else {
          additionalFilterContainer.style.display = 'none';
      }
    });
  
    // Manejar el botón de filtrado
    filterButton.addEventListener('click', async () => {
        // Obtener valores de los filtros y fechas
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const filterTypeValue = filterType.value;
        const filterOptionValue = filterOptions.value;
        const additionalFilterValue = additionalFilter.value
  
        try {
          console.log(additionalFilterValue)
            // Realizar solicitud al servidor con los datos de los filtros y fechas
            const response = await fetch('http://localhost:3000/getData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                    filterType: filterTypeValue,
                    filterOption: filterOptionValue,
                    additionFilter : additionalFilterValue
                })
            });
  
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  
            const result = await response.json();
            console.log(result); // Verifica los datos
              logDocumentDetails(result.data)
  
  
            // Procesar los datos para el gráfico
            const labels = [];
            const values = [];
            const dateDocumentCount = {};
  
            // Contar documentos por fecha y mostrar documentos
            result.data.forEach(item => {
              const date = item.fecha || ''; // Asegúrate de que 'fecha' no sea undefined
              const documentCount = item.documentos ? item.documentos.length : 0; // Maneja posibles valores undefined
  
              // Si la fecha no está en labels, agregarla
              if (!dateDocumentCount[date]) {
                dateDocumentCount[date] = 0;
              }
  
              // Sumar el conteo de documentos a la fecha correspondiente
              dateDocumentCount[date] += documentCount;
  
            });
  
            // Convertir los datos a arrays para Chart.js
            for (const [date, count] of Object.entries(dateDocumentCount)) {
              labels.push(date); // Etiquetas con formato de fecha
              values.push(count);
            }
  
            // Actualizar el gráfico
            myLineChart.data.labels = labels;
            myLineChart.data.datasets[0].data = values;
            myLineChart.update();
  
            displayTable(result.data);
  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
  
    function logDocumentDetails(data) {
        const reasonCounts = {};
        let totalDocuments = 0;
    
        // Contar la cantidad de documentos por Razón
        data.forEach(item => {
            const documentos = item.documentos || [];
            totalDocuments += documentos.length;
    
            documentos.forEach(doc => {
                const razon = doc.Razon || 'N/A'; // Asegurarse de que Razon no sea undefined
                if (!reasonCounts[razon]) {
                    reasonCounts[razon] = 0;
                }
                reasonCounts[razon]++;
            });
        });
    
        // Convertir el objeto reasonCounts a un array de pares [razon, count]
        const sortedReasons = Object.entries(reasonCounts)
            .sort((a, b) => b[1] - a[1]); // Ordenar de mayor a menor
    
        // Generar el HTML para el log
        let logHTML = `
            <p>Total de documentos: ${totalDocuments}</p>
            <ul class="list-group">
        `;
    
        sortedReasons.forEach(([razon, count]) => {
            logHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${razon}
                    <span class="badge text-bg-success rounded-pill">${count}</span>
                </li>
            `;
        });
    
        logHTML += `</ul>`;
    
        // Mostrar el log en el contenedor adecuado
        document.getElementById('logContainer').innerHTML = logHTML;
    }
    
  
  let tableData = [];
  
  // Función para mostrar la tabla
  function displayTable(data) {
    const tableContainer = document.getElementById('dataTableContainer');

    // Crear la tabla HTML
    let tableHTML = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Orden</th>
                    <th>Bodega</th>
                    <th>Clasificación</th>
                    <th>Razón</th>
                    <th>Ucrea</th>
                    <th>Días perdidos</th>
                    <th>Productos faltantes</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Llenar la tabla con los datos
    data.forEach(item => {
        const fecha = item.fecha || 'N/A';
        const documentos = item.documentos || [];

        documentos.forEach(documento => {
            // Determina la clase de la fila según condiciones específicas
            let rowClass = 'low-warning';
            

            tableHTML += `
                <tr class="${rowClass}">
                    <td>${fecha}</td>
                    <td>${documento.Orden}</td>
                    <td>${documento.Bodega || 'N/A'}</td>
                    <td>${documento.Clasificacion || 'N/A'}</td>
                    <td>${documento.Razon || 'N/A'}</td>
                    <td>${documento.ucrea || 'N/A'}</td>
                    <td>${documento.dias_faltantes || 'N/A'}</td>
                    <td>${documento.cantidad_productos_faltantes || 'N/A'}</td>
                </tr>
            `;
        });
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    // Insertar la tabla en el contenedor
    tableContainer.innerHTML = tableHTML;
}
  
  function exportToExcel() {
      console.log(tableData);
  
      // Convertir los datos a formato adecuado
      const ws_data = [
          ['Fecha', 'Orden', 'Bodega', 'Clasificación', 'Razón', 'Ucrea', 'Días perdidos', 'Productos faltantes'],
          ...tableData.flatMap(item => {
              const fecha = item.fecha || 'N/A';
              const documentos = item.documentos || [];
              return documentos.map(doc => [
                  fecha,
                  doc.Orden,
                  doc.Bodega || 'N/A',
                  doc.Clasificacion || 'N/A',
                  doc.Razon || 'N/A',
                  doc.ucrea || 'N/A',
                  doc.dias_faltantes || 'N/A',
                  doc.cantidad_productos_faltantes  || 'N/A'
              ]);
          })
      ];
  
      // Crear la hoja de cálculo
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
  
      // Generar archivo Excel
      XLSX.writeFile(wb, 'datos.xlsx');
  }
  
  
  // Añadir el evento al botón
  
  excel_button.addEventListener('click', exportToExcel);
  
    
  });  var ctx = document.getElementById('myAreaChart').getContext('2d');
  
  var myLineChart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // Etiquetas del eje X
          datasets: [{
              label: 'Datos del Gráfico', // Etiqueta para el dataset
              data: [12, 19, 3, 5, 2, 3], // Datos a mostrar
              borderColor: 'rgba(0, 123, 255, 1)', // Color de la línea
              backgroundColor: 'rgba(202, 160, 249, 0.2)', // Color de fondo de la línea
              borderWidth: 1.5, // Grosor de la línea
              pointRadius: 0, // Establece el radio de los puntos en 0 para ocultarlos
              pointBackgroundColor: 'rgba(202, 160, 249, 1)', // Color de fondo de los puntos
              pointBorderColor: 'rgba(202, 160, 249, 1)', // Color del borde de los puntos
              pointHoverRadius: 0, // Establece el radio de los puntos al pasar el ratón sobre ellos en 0
              pointHoverBackgroundColor: 'rgba(202, 160, 249, 1)', // Color de fondo de los puntos al pasar el ratón sobre ellos
              pointHoverBorderColor: 'rgba(202, 160, 249, 1)', // Color del borde de los puntos al pasar el ratón sobre ellos
              pointBorderWidth: 0 
          }]
      },
      options: {
        scales: {
            x: {
                ticks: {
                    color: 'rgba(64, 64, 64, 1)',
                  
                },
                grid: {
                    color: 'rgba(211, 211, 211, 1)',
                    borderWidth: 1
                }
            },
            y: {
                ticks: {
                    color: 'rgba(64, 64, 64, 1)'
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
      }
    })
  
  