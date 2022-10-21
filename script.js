const bill=document.querySelector('.bill');
const tips=document.querySelectorAll('.tip');
const numberOfPeople=document.querySelector('.number');
const tipDisplay=document.querySelector('.tip-display').querySelector('h1');
const totalDisplay=document.querySelector('.total').querySelector('h1');
const peopleMessage=document.querySelector('.peopleMessage');
const billMessage=document.querySelector('.billMessage');

const submit=document.querySelector('button');

let selectedTip=0.15;


// function to check if the inputs  valide

const checkInputsValidty=function (){
    

    // ckeck if the bill input is valid

    if(!bill.checkValidity()){
        billMessage.hidden=false;
        bill.style.border='3px solid red';
        bill.value='';
        return false;
    }
    else {
        billMessage.hidden=true;
        bill.style.border='none';
    }
     
// check if the number of people is valid

    if(!numberOfPeople.checkValidity()){
        peopleMessage.hidden=false;
        numberOfPeople.style.border='3px solid red';
        numberOfPeople.value='';
        return false;
    }
    else {
        peopleMessage.hidden=true;
        numberOfPeople.style.border='none';
    }

// check if the costumise tip is a number

   

   if(!isFinite(selectedTip))
   return false;

   return true;


}


const calculateAndDisplayTipAndTotal=function(){
   if (checkInputsValidty()){
    getPercentageTip();
    const tip=(selectedTip*Number(bill.value)/Number(numberOfPeople.value)).toFixed(2);
    const total=(Number(bill.value)+tip*Number(numberOfPeople.value)).toFixed(2);
    tipDisplay.textContent=`$${tip}`
    totalDisplay.textContent=`$${total}`   
   }


}


// get the tip percentage

const getPercentageTip=function(){

    tips.forEach(tip=>{
        tip.addEventListener('click',()=>{
            if(!tip.classList.contains('Custom'))
           { selectedTip=Number(tip.getAttribute('value'));
           tips.forEach(t=>{
           
            if(!t.classList.contains('Custom'))
         {   t.style.background='var(--Very-dark-cyan)';
            t.style.color=`var(--White)`}

           })
           tip.style.background='var(--Strong-cyan)';
           tip.style.color=`black`
            }
            else{
               selectedTip=Number(tip.textContent)/100
            }
        })
    })

}





const initAll=function(){
    bill.value=`0`;
    numberOfPeople.value=`0`;
    tipDisplay.textContent=`$0`;
    totalDisplay.textContent=`$0`;
    
}




// event listners




submit.addEventListener('click',function(e){
    initAll();
})

const [...inputs]=[bill,numberOfPeople,tips[tips.length-1]]



getPercentageTip();


inputs.forEach(input=>{
    input.addEventListener('input',()=>{
       if(input===tips[tips.length-1]){
        selectedTip=Number(tips[tips.length-1].textContent)/100;
       }
       if(checkInputsValidty()){
        calculateAndDisplayTipAndTotal()
       }
    })

})


tips.forEach(tip=>{
    if(!tip.classList.contains('costum')){
       tip.addEventListener('click',()=>{
        if(checkInputsValidty()){
            calculateAndDisplayTipAndTotal()
           }
       })
    }
})
initAll()