const funDate = () => {
  const today = new Date();
  const numberOfMlSeconds = today.getTime();
  const addMlSeconds = 1 * 60 * 60000;
  const date = new Date(numberOfMlSeconds - addMlSeconds);
  //const date = new Date();
  const output = date.getFullYear() + "-" +String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  const separ = String(date).split(" ");
  const fecha = output;

  const hora = separ[4]
  const ano = date.getFullYear();
  const mes = String(date.getMonth()+1).padStart(2,0);
  return {
    fecha,
    hora,
    ano,
    mes,
    today,
    date
  };
};

const funDateDos=()=>{
  const currentDateObj = new Date();
  const numberOfMlSeconds = currentDateObj.getTime();
  const addMlSeconds = 1 * 60 * 60000;
  const newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  const fechaAnterior = newDateObj.getFullYear() + "-" +String( newDateObj.getMonth() + 1).padStart(2, "0") + "-" + String( newDateObj.getDate()).padStart(2, "0");
  return {
   fechaAnterior,
   newDateObj
  };
}
const fechaAntes = () => {
  const currentDateObj = new Date();
  const numberOfMlSeconds = currentDateObj.getTime();
  const addMlSeconds = 24 * 60 * 60000;
  const newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  const fechaAnterior = newDateObj.getFullYear() + "-" +String( newDateObj.getMonth() + 1).padStart(2, "0") + "-" + String( newDateObj.getDate()).padStart(2, "0");
  return {
   fechaAnterior
  };
};
const addHoursToDate = (objDate, intHours) => {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intHours * 60 * 60000;
  var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
  const output =
    newDateObj.getFullYear() +
    "-" +
    String(newDateObj.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(newDateObj.getDate()).padStart(2, "0");
  return output;
};

module.exports = {
  funDate,
  addHoursToDate,
  fechaAntes,
  funDateDos
};
