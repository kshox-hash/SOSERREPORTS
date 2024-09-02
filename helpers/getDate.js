
function getDate(date){
    const newDate = new Date(date * 1000);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 

    return `${year}-${month}`;
};


module.exports = getDate;