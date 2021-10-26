import { FetchWrapper } from "./fetch-wrapper";
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";

const form = document.querySelector('#form');
const foodClassification = document.querySelector("#foodClassification");
const result = document.querySelector('#result');
const total = document.querySelector('#total');
const foodName = document.querySelector('#foodName');
const carbohydrates = document.querySelector('#carbohydrates');
const fat = document.queryCommandValue('#fat');
const protein = document.queryCommandValue('#protein');


//////////########## FetchWrapper ###########/////////// 
let body = {
    fields: {
        foodName: {stringValue:foodName.value},
        carbohydrates: {integerValue:carbohydrates.value},
        protein: {integerValue:protein.value},
        fat: {integerValue:fat.value},
    }, 
};
const API = new FetchWrapper(
    "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

let testing = API.post("Adesola01", body);


let json = API.get("Adesola01");
API.get().then((data)=>{
  
   
});


form.addEventListener('submit', function(event){
    event.preventDefault();

//////////####  Get sum of Calories from each food classification ####/////////// 
    let carbsCal = Number.parseInt(form.carbohydrates.value * 4);
    let proCal =  Number.parseInt(form.protein.value * 4);
    let fatCal = Number.parseInt(form.fat.value * 9);
    let newCalories = carbsCal + proCal + fatCal;

    let resultDiv= document.createElement('div');

//////////####  food classification ####/////////// 
    let resultName = document.createElement('div')
    resultName.innerText=`${ form.foodName.value
    }`;
    resultDiv.appendChild(resultName);
    resultDiv.classList.add('todoApp');


//////////####  Get sum of Calories for different food classification ####/////////// 
    let resultL = document.createElement('div')
    resultL.innerText=`${ carbsCal + proCal + fatCal
    } calories`;
    resultDiv.appendChild(resultL);

//////////####  carbohydrates ####/////////// 
        let resultLi = document.createElement('label')
        resultLi.innerText=` Carbohydrate: ${carbsCal/4}g`;
        resultDiv.appendChild(resultLi);
        
//////////####  Protein  ####/////////// 
        let resultLi3 = document.createElement('label')
        resultLi3.innerText=` Protein : ${proCal/4 }g`;
        resultDiv.appendChild(resultLi3);

////////// ####  Fat ####/////////// 
        let resultLi2 = document.createElement('label')
        resultLi2.innerText=` Fat : ${fatCal/9}g `;
        resultDiv.appendChild(resultLi2);

//############################### Chart Area Idea from internet #######################################
    let my_canvas=document.querySelector("#myChart");
    let ctx=my_canvas.getContext("2d");
    let bar_width=40;
    let y_gap=20;  
    let bar_gap=100; 
    let x= 20; 
  
    let data = [
        ['Carbohydrate:', Number.parseInt(form.carbohydrates.value)],
        ['Protein ', Number.parseInt(form.protein.value)],
        [' Fat', Number.parseInt(form.fat.value)],
        
    ];
    let y = my_canvas.height - y_gap ;

    my_canvas.width = data.length * (  bar_gap)  + x ;

    ctx.moveTo(x-5,y);
    ctx.lineTo(my_canvas.width,y); 
    ctx.stroke();

    ctx.shadowColor = '#000000';
    ctx.shadowOffsetX=3;
    ctx.shadowOffsetY=3;
    ctx.shadowBlur = 3;

    /////////// Draw the graph ////////

    for (let i=0;i<data.length;i++){
    // Text on the bottom line 
    ctx.shadowColor = '#ffffff';
    ctx.font = '15px serif'; 
    ctx.textAlign='left';
    ctx.textBaseline='top';
    ctx.fillStyle= '#008cf5';
    ctx.fillText(data[i][0], x, y+5);

    // Coordinate value on the top bar 
    ctx.beginPath();
    ctx.lineWidth = 1;
    let y1 = y-data[i][1]; 
    let x1 = x;    
    ctx.font = '16px serif'; 
    ctx.fillStyle= '#000000';
    ctx.fillText (data [i] [1], x1 , y1 - 20);
    ctx.fillStyle=  [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
    ];

    ctx.fillRect(x1,y1,bar_width,data[i][1]);// Filled bar 

    x = x + bar_gap
    };

//////////########## Post Data FetchWrapper ###########/////////// 
    API.post("Adesola01", {
        fields:{
        foodName: {stringValue:foodName.value},
        carbohydrates: {integerValue:form.carbohydrates.value},
        protein: {integerValue:form.protein.value},
        fat: {integerValue:form.fat.value},
        }, 
    });
    snackbar.show("Food Added Successfully.");


    API.get("Adesola01", {
        fields:{
        foodName: {stringValue:foodName.value},
        carbohydrates: {integerValue:form.carbohydrates.value},
        protein: {integerValue:form.protein.value},
        fat: {integerValue:form.fat.value},
        }, 
    });
    snackbar.show("Food Added Successfully.");

//////////####  Result section ####/////////// 

        result.appendChild(resultDiv);
        
        calories.push(newCalories);
        form.foodName.value = "";
        form.carbohydrates.value = "";
        form.protein.value = "";
        form.fat.value = "";
        render(calories);
        snackbar.show("Food Added Successfully.");


});


//////////####  class method to get sum of food calories ####/////////// 

class foodCalories {
    constructor(calories) {
        this.calories = calories;
    }

    getSumOfCalories() {
        let sum = 0;
        this.calories.forEach(function(calorie){
            sum = sum+calorie
        });
        return sum;
    }

}
let calories = [];

function render(calories) {
    let stats = new foodCalories(calories);

    let total= document.querySelector("#total");
    total.innerHTML = `
    <div> Total calories Logged: ${stats.getSumOfCalories()} Calories </div>
    
    `;
};