const db = require('../database/firebase');


class FetchDataModel {

    async fecthAllData(){
        const query = db.collection('reporte')
        try {
            const querySnapShot = await query.limit(1).get();
    
            if (!querySnapShot.empty) {
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