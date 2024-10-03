const db = require('../database/firebase');


class FetchDataModel {

    constructor(){};

    async getCustomFiltersData(custom){
        const query = db.collection(custom);
        try {
            const querySnapShot = await query.get();

            if(!querySnapShot.empty){
                const docs = querySnapShot.docs.map((doc) => ({
                    ...doc.data()
                }));

                return docs

            } else {
                throw new Error('not data found in the collection');
            }

        }catch(err){
            console.log(err);
        }
        
    };

    async fecthAllData(){
        const query = db.collection('reporte')
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
       
    };
}


module.exports = FetchDataModel;