let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

let getInfo =()=>{
    let userInp = document.getElementById('user-inp').value;

    if(userInp.length == 0){
        result.innerHTML = `<h3 class="msg"> The input field cannot be empty</h3>`;
    } 
    else{
        fetch(url + userInp)
        .then((response) => response.json())
        .then((data)=>{
            console.log(data);
            console.log(data.drinks[0]);
           let  myDrink = data.drinks[0];
    
           console.log(myDrink.strDrink);
           console.log(myDrink.strDrinkThumb);
           console.log(myDrink.strInstructions);
    
           let ingredients = [];
           let count = 1;
    
           for(let i in myDrink){
            let ingredient = "";
            let measure = "";
    
            if (i.startsWith("strIngredient")&& myDrink[i]){
                ingredient = myDrink[i];
                if (myDrink ['strMeasure' + count]){
                    measure = myDrink['strMeasure' + count]
                }
                else{
                    measure = "";
                }
                count += 1;
                ingredients.push(`${ingredient} + ${measure}`)
    
            }
           }
           console.log(ingredients)
    
           result.innerHTML = 
            `<h2> ${myDrink.strDrink} </h2>
            <div class= "search-photo">
            <img src =${myDrink.strDrinkThumb}>
            </div>
    
            <h3> Ingredients </h3>
            <ul class="ingredients"></ul>
            <h3> Instructions </h3>
            <p> ${myDrink.strInstructions}</p>`;
    
            let ingredientsCon = document.querySelector(".ingredients");
            ingredients.forEach((item)=>{
                let listItem = document.createElement("li");
                listItem.innerHTML = item;
                ingredientsCon.appendChild(listItem)
            })
           





    }).catch(() =>{
        result.innerHtml = `<h3 class="msg"> Please enter a valid </h3>`;
    })
}
}

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);