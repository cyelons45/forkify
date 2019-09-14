
import axios from 'axios'
import * as conf from '../config'




export default class Search{
    constructor(query){
        this.query=query;
    }
    async waitForRecipe(){
  
        try{
                var key=conf.configuration().key;       
                var proxy=conf.configuration().proxy;
           var recipe=axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)                
           var data=await(recipe)
           this.results=data.data.recipes
        //    console.log(this.results)
            return (this.results)
        }catch(error){
           alert('Error loading data')
        console.log(error)
        }


    }

}