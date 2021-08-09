export const toNextPage=(pageNumber, haveNextPage)=>{
	if (!haveNextPage) {
		return pageNumber;
	}
	let pageNum = pageNumber + 1;
	window.scrollTo(0, 0);
	return pageNum
}

export const toPreviousPage=(pageNumber)=>{
	if (pageNumber === 1) {
		return pageNumber;
	}
	let pageNum = pageNumber - 1;
	window.scrollTo(0, 0);
	return pageNum
}