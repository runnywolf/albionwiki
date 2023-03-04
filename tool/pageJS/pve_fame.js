function calc1_areaTier(ab){
  var e_area = $("#calc1_"+ab+"_area");
  var e_tier = $("#calc1_"+ab+"_tier");

  var area = e_area.val();
  var area_color = {0:"#8bf", 1:"#fe8", 2:"#f99", 3:"#aaa"}[area];
  e_area.css("background-color", area_color);

  var tier_show = {0:[4], 1:[5], 2:[6, 7], 3:[5, 6, 7, 8]}[area];
  e_tier.empty();
  e_tier.append('<option style="background-color:#fff;" disabled>階級</option>');
  tier_show.map(function (i){
    e_tier.append('<option value="'+i+'">T'+i+'</option>');
  });
  e_tier.css("background-color", area_color);
}
function calc1_level(ab){
  var e_level = $("#calc1_"+ab+"_level");

  var level = e_level.val();
  var level_color = {0:"#eee", 1:"#8e8", 2:"#8ee", 3:"#e8e", 4:"#ee8"}[level];
  e_level.css("background-color", level_color);
}
function calc1_n(ab){
  var e_n = $("#calc1_"+ab+"_n");

  if (calc_input_check(e_n, 1, 20, true) == false) e_n.val(1);
}
function calc1_case_clear(ab){
  var e_area = $("#calc1_"+ab+"_area");
  var e_tier = $("#calc1_"+ab+"_tier");
  var e_level = $("#calc1_"+ab+"_level");
  var e_n = $("#calc1_"+ab+"_n");

  e_area.val(0);
  e_area.css("background-color", "#8bf");

  var tier_show = [4];
  e_tier.empty();
  e_tier.append('<option style="background-color:#fff;" disabled>階級</option>');
  e_tier.append('<option value="4">T4</option>');
  e_tier.css("background-color", "#8bf");

  e_level.val(0);
  e_level.css("background-color", "#eee");

  e_n.val(1);
}
function calc1_case_getData(ab){
  var e_area = $("#calc1_"+ab+"_area");
  var e_tier = $("#calc1_"+ab+"_tier");
  var e_level = $("#calc1_"+ab+"_level");
  var n, e_n = $("#calc1_"+ab+"_n");

  var c_area = {0:2.15, 1:2.4, 2:3.3, 3:4.2}[e_area.val()];
  var c_tier = {4:1, 5:1.3333, 6:1.7923, 7:2.285, 8:3.029}[e_tier.val()];
  var c_level = {0:1, 1:1.2757, 2:1.6589, 3:2.1328, 4:2.7406}[e_level.val()];
  if (calc_input_check(e_n, 1, 20, true)) n = parseInt(e_n.val());
  else n = 0;
  
  return c_tier*c_area*c_level/n;
}
function calc1(){
  var e_output_ba = $("#calc1_output_ba");
  var e_output_ab = $("#calc1_output_ab");

  var a = calc1_case_getData("a");
  var b = calc1_case_getData("b");
  
  e_output_ba.text(round_(a/b, 3)+"倍 ("+((a/b-1 >= 0)?"+":"")+round_((a/b-1)*100, 1)+"%)");
  e_output_ab.text(round_(b/a, 3)+"倍 ("+((b/a-1 >= 0)?"+":"")+round_((b/a-1)*100, 1)+"%)");
}
function calc1_clear(){
  var e_output_ba = $("#calc1_output_ba");
  var e_output_ab = $("#calc1_output_ab");

  calc1_case_clear("a");
  calc1_case_clear("b");
  e_output_ba.text("1倍 (+0%)");
  e_output_ab.text("1倍 (+0%)");
}
window.onload = function (){
  calc1_clear();
}