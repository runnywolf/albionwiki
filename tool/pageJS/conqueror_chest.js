window.addEventListener("load", calc1);
function calc1(){
  let e_calc1 = new Calc("calc1", []);

  let e_price = new CalcInput("calc1_price");
  let e_ppp = new CalcOutput("calc1_ppp");
  
  e_calc1.defineChange(() => {
    let price = e_price.getInput("int", 0, 1e6, 9789);
    let ppp = round45(price/150, 2);
    e_ppp.print(ppp);
  });
}