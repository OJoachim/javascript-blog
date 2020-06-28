'use strict';

const titleClickHandler = function(event){
  console.log('Link was clicked!');
  console.log(event);

  /* [1] remove class 'active' from all article links  */

  /* [2] add class 'active' to the clicked link */

  /* [3] remove class 'active' from all articles */
  
  /* [4] get 'href' attribute from the clicked link */

  /* [5] find the correct article using the selector (value of 'href' attribute) */
  
  /* [6] add class 'active' to the correct article */

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}