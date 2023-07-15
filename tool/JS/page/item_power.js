window.addEventListener("load", calc1);
function calc1(){
  let e_calc1 = new Calc("calc1", []);

  let e_tier = new CalcSelect("calc1_tier");
  let e_material = new CalcSelect("calc1_material");
  let e_enchant = new CalcSelect("calc1_enchant");
  let e_quality = new CalcSelect("calc1_quality");
  let e_skill = new CalcInput("calc1_skill");
  let e_overCharge = new CalcCheckBox("calc1_overCharge");
  let e_tierIP = new CalcOutput("calc1_tierIP");
  let e_materialIP = new CalcOutput("calc1_materialIP");
  let e_enchantIP = new CalcOutput("calc1_enchantIP");
  let e_qualityIP = new CalcOutput("calc1_qualityIP");
  let e_skillIP = new CalcOutput("calc1_skillIP");
  let e_skillBonus = new CalcOutput("calc1_skillBonus");
  let e_skillBonusIP = new CalcOutput("calc1_skillBonusIP");
  let e_overChargeIP = new CalcOutput("calc1_overChargeIP");
  let e_IP = new CalcOutput("calc1_IP");

  e_calc1.defineChange(() => {
    let tier = e_tier.getIndex(); let tierIP = [null, 100, 300, 500, 700, 800, 900, 1000, 1100][tier];
    let materialIP = [null, 0, 25, 25, 50, 75, 75, 100][e_material.getIndex()];
    let enchantIP = [null, 0, 100, 200, 300, 400][e_enchant.getIndex()];
    let qualityIP = [null, 0, 20, 40, 60, 100][e_quality.getIndex()];
    let skillIP = e_skill.getInput("int", 0, 404, 0);
    let isOverCharge = e_overCharge.isCheck();

    if (tier <= 3) skillIP = 0;

    const BONUS = [null, 0, 0, 0, 0, 5, 10, 15, 20][tier];
    let skillBonusIP = parseInt(skillIP*(BONUS/100));

    let overChargeIP = 0;
    if (isOverCharge && tier >= 4) overChargeIP = 100;

    e_tierIP.print(tierIP);
    e_materialIP.print(materialIP);
    e_enchantIP.print(enchantIP);
    e_qualityIP.print(qualityIP);
    e_skillIP.print(skillIP);
    e_skillBonus.print(BONUS);
    e_skillBonusIP.print(skillBonusIP);
    e_overChargeIP.print(overChargeIP);
    e_IP.print(tierIP+materialIP+enchantIP+qualityIP+skillIP+skillBonusIP+overChargeIP);
  });
  e_calc1.defineClearButton(() => {
    e_tier.resetIndex();
    e_material.resetIndex();
    e_enchant.resetIndex();
    e_quality.resetIndex();
    e_skill.setValue("");
    e_overCharge.reset();
    e_tierIP.print("100");
    e_materialIP.print("0");
    e_enchantIP.print("0");
    e_qualityIP.print("0");
    e_skillIP.print("0");
    e_skillBonus.print("0");
    e_skillBonusIP.print("0");
    e_overChargeIP.print("0");
    e_IP.print("100");
  });
}