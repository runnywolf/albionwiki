window.addEventListener("load", () => {calc1(); calc2();});
function calc1(){
  let e_calc1 = new Calc("calc1", "calc1_damage");

  let e_defend = new CalcInput("calc1_defend");
  let e_damage = new CalcOutput("calc1_damage");

  e_calc1.defineChange(() => {
    let defend = e_defend.getInput("float", -99.99, 100, 0);
    if (defend >= 0) e_damage.print(round45((100-defend)/100, 3));
    else e_damage.print(round45(100/(100+defend), 3));
  });
  e_calc1.defineClearButton(() => {
    e_defend.clearValue();
    e_damage.print("?");
  });
}
function calc2(){
  const a_ATTACK_TYPE = [null, "魔法傷害", "物理傷害", "群體控制"];
  const a_EFFECT = [null, "傷害", "傷害", "群控時間"];

  let e_calc2 = new Calc("calc2", "calc2_rate");

  let e_type = new CalcSelect("calc2_type");
  let e_point = new CalcInput("calc2_point");
  let e_attackType = new CalcOutput("calc2_attackType");
  let e_rate = new CalcOutput("calc2_rate");
  let e_effect = new CalcOutput("calc2_effect");

  e_calc2.defineChange(() => {
    let type = e_type.getIndex();
    let point = e_point.getInput("int", 0, 1e5, 0);
    
    e_attackType.print(a_ATTACK_TYPE[type]);
    e_rate.print(round45(100/(point+100)*100, 2));
    e_effect.print(a_EFFECT[type]);
  });
  e_calc2.defineClearButton(() => {
    e_type.resetIndex();
    e_point.clearValue();
    e_attackType.print(a_ATTACK_TYPE[1]);
    e_rate.print("?");
    e_effect.print(a_EFFECT[1]);
  });
}