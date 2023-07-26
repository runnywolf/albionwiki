class Calc{
  constructor(elementID_calc, elementID_output){
    this.e_calc = get_element(elementID_calc);
    this.e_run = get_element(elementID_calc+"_RUN");
    this.e_clear = get_element(elementID_calc+"_CLEAR");
    this.elementID_output = elementID_output;
    
    this.e_calc.addEventListener("change", (event) => {
      const NAME = event.target.tagName;
      if (NAME === "INPUT" || NAME === "SELECT") this.ifParamChange(elementID_output);
    });
  }
  defineChange(func){
    this.e_calc.addEventListener("change", func);
  }
  defineRunButton(func){
    this.e_run.addEventListener("click", func);
  }
  defineClearButton(func){
    this.e_clear.addEventListener("click", func);
  }

  ifParamChange(outputID){
    if (typeof(outputID) == "string"){
      let e = new CalcOutput(outputID);
      e.print("?");
    }else{
      for (let i of outputID) this.ifParamChange(i);
    }
  }
}
class CalcInput{
  constructor(elementID){
    this.element = get_element(elementID);
    this.elementID = elementID;
  }
  getInput(type, vMin, vMax, returnIfFalse, resetIfFalse=null){
    let s_resetIfFalse = ((resetIfFalse == null)?returnIfFalse:resetIfFalse);

    if (!this.checkInputValue(type, vMin, vMax, s_resetIfFalse)) return returnIfFalse;
    if (type == "int") return parseInt(this.element.value);
    else if (type == "float") return parseFloat(this.element.value);
  }
  setValue(v){
    this.element.value = v;
  }
  clearValue(){
    this.setValue("");
  }

  checkInputValue(type, vMin, vMax, resetIfFalse){
    let vInput = this.element.value;
    if (vInput == ""){
      this.setValue(resetIfFalse);
      return false;
    }
    if (vInput >= vMin && vInput <= vMax && !(type == "int" && vInput%1 != 0)) return true;
    
    this.setValue(resetIfFalse);

    let error = "輸入值必須介於 "+vMin+" ~ "+albionShortNum(vMax);
    if (type == "int") error += "，且為整數";
    showError(this.elementID, error);

    return false;
  }
}
class CalcSelect{
  constructor(elementID){
    this.element = get_element(elementID);
    this.element.addEventListener("change", () => {this.changeColor();});
  }
  getIndex(){
    return this.element.selectedIndex;
  }
  setIndex(i){
    this.element.selectedIndex = i;
    this.changeColor();
  }
  resetIndex(){
    this.setIndex(1);
  }
  resetChildSelect(e_childSelect, setting){
    let a_option = setting[this.getIndex()];
    let s_html = this.element.options[0].outerHTML;
    for (let option of a_option) s_html += "<option class=\""+option["bgClass"]+"\">"+option["text"]+"</option>";
    e_childSelect.element.innerHTML = s_html;
    e_childSelect.changeColor();
  }
  defineChildSelect(e_childSelect, setting){
    this.element.addEventListener("change", () => {this.resetChildSelect(e_childSelect, setting);});
  }

  changeColor(){
    let colorClass = "bg-white";
    let a_optionClass = this.element.children[this.element.selectedIndex].classList
    for (let s_class of a_optionClass) if (s_class.includes("bg-")) colorClass = s_class;
    let a_selectClass = this.element.classList;
    for (let s_class of a_selectClass) if (s_class.includes("bg-")){
      this.element.classList.remove(s_class);
      this.element.classList.add(colorClass);
      return;
    }
  }
}
class CalcCheckBox{
  constructor(elementID){
    this.element = get_element(elementID);
  }
  isCheck(){
    return this.element.checked;
  }
  reset(){
    this.element.checked = false;
  }
}
class CalcOutput{
  constructor(elementID){
    this.element = get_element(elementID);
  }
  print(string){
    this.element.innerText = string;
  }
}

function debug(obj){
  alert("type = "+typeof(obj)+"\nvalue = "+obj);
}
function p10(x){
  return Math.pow(10, x);
}
function round_down(x, n){
  return Math.floor(x*p10(n))/p10(n);
}
function round45(x, n){
  return Math.round(x*p10(n))/p10(n);
}
function albionShortNum(x){
  let abs_x = Math.abs(parseInt(x));
  let s_x = ""+abs_x;
  let round_x = parseInt(s_x.substring(0, 3))*p10(s_x.length-3);

  if (abs_x < 1e3) s_x = s_x;
  else if (abs_x < 1e6) s_x = ""+round_x/1e3+"k";
  else if (abs_x < 1e9) s_x = ""+round_x/1e6+"m";
  else s_x = ""+round_x/1e9+"b";

  if (x < 0) s_x = "-"+s_x;

  return s_x;
}

function get_element(ID){
  return document.getElementById(ID);
}

var showError_divId = "main-error";
var showError_timeId = [null, null];
function showError(inputID, string){
  let e_input = $("#"+inputID);
  let e_error = $("#"+showError_divId);

  e_error.text(string);

  let e_window = $(window);
  
  let error_top = -2.5+e_input.offset().top+e_input.height()/2-e_error.height()/2;
  let error_left = e_input.offset().left+e_input.width()/2-e_error.width()/2;
  if (e_input.offset().top-e_window.scrollTop()-e_window.height()/2 >= 0) error_top -= 30;
  else error_top += 30;
  if (e_window.width() >= 1000) error_left -= (e_window.width()-1000)/2;

  e_error.css("top", error_top);
  e_error.css("margin-left", error_left);
  
  if (showError_timeId[0] != null && showError_timeId[1] != null){
    window.clearTimeout(showError_timeId[0]);
    window.clearTimeout(showError_timeId[1]);
    e_error.hide();
    e_error.css("opacity", 0);
  }
  e_error.show();
  e_error.animate({"opacity": 1}, 300);
  showError_timeId[0] = setTimeout((() => e_error.animate({"opacity": 0}, 300)), 4400);
  showError_timeId[1] = setTimeout((() => e_error.hide()), 6000);
}

var url = new URL(window.location.href);
if (url.hash != ""){
  window.addEventListener("load", () => {
    $(".main-article-title-h2").each(function (){
      if ("#"+$(this).text() == decodeURI(url.hash)) $("html").animate({scrollTop: $(this).offset().top-64}, 500);
    });
  });
}