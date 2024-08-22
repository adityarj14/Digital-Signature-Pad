let isDrawing = false;
let lastX = 0;
let lastY = 0;
    
const colorpicker = document.getElementById("colorpicker");
const canvascolor = document.getElementById("canvascolor");
const canvas = document.getElementById("mycanvas");
const clearbutton = document.getElementById("clearbutton");
const savebutton = document.getElementById("savebutton");
const fontsize = document.getElementById("fontsize");
const retrievebutton = document.getElementById("retrievebutton");
const ctx = canvas.getContext('2d')

colorpicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup',()=>{
 isDrawing = false;
});

canvascolor.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500)
});

fontsize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
});

clearbutton.addEventListener('click',(e)=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

savebutton.addEventListener('click',()=>{
    localStorage.setItem('canvascontents',canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();

    link.click();
});

retrievebutton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvascontents');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
});