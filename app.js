// Helper selector
let $ = function (selector) {
    return document.querySelector(selector);
};

let label = $( ".label");
let labelInput = $( ".input-brand");
let caret = $( ".caret-box");
let deleteBtn = $( ".delete");
let unselected = $(".unselected");
let lis = unselected.getElementsByTagName('li');
let checkbox = document.querySelectorAll('input[type="checkbox"]');
let selected = $(".selected");
let itemsBox = $(".items-text");
labelInput.addEventListener("click", openLists);
labelInput.addEventListener('input', openListsOnType);

function openLists(){
    if(labelInput.classList.contains("clicked")){
        label.classList.toggle("clicked");
        caret.classList.toggle("reverted");
        deleteBtn.classList.toggle("visible");
        unselected.classList.toggle("open");
        selected.classList.toggle("open");
    } else {
        label.classList.toggle("clicked");
        caret.classList.toggle("reverted");
        deleteBtn.classList.toggle("visible");
        unselected.classList.toggle("open");
        selected.classList.toggle("open");
    }
}
function openListsOnType(){
    label.classList.add("clicked");
    caret.classList.add("reverted");
    deleteBtn.classList.add("visible");
    unselected.classList.add("open");
}

let itemsArr = ["Универсал", "Хэтчбэк", "Внедорожник", "Минивэн", "Седан"];

function createInnerUnselected(arr){

    for(let i = 0; i < arr.length; i++){
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = 1;
        checkbox.id = "item["+ i +"]";
        let label = document.createElement("label");
        label.setAttribute("for","item["+ i +"]");
        label.innerText = arr[i];
        let newLi = document.createElement("li");
        newLi.classList.add("unselected-item");
        newLi.appendChild(checkbox);
        newLi.appendChild(label);
        unselected.appendChild(newLi);
    }
}
function liToggleChecked(e){
    e.preventDefault();
    if(this.childNodes[0].nodeName === 'INPUT') {
        let input = this.childNodes[0];
        input.checked = input.checked !== true; // toggle checkbox

        if(input.checked){
            selected.classList.add('open');
            this.classList.remove('unselected-item');
            this.classList.add('selected-item');
            selected.appendChild(this);
        } else {
            this.classList.remove('selected-item');
            this.classList.add('unselected-item');
            unselected.appendChild(this);
        }
    } else {
        alert('childNode is not an input');
    }
}

/*
function addToInputBox(){
    let selectedItemsInput = document.createElement('div');
    selectedItemsInput.classList.add('selected-item-input');
    selectedItemsInput.textContent = 'Универсал';
    itemsBox.appendChild(selectedItemsInput);

    if(selectedItemsInput.innerText !== ""){
        label.classList.add("clicked");
        caret.classList.add("reverted");
        deleteBtn.classList.add("visible");
    }
}
addToInputBox();
 */
createInnerUnselected(itemsArr);
for(let i = 0; i < lis.length; i++){
    let li = lis[i];
    li.onclick = liToggleChecked;
}
