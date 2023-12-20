const MAIN_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrn = document.querySelector(".from select");
const toCurrn = document.querySelector(".to select");
const msg = document.querySelector(".msg");
window.addEventListener("load" , () => {
    updateRate();

});

for(let i of dropdowns){
    for(currenCode in countryList){
        let opt = document.createElement("option");
        opt.value = currenCode;
        opt.innerText = currenCode;
        opt.value = currenCode;
        if(i.name === "from" && currenCode === "USD"){
            opt.selected="selected";
        }
        else if(i.name === "to" && currenCode === "INR"){
            opt.selected="selected";
        }
        i.append(opt);
    };
    i.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};


const updateFlag = (elem) =>{

    // console.log(elem);
    let currenCode = elem.value;
    let countryCode = countryList[currenCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    // elem.parrentElement.querySelector("img");
    elem.parentElement.querySelector("img").src=newSrc;
};

btn.addEventListener("click" ,  (evt) =>{
    evt.preventDefault();
   updateRate();
});

const updateRate =  async () =>{
    let amount = document.querySelector(".amount input");
    let val = amount.value;
     console.log(val);
    if(val === "" || val < 1){
        val = 1;
        amount.value = "1";
    }

    const SUB_URL = `${MAIN_URL}/${fromCurrn.value.toLowerCase()}/${toCurrn.value.toLowerCase()}.json`;
    let response = await fetch(SUB_URL);
    let data = await response.json();
    let rate = data[toCurrn.value.toLowerCase()];
    // console.log(rate);
    // console.log(amount);
    // console.log(val);
    let finalAmount = val * rate;
    console.log(finalAmount);
    msg.innerText = `${val} ${fromCurrn.value} = ${finalAmount} ${toCurrn.value}`;
}


