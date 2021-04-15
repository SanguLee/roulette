function openTextFile() {
	var input = document.createElement("input");
	input.type="file";
	input.accept = ".rdb";
	input.onchange = function (event) {
        processFile(event.target.files[0]);
    };
    input.click();
}