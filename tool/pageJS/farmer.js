window.addEventListener("load", () => {calc1(); calc2(); calc3();});
function calc1(){
  let e_calc1 = new Calc("calc1", "calc1_point");

  let e_inLevel = new CalcInput("calc1_inLevel");
  let e_outLevel = new CalcInput("calc1_outLevel");
  let e_point = new CalcOutput("calc1_point");

  e_calc1.defineRunButton(() => {
    let inLevel = e_inLevel.getInput("int", 0, 100, 0);
    let outLevel = e_outLevel.getInput("int", 0, 100, 0);

    let point = parseInt(1000/(2**((100*inLevel+200*outLevel)/10000)));

    e_point.print(point);
  });
  e_calc1.defineClearButton(() => {
    e_inLevel.setValue("");
    e_outLevel.setValue("");
    e_point.print("?");
  });
}
function calc2(){
  let e_calc2 = new Calc("calc2", "calc2_earn");

  let e_tier = new CalcSelect("calc2_tier");
  let e_seedPrice = new CalcInput("calc2_seedPrice");
  let e_plot = new CalcInput("calc2_plot");
  let e_sellPrice = new CalcInput("calc2_sellPrice");
  let e_tax = new CalcInput("calc2_tax");
  let e_earn = new CalcOutput("calc2_earn");

  e_calc2.defineRunButton(() => {
    const a_SEED_PRICE = [null, 2000, 3000, 5000, 7500, 10000, 15000, 22500, 30000];

    let tier = e_tier.getIndex();
    let seedPrice = e_seedPrice.getInput("int", 0, 1e6, a_SEED_PRICE[tier]);
    let plot = e_plot.getInput("int", 0, 1e4, 0);
    let sellPrice = e_sellPrice.getInput("int", 0, 1e5, 0);
    let tax = e_tax.getInput("float", 0, 100, 0);
    
    const RETURN_RATE = 1-2000/a_SEED_PRICE[tier];
    let earn = (sellPrice*(1-tax/100)*9 - seedPrice*(1-RETURN_RATE))*9*plot;

    e_earn.print(albionShortNum(earn));
  });
  e_calc2.defineClearButton(() => {
    e_tier.resetIndex();
    e_seedPrice.setValue("");
    e_plot.setValue("");
    e_sellPrice.setValue("");
    e_tax.setValue("");
    e_earn.print("?");
  });
}
function calc3(){
  let e_calc3 = new Calc("calc3", "calc3_earn");

  let e_tier = new CalcSelect("calc3_tier");
  let e_seedPrice = new CalcInput("calc3_seedPrice");
  let e_point = new CalcInput("calc3_point");
  let e_pointPerDay = new CalcInput("calc3_pointPerDay");
  let e_vipCost = new CalcInput("calc3_vipCost");
  let e_earn = new CalcOutput("calc3_earn");

  e_calc3.defineRunButton(() => {
    const a_SEED_PRICE = [null, 2000, 3000, 5000, 7500, 10000, 15000, 22500, 30000];

    let tier = e_tier.getIndex();
    let seedPrice = e_seedPrice.getInput("int", 0, 1e6, a_SEED_PRICE[tier]);
    let point = e_point.getInput("int", 125, 1000, 1000);
    let pointPerDay = e_pointPerDay.getInput("int", 0, 1e6, 0);
    let vipCost = e_vipCost.getInput("int", 0, 1e9, 0);

    const BONUS = 4000/a_SEED_PRICE[tier];
    let earn = albionShortNum(seedPrice*BONUS*(pointPerDay/point) - vipCost/30/10000*pointPerDay);

    e_earn.print(earn);
  });
  e_calc3.defineClearButton(() => {
    e_tier.resetIndex();
    e_seedPrice.setValue("");
    e_point.setValue("");
    e_pointPerDay.setValue("");
    e_vipCost.setValue("");
    e_earn.print("?");
  });
}