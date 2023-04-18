window.addEventListener("load", calc1);
function calc1(){
  const a_NUTRITION = [756, 756, 799, 690, 785, 817, 730];

  let e_calc1 = new Calc("calc1", []);

  let a_e_foodPrice = Array(7).fill(null);
  let a_e_food = Array(7).fill(null);
  for (let i = 0; i < 7; i++){
    a_e_foodPrice[i] = new CalcInput("calc1_food"+i+"_price");
    a_e_food[i] = new CalcOutput("calc1_food"+i);
  }
  
  e_calc1.defineChange(() => {
    let cost, nps, min = 1e6, minIndex = -1;
    for (let i = 0; i < 7; i++){
      cost = a_e_foodPrice[i].getInput("int", 0, 1e5, -1, "");
      if (cost != -1){
        nps = round45(cost/a_NUTRITION[i], 2);
        a_e_food[i].print(nps);
        if (nps < min){
          min = nps;
          minIndex = i;
        }
      }else{
        a_e_food[i].print("-");
      }
    }

    for (let i = 0; i < 7; i++) a_e_food[i].element.style.color = "#000";
    if (minIndex != -1) a_e_food[minIndex].element.style.color = "#00f";
  });
}