window.addEventListener("load", calc1);
function calc1(){
  const a_ITEM_POINT = [150, 90, 500, 675, 1700, 3400, 675, 90, 500, 675, 1700, 3400, 675, 11250];

  let e_calc1 = new Calc("calc1", []);

  let a_e_price = [];
  let a_e_SPP = [];
  for (let i = 0; i < a_ITEM_POINT.length; i++){
    a_e_price.push(new CalcInput("calc1_i"+i+"_sliver"));
    a_e_SPP.push(new CalcOutput("calc1_i"+i+"_SPP"));
    a_e_SPP[i].print("-");
  }

  e_calc1.defineChange(() => {
    let maxSPP = -1, maxSPPIndex = -1;

    for (let i = 0; i < a_ITEM_POINT.length; i++){
      let sliver = a_e_price[i].getInput("int", 0, 1e7, -1, "");

      if (sliver != -1){
        let SPP = round_down(sliver/a_ITEM_POINT[i], 2);
        a_e_SPP[i].print(SPP);
        if (SPP > maxSPP){
          maxSPP = SPP;
          maxSPPIndex = i;
        }
      }else{
        a_e_SPP[i].print("-");
      }

      a_e_SPP[i].element.style.color = "#000";
    }

    if (maxSPPIndex != -1) a_e_SPP[maxSPPIndex].element.style.color = "#00f";
  });
}