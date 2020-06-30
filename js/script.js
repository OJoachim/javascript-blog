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

function generateTitleLinks() { //deklaracja

	/* [1] remove contents of titleList */
		
	const titleList = document.querySelector(optTitleListSelector);
	console.log('optTitleListSelector: ', titleList);
			
	titleList.innerHTML = '';

	/* [2] for each article */
		
	const articles = document.querySelectorAll('.post');

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