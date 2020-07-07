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
}


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

const optArticleTagsSelector = '.post-tags .list' 

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('.post'); // przypomnienie: const optArticleSelector = '.post',
  console.log('articles ', optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles) {
    console.log('article: ', article);

    /* find tags wrapper */
	const tagsWraper = article.querySelector(optArticleTagsSelector);
  console.log('tagsWraper: ', tagsWraper);
  
    /* make html variable with empty string */
	let html = '';

    /* get tags from data-tags attribute */
	const articleTags = article.getAttribute('data-tags');
	console.log('articleTags: ', articleTags);
  
    /* split tags into array */
	const articleTagsArray = articleTags.split(' ');
	console.log('tagsTable: ', articleTagsArray);
  
    /* START LOOP: for each tag */
	for(let tag of articleTagsArray){
		console.log('tag: ', tag);

      /* generate HTML of the link */
	  const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
	  console.log('linkHTML: ', linkHTML);

      /* add generated code to html variable */
	  tagsWraper.innerHTML = tagsWraper.inerHTML + linkHTML;
	  console.log('tagsWraper: ', tagsWraper);
	  
	  
    /* END LOOP: for each tag */
	}

    /* insert HTML of all the links into the tags wrapper */
	
  
  /* END LOOP: for every article: */
  }
}

generateTags();


// cz.3b. Akcja po kliknięciu w tag

function tagClickHandler(event){
	
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  	console.log('TAG: ', tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('.list-horizontal a.active');     //  ewent.? ('a.active[href^="#tag-"]') ?

  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks) {

    /* remove class active */
	activeLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  tagLinks = document.querySelector('+(href)+')

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){

    /* add class active */
	tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  

  /* START LOOP: for each link */
  

    /* add tagClickHandler as event listener for that link */
	

  /* END LOOP: for each link */
  
}

addClickListenersToTags();


// cz.4. dodanie listy Rodzaje dań

function generateMeals(){
  const articles = document.querySelectorAll(optArticleSelector); 
  
  for(let article of articles) {
    const mealWraper = article.querySelector('.post-meal');
    console.log('mealsWraper: ', mealWraper);
    
    const meal = article.getAttribute('data-meal');
    console.log('meal: ', meal);
	
    const linkHTML = '<a href="#' + meal + '"><span>' + meal + '</span></a>';
    console.log('linkHTML: ', linkHTML);
      
    mealWraper.innerHTML = mealWraper.inerHTML + linkHTML;
    console.log('mealWraper: ', mealWraper);
  }
}

generateMeals();

// cz.4b. Akcja po kliknięciu w danie (meal)

function mealClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  const href = clickedElement.getAttribute('href');
  const meal = href.replace('#', '');

  const activeLinks = document.querySelectorAll('.post-meal a.active');
  for(let activeLink of activeLinks) {
	activeLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  mealLinks = document.querySelector('+(href)+');

  for(let mealLink of mealLinks){
	mealLink.classList.add('active');
  }
  generateTitleLinks('[data-meal="' + meal + '"');
}

function addClickListenersToMeals(){
 //   
 
}

addClickListenersToMeals();
