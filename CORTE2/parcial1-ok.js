//function suma(a,b){
 //   if(typeof a === "number"  && typeof b === "number" ){
      //  return a+b;
   // }
//    console.log( "Error tipo de dato erroneo");
  //   return null;
//}
//console.log(suma(5+10,4));

class Cartesiana {
    #x;
    #y;
    constructor(x,y){
        this.#x=x;
        this.#y=y;
    }
        setx(x){
        this.#x=x;
    }
        sety(y){
        this.#y=y;
    }
    getx(){
        return this.#x;
    }
     gety(){
        return this.#y;
    }
}
const m = new Cartesiana(10,20)
 console.log(m.getx())