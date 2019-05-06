// Helper selector
function $(elem) {
    return document.querySelector(elem);
}
function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className
    }
}
function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}
function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(function(e) {
        return el.addEventListener(e, fn, false);
    });
}
function removeListenerMulti(el, s, fn) {
    s.split(' ').forEach(function(e) {
        return el.removeEventListener(e, fn, false);
    });
}

let label = $( ".label");
let labelInput = $( ".input-brand");
let caret = $( ".caret-box");
let deleteBtn = $( ".delete");
let unselected = $(".unselected");
let lis = unselected.getElementsByTagName('li');
let checkbox = document.querySelectorAll('input[type="checkbox"]');
let selected = $(".selected");
let selectedInputArr = [];
let inputString = '';
labelInput.addEventListener("click", openLists);
labelInput.addEventListener('input', openListsOnType);

function openLists(){
    if(labelInput.value === ''){
        if(labelInput.classList.contains("clicked")){
            addClass(label, 'clicked');
            addClass(caret, 'reverted');
            addClass(deleteBtn, 'visible');
            addClass(unselected, 'open');
            addClass(selected, 'open');
            /*
            label.classList.toggle("clicked");
            caret.classList.toggle("reverted");
            deleteBtn.classList.toggle("visible");
            unselected.classList.toggle("open");
            selected.classList.toggle("open");
            */
        } else {
            label.classList.toggle("clicked");
            caret.classList.toggle("reverted");
            deleteBtn.classList.toggle("visible");
            unselected.classList.toggle("open");
            selected.classList.toggle("open");
        }
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
            this.classList.remove('unselected-item');
            this.classList.add('selected-item');
            selected.appendChild(this);
            selectedInputArr.push(this.textContent);
            console.log(selectedInputArr);
        } else {
            this.classList.remove('selected-item');
            this.classList.add('unselected-item');
            unselected.appendChild(this);
            selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
        }
    } else {
        alert('childNode is not an input');
    }
    createInputString(selectedInputArr);
    labelInput.value = inputString;
    deleteBtn.addEventListener('click', function(){
        console.log('delete was clicked');
        for(let i = 0; i < selected.length; i++){
            console.log(selected.childNodes[i]);
        }
    });
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



createInnerUnselected(itemsArr);
for(let i = 0; i < lis.length; i++){
    let li = lis[i];
    li.onclick = liToggleChecked;
}

/* TODO TEXT HIGHLIGHT
labelInput.addEventListener('input', function(){
    let value = this.value;
    selected.classList.add('open');
    let regex = new RegExp(value, "gi");
    console.log(regex);
    let unselectedItems = document.querySelectorAll('.unselected-item');
    for(let i = 0; i < unselectedItems.length; i++){
        if(regex.test(unselectedItems[i].textContent)){
            console.log(unselectedItems[i].textContent);
        }
    }
});
*/
