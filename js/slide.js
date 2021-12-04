var sliderResponsivo = function() {

var slider = document.getElementById("slider");
var larguraSlider = slider.offsetWidth;
var listaSlider = document.getElementById("slideWrap");
var quant = 1;
var items = listaSlider.querySelectorAll("li").length;
var ant = document.getElementById("ant");
var prox = document.getElementById("prox");
    
window.addEventListener('resize', function() {
    larguraSlider = slider.offsetWidth;
});
    
var slideAnterior = function() {
    if(quant > 1) {
    quant = quant - 2;
    listaSlider.style.left = "-" + quant * larguraSlider + "px";
    quant++;
    }
    else if(count = 1) {
    quant = items - 1;
    listaSlider.style.left = "-" + quant * larguraSlider + "px";
    quant++;
    }
};
    
var proximoSlide = function() {
    if(quant < items) {
    listaSlider.style.left = "-" + quant * larguraSlider + "px";
    quant++;
    }
    else if(quant = items) {
    listaSlider.style.left = "0px";
    quant = 1;
  }
};
    
prox.addEventListener("click", function() {
    proximoSlide();
    });
    
ant.addEventListener("click", function() {
    slideAnterior();
});
    
setInterval(function() {
  proximoSlide()
}, 5200);
    
};
    
window.onload = function() {
sliderResponsivo();  
}