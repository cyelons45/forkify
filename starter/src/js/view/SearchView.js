import {elements} from './base'

export const getInput=()=>elements.searchInput.value


export const highlightSelected=function(id){

    const resultsArray=Array.from(document.querySelectorAll('.results__link'))
    resultsArray.forEach(function(el){
        el.classList.remove('results__link--active')

    })

   document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active')
//    console.log(selected)

}



export const clearInput=()=>{elements.searchInput.value=''}

export const renderLoader=function(parent){
const loader=`
<div class='loader'>
      <svg>
      <use href="img/icons.svg#icon-cw"></use>
      </svg>
</div>

`
parent.insertAdjacentHTML('afterbegin',loader)
}



export const clearLoader=function(){
  
    Array.from(document.querySelectorAll('.loader')).forEach(function(cur){
        cur.innerHTML=''

    })
 
}



export const limitOfTitle=(title,limit=17)=>{
         if(title.length>limit){
        var titleWord= title.split(' ')
        var FormNewTitle=[]
        var sum=0
        for(let word of titleWord){
         sum=sum+(word.length)
         if(sum<=limit){
            FormNewTitle.push(word) 
         }
       
        }
        return (`${FormNewTitle.join(' ')}...`)
      

     }else{
        return title
     }
  


}



export const clearResults=()=>{
        elements.parentNode.innerHTML=''
        elements.searchResPages.innerHTML='' 

 }



function renderRecipe(recipe){
var markup=`
<li class='listItems'>
    <a class=results__link results__link"  href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${limitOfTitle(recipe.title)}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitOfTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`
elements.addToUI.insertAdjacentHTML("beforeend",markup)
}


function createButton(page,type){
var markup=`
<button class="btn-inline results__btn--${type}" data-goto=${type==='prev'? page-1 :page +1}>
<span>Page ${type==='prev'? page-1 :page +1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev'? 'left' : 'right'}"></use>
    </svg>
    
</button>

`
elements.searchResPages.insertAdjacentHTML("afterbegin",markup)
}


function renderButtons(page, numOfResults,resPerPage){
var pages=Math.ceil(numOfResults/resPerPage)
var button;
if(page===1 && pages>1){
    // console.log(`next`)
    button=createButton(page,'next')
//show next button
}else if(page>1 && page<pages){
    // console.log(`prev or next`)
    button=createButton(page,'next')
    button=createButton(page,'prev')
//show both buttons
}else if(pages>1 && page===pages){
    // console.log(`prev`)
// show previous buttons
button=createButton(page,'prev')
}

}





export const renderRecipes=function(data, page=1, resPerPage=10){
    // console.log(data.slice(0,9))
    var start=(page-1) *resPerPage
    var end=(page*resPerPage)
  
    data.slice(start,end).forEach(renderRecipe)
    renderButtons(page,data.length,resPerPage)
}




// export var getInput=elements.searchInput.value
// export const getInput=document.querySelector('.search__field').value
// console.log(getInput)