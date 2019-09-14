import { elements } from "./base";
import {limitOfTitle} from "./SearchView"
// import {elements} from './view/base'

export const toggleLikeBtn=function(isLiked){
    const iconString=isLiked ?"icon-heart" :"icon-heart-outlined"
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`)

}


export const toggleLikeMenu=function(numLikes){
    elements.likesMenu.style.visibility=numLikes>0 ? 'visible' : "hidden"
}


export const renderLike=function(Like){
    var markup=`
    <li>
        <a class="likes__link" href="#${Like.id}">
            <figure class="likes__fig">
                <img src="${Like.img}" alt="${Like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitOfTitle(Like.title)}</h4>
                <p class="likes__author">${Like.author}</p>
            </div>
        </a>
    </li>
    `
elements.likesList.insertAdjacentHTML('beforeend', markup)
}

export const deleteLike=function(id){
    const el=document.querySelector(`.likes_link[href *="${id}"]`).parentElement;
    if(el)el.parentElement.removeChild(el)
}
