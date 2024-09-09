const db = require('../database/firebase');


class FetchDataModel {
    constructor(){};

    async fecthAllData(){
        const query = db.collection('reporte');
        try {
            const querySnapShot = await query.get();
    
            if (!querySnapShot.empty) {
                // Asegúrate de devolver el objeto correctamente
                const docs = querySnapShot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return docs;
            } else {
                throw new Error('No data found in the collection');
            }
    
        } catch (err) {
            console.error('Error fetching data:', err);
            throw err;
        }
       
    }
}


module.exports = FetchDataModel