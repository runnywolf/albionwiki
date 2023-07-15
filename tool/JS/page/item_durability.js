window.addEventListener("load", () => {calc1(); calc2();});
function calc1(){
  let e_calc1 = new Calc("calc1", "calc1_pay");

  let e_value = new CalcInput("calc1_value");
  let e_durability = new CalcInput("calc1_durability");
  let e_pay = new CalcOutput("calc1_pay");

  e_calc1.defineRunButton(() => {
    let value = e_value.getInput("int", 0, 1e9, 0);
    let durability = e_durability.getInput("float", 1, 100, 100);

    e_pay.print(albionShortNum(value*(100-durability)*0.165));
  });
  e_calc1.defineClearButton(() => {
    e_value.setValue("");
    e_durability.setValue("");
    e_pay.print("?");
  });
}
function calc2(){
  let e_calc2 = new Calc("calc2", "calc2_pay");

  let e_value = new CalcInput("calc2_value");
  let e_situation = new CalcSelect("calc2_situation");
  let e_pay = new CalcOutput("calc2_pay");

  e_calc2.defineRunButton(() => {
    let value = e_value.getInput("int", 0, 1e9, 0);
    let situation = e_situation.getIndex();

    let durability = [null, 5, 30][situation];
    e_pay.print(albionShortNum(value*durability*0.165));
  });
  e_calc2.defineClearButton(() => {
    e_value.setValue("");
    e_situation.resetIndex();
    e_pay.print("?");
  });
}