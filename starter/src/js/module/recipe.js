import * as conf from '../config'
import axios from 'axios'

var key=conf.configuration().key;       
var proxy=conf.configuration().proxy;


export default class Recipe{
constructor(recipe_id){
    this.recipe_id=recipe_id;
}
async getRecipe(){
    try{
        var results=await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.recipe_id}`)
        this.image_url=results.data.recipe.image_url,
        this.ingredients=results.data.recipe.ingredients,
        this.publisher=results.data.recipe.publisher,
        this.publisher_url=results.data.recipe.publisher_url,
        this.title=results.data.recipe.title
        this.source_url=results.data.recipe.source_url
        // console.log(results)
    }catch(error){
        console.log(error)
        alert('Something went wrong :(')
    }
}
calcTime(){
    const numIng=this.ingredients.length;
    const periods=Math.ceil(numIng/3);
    this.time=periods * 15
}
calcServings(){
    this.servings=4;
}
parseIngredients(){
    const unitslong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds']
    const unitShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound']
    const units=[...unitShort,'kg','g']
    
    const newIngredients=this.ingredients.map(el=>{
        let ingredient=el.toLowerCase();
       
        unitslong.forEach(function(unit,i){
            ingredient=ingredient.replace(unit,unitShort[i])         
        })

         
       ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ')

       const arrIng=ingredient.split(' ');
    
       const unitIndex=arrIng.findIndex((el2)=>units.includes(el2))

       let objIng;
       if(unitIndex>-1){

        const arrCount=arrIng.slice(0,unitIndex)
        let count;
        if(arrCount.length===1){
            count=eval(arrIng[0].replace('-','+'));
           

        } else{
            count=eval(arrIng.slice(0,unitIndex).join('+'))    
        }

        objIng={
            count,
            unit:arrIng[unitIndex],
            ingredient:arrIng.slice(unitIndex+1).join(' ')
        }

       }else if(parseInt(arrIng[0],10)){
        objIng={
            count:parseInt(arrIng[0],10),
            unit:'',
            ingredient:arrIng.slice(1).join(' ')
        }

       }else if(unitIndex===-1){
           objIng={
               count:1,
               unit:'',
               ingredient
           }

       }  
       return objIng
    })
    this.ingredients=newIngredients;
  
}
updateServings (type) {
    // Servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredients.forEach(ing => {
        ing.count *= (newServings / this.servings);
    });

    this.servings = newServings;
}
}






