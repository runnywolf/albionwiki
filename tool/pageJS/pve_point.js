window.addEventListener("load", calc1);
function calc1(){
  const a_TYPE = ["head", "armor", "shoe", "weapon", "offhand"];
  const a_RATE = [0.025, 0.05, 0.025, 0.1, 0.005];

  let e_calc1 = new Calc("calc1", []);

  let a_e_in = Array(5).fill(null);
  let a_e_out = Array(5).fill(null);
  for (let i = 0; i < 5; i++){
    a_e_in[i] = new CalcCheckBox("calc1_"+a_TYPE[i]+"_in");
    a_e_out[i] = new CalcCheckBox("calc1_"+a_TYPE[i]+"_out");
  }
  let e_auto = new CalcCheckBox("calc1_auto");
  let e_fame = new CalcInput("calc1_fame");
  let e_credits = new CalcOutput("calc1_credits");
  let e_sliver = new CalcOutput("calc1_sliver");

  e_calc1.defineChange(() => {
    let rate = 0;
    for (let i = 0; i < 5; i++){
      if (a_e_in[i].isCheck()) rate += a_RATE[i];
      if (a_e_out[i].isCheck()) rate += a_RATE[i];
    }
    let b_auto = e_auto.isCheck();
    let fame = e_fame.getInput("int", 0, 1e12, 0);
    
    let credits = fame*rate;
    let sliver = 0;
    if (b_auto){
      credits *= 4;
      sliver = parseInt(credits*0.9);
    }
    
    e_credits.print(albionShortNum(credits));
    e_sliver.print(albionShortNum(sliver));
  });
  e_calc1.defineClearButton(() => {
    for (let i = 0; i < 5; i++){
      a_e_in[i].reset();
      a_e_out[i].reset();
    }
    e_auto.reset();
    e_fame.setValue("");
    e_credits.print("0");
    e_sliver.print("0");
  });
}