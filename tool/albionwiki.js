function p10(x){
  return Math.pow(10, x);
}
function round_(x, n){
  return Math.round(x*p10(n))/p10(n);
}
function albion_short_num(x){
  abs_x = Math.abs(parseInt(x));
  s_x = ""+abs_x;
  round_x = parseInt(s_x.substring(0, 3))*p10(s_x.length-3);

  if (abs_x < p10(3)) s_x = s_x;
  else if (abs_x < p10(6)) s_x = ""+round_x/p10(3)+"k";
  else if (abs_x < p10(9)) s_x = ""+round_x/p10(6)+"m";
  else s_x = ""+round_x/p10(9)+"b";

  if (x < 0) s_x = "-"+s_x;

  return s_x;
}
function show_error(e_input, e_error, STRING){
  e_error.html(STRING);

  var e_window = $(window);
  
  var error_top = -2.5+e_input.offset().top+e_input.height()/2-e_error.height()/2;
  var error_left = e_input.offset().left+e_input.width()/2-e_error.width()/2;
  if (e_input.offset().top-e_window.scrollTop()-e_window.height()/2 >= 0) error_top -= 30;
  else error_top += 30;
  if (e_window.width() >= 1000) error_left -= (e_window.width()-1000)/2;

  $("#main-error").css("top", error_top);
  $("#main-error").css("margin-left", error_left);
  
  if (error_show_id0 != null && error_show_id1 != null){
    window.clearTimeout(error_show_id0);
    window.clearTimeout(error_show_id1);
    $("#main-error").hide();
    $("#main-error").css("opacity", 0);
  }
  $("#main-error").show();
  $("#main-error").animate({"opacity": 1}, 300);
  error_show_id0 = setTimeout((() => $("#main-error").animate({"opacity": 0}, 300)), 4400);
  error_show_id1 = setTimeout((() => $("#main-error").hide()), 6000);
}
function calc_input_check(e_element, MIN, MAX, b_int){
  var x = e_element.val();
  if (x == "") return false;
  if (x >= MIN && x <= MAX && !(b_int && x%1 != 0)) return true;
  e_element.val("");

  var main_error_html = "輸入值必須介於 "+MIN+" ~ "+albion_short_num(MAX);
  if (b_int) main_error_html += "，且為整數";
  
  show_error(e_element, $("#main-error"), main_error_html);
  return false;
}
function checkbox_checked(e_element){
  return e_element.prop("checked");
}
function select_color(e_select, l_color){
  var e_select_i = e_select[0].selectedIndex;
  e_select.css("background-color", l_color[e_select_i]);
  return e_select_i;
}

var url = new URL(window.location.href);
if (url.hash != ""){
  window.onload = function (){
    $(".main-article-title-h2").each(function (){
      if ("#"+$(this).text() == decodeURI(url.hash)) $("html").animate({scrollTop: $(this).offset().top-64}, 500);
    });
  }
}

$(".main-contents")

var error_show_id0 = null, error_show_id1 = null;

var l_color_tier = ["#fff", "#bbb", "#cba", "#8c8", "#8be", "#e99", "#eb8", "#ee8", "#eee"];
var l_color_level = ["#fff", "#eee", "#8f8", "#8ff", "#f8f", "#ff8"];
var l_color_quality = ["#fff", "#bbb", "#bce", "#cba", "#eee", "#fe9"];
var l_color_material = ["#fff", "#eee", "#f88", "#ff8", "#fca", "#faa", "#bdf", "#ffd"];