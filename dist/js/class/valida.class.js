export class ValidaCadena{
    constructor(campo, valor){
        this.campo = campo;
        this.valor = valor;
        this.patron = this.asignaPatron;
        this.mensaje;
    }
    asignaPatron(){
        if(this.campo === 'nombre'){
            this.patron = /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/;
            this.mensaje = 'Caracter no permitido';
        }else if(this.campo === 'telefono'){
            this.patron = /^\d+[-|\s]*\d*$/;
            this.mensaje = 'Caracter no numerico';
        }
        this.valida();
        return;
    }
    valida(){
        if(!this.patron.test(this.valor))
        {
            setTimeout(()=>{
                alert(this.mensaje);
            },34); 
            return; 
        }
    }
}