const funDate = () => {
    const date = new Date();
    const output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0')+ '-' + String(date.getDate()).padStart(2, '0');
    const separ = String(date).split(' ');
    const fecha = output;
    const hora = separ[4];
    const ano = date.getFullYear();
    return {
        fecha,
        hora,
        ano
    }
}
const addHoursToDate=(objDate, intHours)=> {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intHours * 60) * 60000;
    var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
    const output = newDateObj.getFullYear() + '-' + String(newDateObj.getMonth() + 1).padStart(2, '0')+ '-' + String(newDateObj.getDate()).padStart(2, '0');
    return output;
}


module.exports = {
    funDate,
    addHoursToDate
};