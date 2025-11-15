import { resetPage } from "../constants/elements";
import { setRenderTitle } from "../constants/elements";

export function inputHandler(onSearch) {
	const input = document.getElementById("input");

	input.addEventListener('keydown',async function(event){
		if(event.key ==='Enter'){
			resetPage();
			setRenderTitle(false);
			let value = input.value.trim();
			if(value){
				await onSearch(value);
				input.value=null;
			}
		}

	})
}

