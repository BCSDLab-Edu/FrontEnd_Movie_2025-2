export let isMain = true;
export function setIsMain(val){
	isMain = val;
}


export let isBtn = false;
export function setIsBtn(val){
	isBtn = val;
}

export let page = 1;
export function getPage(){
    return page;
}
export function increasePage(){
	page+=1;
	return page;
}
export function resetPage(){
	page=1;
	return page;
}

export let renderTitle = false;
export function setRenderTitle(val){
    renderTitle = val;
}