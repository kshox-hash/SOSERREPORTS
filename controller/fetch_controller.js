const FetchDataModel = require('../model/fetchdata_model');
const getDate = require('../helpers/getDate');

exports.fetchingData = (req, res) => {
    const fetch = new FetchDataModel();
    try {
            fetch.fecthAllData()
            .then(items => {

                if(items){
                   const data = items.docs.map(doc => ({id : doc.id, ...doc.data()}));
                   const groupData = data.reduce((acc, curr) => {
                        currentValue = getDate(curr.fecha._seconds)
                        
                   },{})

                   //obtener mes : ok
                   //agregar los documentos por mes;
                   //construir archivo json;
                   //enviar archivo json


                   
                } else {
                    res.status(400).send();
                    throw new Error('No data fetching')
                    
                }
            });

    } catch(err){
        console.log(err.message);

    };
 
};