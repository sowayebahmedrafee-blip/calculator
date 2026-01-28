let display = document.querySelector(".display");
let buttons = document.querySelector(".buttons");

buttons.addEventListener("click", function(e){
    let btn =e.target.closest("button");
    let value = e.target.textContent;
    let operator =["+","×" ,"–","÷"]
    if(!btn) return;
    if(value == "C"){
        display.textContent="0"
        adjustFontSize();
    }else if(value=="DEL"){
        display.textContent=display.textContent.slice(0,-1) || "0"
        adjustFontSize();
    }else if(value=="="){
        let expr = display.textContent.replaceAll("÷","/").replaceAll("×","*").replaceAll("–","-")
        try{
            let result = eval(expr);
            let clean = parseFloat(result.toPrecision(10)).toString()
            display.textContent=clean;

        }catch{
            display.textContent="Error"
        }
        
        
    }else if(value == "."){
        let parts = display.textContent.split(/([\+\–\÷\×])/);
        let lastPart = parts[parts.length - 1];
       if(!lastPart.includes(".")){
        display.textContent +=value;
       }
    }else if(operator.includes(value)){
        let lastChar = display.textContent.slice(-1);
        if(!operator.includes(lastChar)){
            display.textContent += value;
        }
    }else if( value=="%"){
        let parts = display.textContent.split(/([\+\–\÷\×])/);
        let lastThree= parts.slice(-3)
        let [first,op, last]= lastThree;
        let opRp1 = op.replaceAll("÷","/").replaceAll("×","*").replaceAll("–","-")

        if (last==undefined || last==""){
            display.textContent ="Error"
        }else{
            let base= parseFloat(first);
            let percentageNum = parseFloat(last);
            let result;
            if(opRp1==="+" || opRp1==="-"){
                let percentageValue = base * (percentageNum/100);
                result= eval(`${base}${opRp1}${percentageValue}`)
               
            }else{
                result=eval(`${base}${opRp1}(${percentageNum/100})`)
            }
            display.textContent= result;
        }
       
    }
    
    
    else{
        if(display.textContent =="0"){
            display.textContent="";
        }
        if(display.textContent.length >=16) return
        display.textContent += value;
        adjustFontSize();
    }
    
});
function adjustFontSize(){
    let fontSize= 50;
    let lineHeight =65;
    display.style.fontSize= fontSize + "px"
    display.style.lineHeight= lineHeight + "|px"
    if(display.scrollWidth !== display.clientWidth){
        fontSize=(fontSize*display.clientWidth)/display.scrollWidth
        lineHeight=(lineHeight*display.clientHeight)/display.scrollHeight
        display.style.fontSize= fontSize + "px";
        display.style.lineHeight= lineHeight+"px"
    }
}