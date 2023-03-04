function calc1(){
  select_color($("#calc1_tier"), l_color_tier);
  select_color($("#calc1_material"), l_color_material);
  select_color($("#calc1_level"), l_color_level);
  select_color($("#calc1_quality"), l_color_quality);
  
  var tier = parseInt($("#calc1_tier").val());
  var material_ip = parseInt($("#calc1_material").val());
  var level_ip = parseInt($("#calc1_level").val());
  var quality_ip = parseInt($("#calc1_quality").val());
  var skill_ip, e_skill = $("#calc1_skill");
  var b_oc = checkbox_checked($("#calc1_oc"));
  
  var tier_ip = [null, 100, 300, 500, 700, 800, 900, 1000, 1100][tier];
  
  if (calc_input_check(e_skill, 0, 404, true)) skill_ip = parseInt(e_skill.val());
  else skill_ip = 0;
  if (tier <= 3) skill_ip = 0;

  var add = [null, 0, 0, 0, 0, 0.05, 0.1, 0.15, 0.2][tier];
  var add_ip = parseInt(skill_ip*add);

  var oc_ip = 0;
  if (b_oc && tier >= 4) oc_ip = 100;

  $("#calc1_tier_ip").text(tier_ip);
  $("#calc1_material_ip").text(material_ip);
  $("#calc1_level_ip").text(level_ip);
  $("#calc1_quality_ip").text(quality_ip);
  $("#calc1_skill_ip").text(skill_ip);
  $("#calc1_add").text(100*add);
  $("#calc1_add_ip").text(add_ip);
  $("#calc1_oc_ip").text(oc_ip);
  $("#calc1_output").text(tier_ip+material_ip+level_ip+quality_ip+skill_ip+add_ip+oc_ip);
}