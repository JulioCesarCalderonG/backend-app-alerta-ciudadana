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


module.exports = {
    funDate
};