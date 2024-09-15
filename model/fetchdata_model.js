const db = require('../database/firebase');


class FetchDataModel {

    async fecthAllData(){
        const query = db.collection('reporte').limit(15);
        try {
            const querySnapShot = await query.get();
    
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