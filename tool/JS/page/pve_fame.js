window.addEventListener("load", calc1);
function calc1(){
  const a_AREA = [null, 2.15, 2.4, 3.3, 4.2];
  const index2tier = [null, [null, 4], [null, 5], [null, 6, 7], [null, 5, 6, 7, 8]];
  const a_TIER = {4:1, 5:1.3333, 6:1.7923, 7:2.285, 8:3.029};
  const a_ENCHANT = [null, 1, 1.2757, 1.6589, 2.1328, 2.7406];

  let e_calc1 = new Calc("calc1", []);

  let e_area1 = new CalcSelect("calc1a_area");
  let e_tier1 = new CalcSelect("calc1a_tier");
  let e_enchant1 = new CalcSelect("calc1a_enchant");
  let e_n1 = new CalcInput("calc1a_n");
  let e_area2 = new CalcSelect("calc1b_area");
  let e_tier2 = new CalcSelect("calc1b_tier");
  let e_enchant2 = new CalcSelect("calc1b_enchant");
  let e_n2 = new CalcInput("calc1b_n");
  let e_const_a2b = new CalcOutput("calc1_const_a2b");
  let e_bonus_a2b = new CalcOutput("calc1_bonus_a2b");
  let e_const_b2a = new CalcOutput("calc1_const_b2a");
  let e_bonus_b2a = new CalcOutput("calc1_bonus_b2a");

  let e_area_setting = {
    1: [
      {"text":"T4", "bgClass":"bg-a0"}
    ],
    2: [
      {"text":"T5", "bgClass":"bg-a1"}
    ],
    3: [
      {"text":"T6", "bgClass":"bg-a2"},
      {"text":"T7", "bgClass":"bg-a2"}
    ],
    4: [
      {"text":"T5", "bgClass":"bg-a3"},
      {"text":"T6", "bgClass":"bg-a3"},
      {"text":"T7", "bgClass":"bg-a3"},
      {"text":"T8", "bgClass":"bg-a3"}
    ]
  };
  e_area1.defineChildSelect(e_tier1, e_area_setting);
  e_area2.defineChildSelect(e_tier2, e_area_setting);

  e_calc1.defineChange(() => {
    function getConst(e_area, e_tier, e_enchant, e_n){
      let areaIndex = e_area.getIndex(); let areaConst = a_AREA[areaIndex];
      let tierIndex = e_tier.getIndex(); let tierConst = a_TIER[index2tier[areaIndex][tierIndex]];
      let enchantConst = a_ENCHANT[e_enchant.getIndex()];
      let n = e_n.getInput("int", 1, 20, 1);
      return areaConst*tierConst*enchantConst/n;
    }
    let c = getConst(e_area2, e_tier2, e_enchant2, e_n2)/getConst(e_area1, e_tier1, e_enchant1, e_n1);
    e_const_a2b.print(round45(c, 3));
    e_bonus_a2b.print((c>=1?"+":"")+round45((c-1)*100, 1));
    e_const_b2a.print(round45(1/c, 3));
    e_bonus_b2a.print((c<=1?"+":"")+round45((1/c-1)*100, 1));
  });
  e_calc1.defineClearButton(() => {
    e_area1.resetIndex();
    e_area1.resetChildSelect(e_tier1, e_area_setting);
    e_enchant1.resetIndex();
    e_n1.setValue("1");
    e_area2.resetIndex();
    e_area2.resetChildSelect(e_tier2, e_area_setting);
    e_enchant2.resetIndex();
    e_n2.setValue("1");
    e_const_a2b.print("1");
    e_bonus_a2b.print("+0");
    e_const_b2a.print("1");
    e_bonus_b2a.print("+0");
  });
}