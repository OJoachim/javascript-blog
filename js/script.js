'use strict';

const titleClickHandler = function(event) {
  event.preventDefault();
  	const clickedElement = this;
  	console.log('Link was clicked!');
  console.log(event);

  	/* [1] remove class 'active' from all article links  */

  	const activeLinks = document.querySelectorAll('.titles a.active');

  	for(let activeLink of activeLinks) {
    	activeLink.classList.remove('active');
  	}

  	/* [2] add class 'active' to the clicked link */

  	clickedElement.classList.add('active');
  	console.log('clickedLink: ', clickedElement);

  	/* [3] remove class 'active' from all articles */
  
  	const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles) {
  		activeArticle.classList.remove('active');
  }

  	/* [4] get 'href' attribute from the clicked link */
  
  	const articleSelector = clickedElement.getAttribute('href');

  	/* [5] find the correct article using the selector (value of 'href' attribute) */
  
  	const targetArticle = document.querySelector(articleSelector);
  	console.log(targetArticle);

  	/* [6] add class 'active' to the correct article */
  
  targetArticle.classList.add('active');
};


/* 2 część skryptu - chcemy generować nową listę linków po każdym kliknięciu tagu lub autora */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = '') { //deklaracja

  /* [1] remove contents of titleList */
		
  const titleList = document.querySelector(optTitleListSelector);
  console.log('optTitleListSelector: ', titleList);
			
  titleList.innerHTML = '';

  /* [2] for each article */
		
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles) {
    console.log('article: ', article);

    /* [-2a-] get the article id */
		
    const articleId = article.getAttribute('id');
    console.log('articleId: ', articleId);

    /* [-2b-] find the title element & get the title from the title element */
		
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [-2c-] create HTML of the link & insert link into titleList */
		
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    	titleList.innerHTML = titleList.innerHTML + linkHTML;
  }


  const links = document.querySelectorAll('.titles a');

  for(let link of links) {
  		link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks(); // wywołanie



// 3. część zadania, generowanie listy tagów;

const optArticleTagsSelector = '.post-tags .list-horizontal' 

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  
  for(let article of articles) {

    /* find tags wrapper */
	const tagsWraper = article.querySelector(optArticleTagsSelector);
  
    /* make html variable with empty string */
	let html = '';

    /* get tags from data-tags attribute */
	const articleTags = article.getAttribute('data-tags');
	console.log('articleTags: ', articleTags);
  
    /* split tags into array */
	const articleTagsArray = articleTags.split(' ');
	console.log('tagsTable: ', articleTagsArray);
    
	for(let tag of articleTagsArray){
		console.log('tag: ', tag);
      
	  const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
	  console.log('linkHTML: ', linkHTML);

	  tagsWraper.innerHTML = tagsWraper.innerHTML + linkHTML;
	  console.log('tagsWraper: ', tagsWraper);
	}
  }
}
generateTags();


// cz.3b. Akcja po kliknięciu w tag

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  	console.log('TAG: ', tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  
  for(let activeLink of activeLinks) {
	activeLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  tagLinks = document.querySelector('+(href)+');

  for(let tagLink of tagLinks){
	tagLink.classList.add('active');
  } 

  function addClickListenersToTags(){
    /* find all links to tags */    
    const links = document.querySelectorAll('.list-horizontal');
    for(let link of links) {
	  link.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToTags();
  
 /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');  
}


// cz.4. dodanie listy Rodzaje dań

function generateMeal(){
  const articles = document.querySelectorAll(optArticleSelector); 
  
  for(let article of articles) {
	const mealWraper = article.querySelector('.post-meal'); // meals wrapper
	const meal = article.getAttribute('data-meal');
	const linkHTML = '<a href="#' + meal + '"><span>' + meal + '</span></a>';
	mealWraper.innerHTML = mealWraper.innerHTML + linkHTML;
  }
}
generateMeal();

// cz.4b. Akcja po kliknięciu w danie (meal)

function mealClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ', href);

  /* make a new constant "meal" and extract tag from the "href" constant */
  const meal = href.replace('#', '');

  const activeLinks = document.querySelectorAll('.post-meal a.active');
  for(let activeLink of activeLinks) {
	activeLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  mealLinks = document.querySelector('+ href +');
  
  for(let mealLink of mealLinks){  //LOOP: for each found tag link
	mealLink.classList.add('active');
  }

  function addClickListenersToMeal(){  
    const links = document.querySelectorAll('.post-meal');
    for(let link of links) {
  		link.addEventListener('click', tagClickHandler);
    }
  }
  addClickListenersToMeal();

  generateTitleLinks('data-meal="' + meal + '"');  
}