// Helper selector
function $(elem) {
    return document.querySelector(elem);
}
// Helper to remove element
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(let i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};
// Close on outside click event
document.addEventListener("click", (e) => {
    let targetElement = e.target;  // clicked element
    do {
        if (targetElement === selectBlock) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);
    // This is a click outside.
    removeOpenClasses();
    labelToggle();
    if(labelInput.value !== ''){
        label.classList.add('clicked');
        deleteBtn.classList.add('visible');
    }
});

let multiple = true;
let label = $( ".label");
let labelInput = $( ".input-brand");
let caret = $( ".caret-box");
let deleteBtn = $( ".delete");
let unselected = $(".unselected");
let lis = unselected.getElementsByTagName('li');
let checkbox = document.querySelectorAll('input[type="checkbox"]');
let selected = $(".selected");
let selectBlock = $('.select-block');
let selectedInputArr = [];
let inputString = '';
let selectHidden = $('.select-hidden');
let itemsArr = [];

console.log('/________________///________________/');

let optionsList = document.querySelectorAll('.select-hidden option');
for(let i = 0; i < optionsList.length; i++){
    itemsArr.push(optionsList[i].textContent);
}
console.log(itemsArr);
console.log('/++++++++++++++++///++++++++++++++++/');

labelInput.addEventListener("click", function(){
    if(inputString  === '' && labelInput.value === ''){
        toggleOpenClasses();
        label.classList.remove('clicked');
        deleteBtn.classList.remove('visible');
    } else {
        toggleOpenClasses();
        label.classList.add('clicked');
        deleteBtn.classList.add('visible');
    }
});

labelInput.addEventListener('input', addOpenClassesOnInput);
deleteBtn.addEventListener('click', function(e){
    e.preventDefault();
    clearAll();
});
createInnerUnselected(itemsArr);
liToggle();

function createInnerUnselected(arr){

    for(let i = 0; i < arr.length; i++){
        let checkbox = document.createElement("input");
        let label = document.createElement("label");
        let newLi = document.createElement("li");

        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.id = "item["+ i +"]";

        label.setAttribute("for","item["+ i +"]");
        label.innerText = arr[i];

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
        if(multiple){
            if(input.checked){
                this.classList.remove('unselected-item');
                this.classList.add('selected-item');
                selected.appendChild(this);
                selectedInputArr.push(this.textContent);
                for(let i = 0; i < selectHidden.childNodes.length; i++){
                    if(selectHidden.childNodes[i].textContent === this.textContent){
                        selectHidden.childNodes[i].setAttribute('selected', true);
                    }
                }
            } else {
                this.classList.remove('selected-item');
                this.classList.add('unselected-item');
                unselected.appendChild(this);
                selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                for(let i = 0; i < selectHidden.childNodes.length; i++){
                    if(selectHidden.childNodes[i].textContent === this.textContent){
                        selectHidden.childNodes[i].removeAttribute('selected');
                    }
                }
            }
        }
    } else {
        alert('childNode is not an input');
    }
    createInputString(selectedInputArr);
    labelInput.value = inputString;
    labelToggle();
}

function createInputString(arr){
    let itemsRest = arr.length - 2;
    if(arr.length === 1){
        inputString = '';
        inputString += arr[0];
    } else if (arr.length === 2){
        inputString = '';
        inputString += `${arr[0]}, ${arr[1]}`;
    } else {
        inputString = '';
    }
    for(let i = 0; i < arr.length; i ++){
        if (arr.length > 2){
            inputString = '';
            inputString += `${arr[0]}, ${arr[1]}, еще ${itemsRest}`;
        }
    }
}

function clearAll(){
    selectedInputArr = [];
    labelInput.value = '';
    selected.childNodes.remove();
    unselected.childNodes.remove();
    label.classList.remove("clicked");
    deleteBtn.classList.remove("visible");
    closeLists();
    createInnerUnselected(itemsArr);
    liToggle();
}
function liToggle(){
    for(let i = 0; i < lis.length; i++){
        let li = lis[i];
        li.onclick = liToggleChecked;
    }
}

function closeLists(){
    unselected.classList.remove("open");
    selected.classList.remove("open");
    caret.classList.remove("reverted");
}

function labelToggle(){
    if(inputString !== ''){
        label.classList.add('clicked');
        deleteBtn.classList.add('visible');
    } else{
        label.classList.remove('clicked');
        deleteBtn.classList.remove('visible');
    }
}
function addOpenClassesOnInput(){
    label.classList.add("clicked");
    caret.classList.add("reverted");
    deleteBtn.classList.add("visible");
    unselected.classList.add("open");
    selected.classList.add("open");
}

function removeOpenClasses(){
    label.classList.remove("clicked");
    caret.classList.remove("reverted");
    deleteBtn.classList.remove("visible");
    unselected.classList.remove("open");
    selected.classList.remove("open");
}
function toggleOpenClasses() {
    label.classList.toggle("clicked");
    caret.classList.toggle("reverted");
    deleteBtn.classList.toggle("visible");
    unselected.classList.toggle("open");
    selected.classList.toggle("open");
}


labelInput.addEventListener('input', function(){
    let value = this.value;
    selected.classList.add('open');
    let regex = new RegExp(value, "ui");
    // console.log(regex);
    let unselectedItems = document.querySelectorAll('.unselected-item');

    // console.log(unselectedItems);

    // let match =

    // for (let item in unselectedItems) {
    //     if(!regex.test(unselectedItems[item].textContent)){
    //
    //         unselectedItems[item]
    //
    //
    //         console.log(unselectedItems[item].textContent);
    //     }
    // }

    for(let i = 0; i < unselectedItems.length; i++){
        if(regex.test(unselectedItems[i].textContent)){
            // console.log(unselectedItems[i].textContent);

        }
    }
});
/*
* console.log('/________________///________________/');
* console.log('/++++++++++++++++///++++++++++++++++/');
*/
