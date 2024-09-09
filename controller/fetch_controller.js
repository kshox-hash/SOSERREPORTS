const FetchDataModel = require('../model/fetchdata_model');

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