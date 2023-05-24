class GraficaAlerta{
     meses=['01','02','03','04','05','06','07','08','09','10','11'];
     valores=[0,0,0,0,0,0,0,0,0,0,0,0];
    constructor(){

    }
    getAlertaGrafica(){
        return[
            {data:this.valores,label:'Boton de Panico'}
        ]
    }
    incrementarValor(mes='',valor=0){
        mes=mes.trim();
        for(let i in this.meses){
            if (this.meses[i]===mes) {
                this.valores[i]+=valor
            }
        }
    }
}