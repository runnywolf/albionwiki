window.addEventListener("load", calc1);
function calc1(){
  let e_calc1 = new Calc("calc1", "calc1_rate");
  
  let e_point = new CalcInput("calc1_point");
  let e_rate = new CalcOutput("calc1_rate");
  
  e_calc1.defineChange(() => {
    let point = e_point.getInput("int", 0, 1e5, 0);
    
    let rate = round45(1/(2**(point/10000)), 3);
    
    e_rate.print(rate);
  });
  e_calc1.defineClearButton(() => {
    e_point.clearValue();
    e_rate.print("?");
  });
}