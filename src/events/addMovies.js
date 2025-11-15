import { loadMovies } from '../render/loadMovies.js';
import { increasePage } from '../constants/elements.js';
import { isMain } from '../constants/elements.js';

export function addMovies(){
	const plusBtn = document.querySelector('.plus_btn');
	
	plusBtn.addEventListener('click', ()=>{
		if(isMain){
			increasePage();
			loadMovies();
		}
		
	});
}