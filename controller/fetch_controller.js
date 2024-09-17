const FetchDataModel = require('../model/fetchdata_model');
const db = require('../database/firebase')

exports.fetchingData = (req, res) => {
    const fetchDataModel = new FetchDataModel();
    fetchDataModel.fecthAllData()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        });
};


exports.getDataFromDb = async (req, res) => {
    try {
      const { startDate, endDate, filterType, filterOption, additionFilter  } = req.body;
      console.log('Received data:', { startDate, endDate, filterType, filterOption, additionFilter });
  
      let query = db.collection('reporte');
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
  
        // Ajustar el rango de fecha para incluir hasta el final del último día
        end.setHours(23, 59, 59, 999);
  
        query = query.where('fecha', '>=', start)
                     .where('fecha', '<=', end);
      }
  
      if (filterType && filterOption) {
        query = query.where(filterType, '==', filterOption);
      }
  
      if (additionFilter && additionFilter.trim() !== '') {
        query = query.where('Razon', '==', additionFilter);
      }
      
      const snapshot = await query.get();
      const rawData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      // Agrupar los datos por fecha
      const groupedData = rawData.reduce((acc, curr) => {
        const date = new Date(curr.fecha * 1000); // Convertir la fecha de Firestore a JavaScript Date
        const formattedDate = date.toLocaleDateString('es-CL'); // Formato de fecha legible
  
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
  
        acc[formattedDate].push({
          id: curr.id,
          ...curr,
          fecha: formattedDate // Cambiar el formato de la fecha en los datos agrupados
        });
  
        return acc;
      }, {});
  
      // Transformar los datos agrupados en el formato deseado
      const groupedDataArray = Object.entries(groupedData).map(([fecha, docs]) => ({
        fecha,
        documentos: docs
      }));
  
      res.status(200).json({
        data: groupedDataArray,
        filter: {
          filterType,
          filterOption
        }
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  };
  