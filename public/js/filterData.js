document.addEventListener('DOMContentLoaded', () => {
    const filterType = document.getElementById('filterType');
    const filterOptions = document.getElementById('filterOptions');
    const filterButton = document.getElementById('filterButton');
    const additionalFilter = document.getElementById('additionalFilter');
    const additionalFilterContainer = document.getElementById('additionalFilterContainer');
    const excelButton = document.getElementById('exportButton');

    // Cache para almacenar los datos
    const cache = {
        'bodega': [],
        'clasificacion': [],
        'ucrea': [],
        'razon': [],
    };

    // Opciones de filtro dinámicas
    const filterOptionsMap = {
        'Bodega': [],
        'Clasificacion': [],
        'Razon': [],
        'ucrea': []
    };

    async function fetchCustomFilterData(category) {
        const custom = { category };
        const jsonCustom = JSON.stringify(custom);

        try {
            const response = await fetch('http://localhost:3000/v1/fetch-data-custom-filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonCustom
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            cache[category] = result;

        } catch (err) {
            console.error('Error al obtener datos:', err);
        }
    }

    async function loadCacheData() {
        for (let item in cache) {
            await fetchCustomFilterData(item);
        }
    }

    // Cargar los datos al iniciar
    loadCacheData().then(() => {
        filterOptionsMap['Bodega'] = cache['bodega'].map(item => ({ value: item.Bodega, label: item.Bodega }));
        filterOptionsMap['Clasificacion'] = cache['clasificacion'].map(item => ({ value: item.Clasificacion, label: item.Clasificacion }));
        filterOptionsMap['Razon'] = cache['razon'].map(item => ({ value: item.Razon, label: item.Razon }));
        filterOptionsMap['ucrea'] = cache['ucrea'].map(item => ({ value: item.ucrea, label: item.ucrea }));
    });

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

        // Mostrar el tercer filtro solo si el primer filtro es 'Bodega'
        if (selectedFilter === 'Bodega') {
            additionalFilterContainer.style.display = 'block';
            additionalFilter.innerHTML = '<option value="">Seleccione una opción de razón</option>';
            filterOptionsMap['Razon'].forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.value;
                opt.textContent = option.label;
                additionalFilter.appendChild(opt);
            });
        } else {
            additionalFilterContainer.style.display = 'none';
            additionalFilter.innerHTML = '<option value="">Seleccione una opción</option>'; // Limpiar si no es Bodega
        }
    });

    // Manejar el botón de filtrado
    filterButton.addEventListener('click', async () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const filterTypeValue = filterType.value;
        const filterOptionValue = filterOptions.value;

        // Capturar el valor del tercer filtro
        const additionalFilterValue = additionalFilter.value; // Asegúrate de capturar el valor correctamente
     
        try {
            const response = await fetch('http://localhost:3000/getData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startDate,
                    endDate,
                    filterType: filterTypeValue,
                    filterOption: filterOptionValue,
                    additionalFilter: additionalFilterValue // Asegúrate de usar la variable capturada
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            logDocumentDetails(result.data);
            displayTable(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Función para mostrar detalles
    function logDocumentDetails(data) {
        const reasonCounts = {};
        let totalDocuments = 0;

        data.forEach(item => {
            const documentos = item.documentos || [];
            totalDocuments += documentos.length;

            documentos.forEach(doc => {
                const razon = doc.Razon || 'N/A';
                if (!reasonCounts[razon]) {
                    reasonCounts[razon] = 0;
                }
                reasonCounts[razon]++;
            });
        });

        const sortedReasons = Object.entries(reasonCounts)
            .sort((a, b) => b[1] - a[1]);

        let logHTML = `<p>Total de documentos: ${totalDocuments}</p><ul class="list-group">`;

        sortedReasons.forEach(([razon, count]) => {
            logHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${razon}
                    <span class="badge text-bg-success rounded-pill">${count}</span>
                </li>
            `;
        });

        logHTML += `</ul>`;
        document.getElementById('logContainer').innerHTML = logHTML;
    }
    let tableData = [];
    // Función para mostrar la tabla
    function displayTable(data) {
        tableData = data;
        const tableContainer = document.getElementById('dataTableContainer');
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

        data.forEach(item => {
            const fecha = item.fecha || 'N/A';
            const documentos = item.documentos || [];

            documentos.forEach(documento => {
                let fecha_hoy = new Date();
                let fecha_formateada = new Date(documento.fecha);
                let diferencia_ms = fecha_formateada - fecha_hoy;
                let final_fecha = Math.floor(diferencia_ms / (1000 * 60 * 60 * 24));


                let rowClass = 'low-warning'; // Cambiar según condiciones

                tableHTML += `
                    <tr class="${rowClass}">
                        <td>${fecha}</td>
                        <td>${documento.Orden}</td>
                        <td>${documento.Bodega || 'N/A'}</td>
                        <td>${documento.Clasificacion || 'N/A'}</td>
                        <td>${documento.Razon || 'N/A'}</td>
                        <td>${documento.ucrea || 'N/A'}</td>
                        <td>${final_fecha || 'N/A'}</td>
                        <td>${documento.cantidad_productos_faltantes || 'N/A'}</td>
                    </tr>
                `;
            });
        });

        tableHTML += `</tbody></table>`;
        tableContainer.innerHTML = tableHTML;
    }

    function exportToExcel() {
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

        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Datos');

        XLSX.writeFile(wb, 'datos.xlsx');
    }

    excelButton.addEventListener('click', exportToExcel);

    const ctx = document.getElementById('myAreaChart').getContext('2d');
    const myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Datos del Gráfico',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 255, 204, 0.8)',
                borderWidth: 1.5,
                pointRadius: 0,
                pointBackgroundColor: 'rgba(202, 160, 249, 1)',
                pointBorderColor: 'rgba(202, 160, 249, 1)',
                pointHoverRadius: 4,
                pointHoverBackgroundColor: 'rgba(202, 160, 249, 1)',
                pointHoverBorderColor: 'rgba(202, 160, 249, 1)',
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
