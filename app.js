let label = document.querySelector( ".label");
let labelInput = document.querySelector( ".input-brand");
let caret = document.querySelector( ".caret-box");
let deleteBtn = document.querySelector( ".delete");
let unselected = document.querySelector(".unselected");
let selected = document.querySelector(".selected");

labelInput.addEventListener("click", function(){
    if(labelInput.classList.contains("clicked")){
        label.classList.toggle("clicked");
        caret.classList.toggle("reverted");
        deleteBtn.classList.toggle("visible");
    } else {
        label.classList.toggle("clicked");
        caret.classList.toggle("reverted");
        deleteBtn.classList.toggle("visible");
    }
});

let itemsArr = ["Универсал", "Хэтчбэк", "Внедорожник", "Минивэн", "Седан", "Универсал"];

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
        console.log(unselected);
        return unselected;
}

createInnerUnselected(itemsArr);
