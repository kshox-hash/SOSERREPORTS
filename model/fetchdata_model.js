const db = require('../database/firebase');


class FetchDataModel {
    constructor(){};

    async fecthAllData(){
        const query = db.collection('reporte');

        try {
            //query all data from db;
            const querySnapshot = await query.get();

            if(querySnapshot){
                return querySnapshot;
            } else {
                throw new Error('No data fetching')
            }

        } catch(err){
            console.log(err.message)

        }
    }
}


module.exports = FetchDataModel