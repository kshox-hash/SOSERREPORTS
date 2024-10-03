const FetchDataModel = require('../model/fetchdata_model');
const db = require('../database/firebase')


exports.gettingCustomFiltersData = (req, res) => {

 const {category}= req.body
 const fetchDataModel = new FetchDataModel();
 fetchDataModel.getCustomFiltersData(category)
 .then(data => {

   res.status(200).json(data)
 })

 .catch(err => res.status(400).json({ message : 'error send data', error : err}))


}

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
      const { startDate, endDate, filterType, filterOption, additionalFilter } = req.body;
      console.log('Received data:', { startDate, endDate, filterType, filterOption, additionalFilter });

      let query = db.collection('reporte');

      // Filtrar por rango de fechas
      if (startDate && endDate) {
          // Si las fechas están en formato 'yyyy-mm-dd', puedes compararlas como strings
          query = query.where('fecha', '>=', startDate)
                       .where('fecha', '<=', endDate);
      }

      // Filtrar por tipo y opción
      if (filterType && filterOption) {
          query = query.where(filterType, '==', filterOption);
      }

      // Filtrar por filtro adicional
      if (additionalFilter) {
          query = query.where('Razon', '==', additionalFilter);
      }

      const snapshot = await query.get();
      const rawData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Agrupar los datos por fecha
      const groupedData = rawData.reduce((acc, curr) => {
          const formattedDate = curr.fecha; // Formato de fecha legible

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

