// const apiKey='4a41cd8fb7475b6fbeb3eb59a924c8eb3705d6d8';
const apiKey='3dc9219baaffc156547946d2';

// const apiURL=`https://api.getgeoapi.com/v2/currency/list?api_key=${apiKey}&format=json`;

const apiURL=`https://v6.exchangerate-api.com/v6/3dc9219baaffc156547946d2/latest/USD`;
// Select the Amount
let theAmount=document.getElementById("amount");

// Select the select from 
let fromCurrencySelected=document.getElementById("fromCurrencySelected");

// Select the select to
let toCurrencySelected=document.getElementById("toCurrencySelected");

// Select transform element
let theTransfromBox=document.querySelector(".transform");

// Select convert byn
let convertBtn=document.getElementById("convert");

// Fetching currency converter API
const getCurrencies=(apiURL) => {
    fetch(apiURL, {
        headers: {Authorization: apiKey},
    }).then((response) => response.json()).then((data) => {
        createCurrencyOptions(Object.keys(data.conversion_rates));
    });
};


// Function to create options
let createCurrencyOptions=(currencies) => {
    currencies.forEach((currency) => {
        // Create option
        fromCurrencySelected.innerHTML+=`
            <option value="${currency}">${currency}</option>
        `;
        toCurrencySelected.innerHTML+=`
            <option value="${currency}">${currency}</option>
        `;
    });
    // Set default option
    fromCurrencySelected.value="EGP";
    toCurrencySelected.value="USD";
};

function swap () {
    // Set default option
    let temp=fromCurrencySelected.value;
    fromCurrencySelected.value=toCurrencySelected.value;
    toCurrencySelected.value=temp;
};

let checkerCurrency=() => {
    let thetransformFrom=fromCurrencySelected.value;
    let thetransformTo=toCurrencySelected.value;
    // Check the input feild
    if(theAmount.value.length!==0) {
        fetch(apiURL, {
            headers: {Authorization: apiKey},
        }).then((response) => response.json()).then((dataRate) => {
            let exchangeRateFrom=dataRate.conversion_rates[thetransformFrom];
            let exchangeRateTo=dataRate.conversion_rates[thetransformTo];
            let theRseult=Number((theAmount.value/exchangeRateFrom)*exchangeRateTo).toFixed(2);
            theTransfromBox.innerHTML=`${theAmount.value} ${thetransformFrom} = ${theRseult} ${thetransformTo}`;
        });
    } else {
        // alert("Please Enter The Amount");
    }
};
// Excute the checkerCurrency when clinking on the convertBtn
convertBtn.addEventListener('click', checkerCurrency);

// Excute the checkerCurrency when clinking on the Enter Button
document.addEventListener('keyup', function (e) {
    if(theAmount.value.length!==0) {
        if(e.key=="Enter") {
            checkerCurrency();
        }
    }
});
getCurrencies(apiURL);


// Dark Mode Part
let darkMode=document.querySelector(".darkmode");

darkMode.addEventListener('click', function () {
    document.querySelector(".currency__container").classList.toggle("dark");

    if(document.querySelector(".currency__container").classList.contains("dark")) {
        document.querySelector(".currency__container img").src='images/pngegg.png';
        document.querySelector(".currency__container img").classList.add('imageResize');
    } else {
        document.querySelector(".currency__container img").src='images/currencyimage.jpg';
        document.querySelector(".currency__container img").classList.remove('imageResize');
    }
});