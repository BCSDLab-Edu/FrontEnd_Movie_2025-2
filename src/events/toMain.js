import { mainContainer, loadMovies } from "../render/loadMovies.js";
import { resetPage, setIsBtn, isMain, setIsMain, setRenderTitle } from "../constants/elements.js";
import { btnContainer } from "../render/loadMovies.js";

export function toMain(){
    const logo = document.querySelector('.logo_container');
    logo.addEventListener('click',()=>{
		if(!isMain){
			btnContainer.innerHTML = '';
			mainContainer.innerHTML='';
			setRenderTitle(false);
			setIsBtn(false);
			resetPage();
			loadMovies();
			setIsMain(true);
		}
	})
}