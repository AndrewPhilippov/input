const DomElementHelper = {
    createInnerUnselected : function (arr){
    let i;
    for(i = 0; i < arr.length; i++){
        let checkbox = document.createElement("input");
        let label = document.createElement("label");
        let newLi = document.createElement("li");

        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.id = "item["+ i +"]";

        label.setAttribute("for","item["+ i +"]");
        if(typeof arr[0] === 'string'){
            label.innerText = arr[i + 1];
        } else {
            label.innerText = arr[i].textContent;
        }

        newLi.classList.add("unselected-item");
        newLi.appendChild(checkbox);
        newLi.appendChild(label);

        unselected.appendChild(newLi);
    }
},
    liToggleChecked : function (e){
        labelInput.value = '';
        e.preventDefault();
        if(this.childNodes[0].nodeName === 'INPUT') {
            let input = this.childNodes[0];
            input.checked = input.checked !== true; // toggle checkbox
            if(isMultiple){
                if(input.checked){
                    this.classList.remove('unselected-item');
                    this.classList.add('selected-item');
                    selected.appendChild(this);
                    selectedInputArr.push(this.textContent);
                    for(let i = 0; i < selectHidden.length; i++) {
                        for(let j = 0; j < selectHidden[i].childNodes.length; j++){
                            if (selectHidden[i].childNodes[j].textContent === this.textContent) {
                                selectHidden[i].childNodes[j].setAttribute('selected', 'selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    }
                } else {
                    this.classList.remove('selected-item');
                    this.classList.add('unselected-item');
                    unselected.appendChild(this);
                    selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                    for(let i = 0; i < selectHidden.length; i++){
                        for(let j = 0; j < selectHidden[i].childNodes.length; j++){
                            if(selectHidden[i].childNodes[j].textContent === this.textContent){
                                selectHidden[i].childNodes[j].removeAttribute('selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    }
                }
            } else {
                if(input.checked){
                    this.selectedInputArr = [];
                    for(let i = 0; i < selected.childNodes.length; i++){
                        selected.childNodes[i].childNodes[0].checked = false;
                        unselected.appendChild(selected.childNodes[i]);
                    }
                    this.classList.remove('unselected-item');
                    this.classList.add('selected-item');
                    selected.appendChild(this);
                    selectedInputArr.push(this.textContent);
                    removeSelectedAttribute();
                    for(let i = 0; i < selectHidden.length; i++) {
                        for (let j = 0; j < selectHidden[i].childNodes.length; j++) {
                            if (selectHidden[i].childNodes[j].textContent === this.textContent) {
                                selectHidden[i].childNodes[j].setAttribute('selected', 'selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    }
                } else {
                    this.classList.remove('selected-item');
                    this.classList.add('unselected-item');
                    unselected.appendChild(this);
                    selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                    for(let i = 0; i < selectHidden.length; i++) {
                        for (let j = 0; j < selectHidden[i].childNodes.length; j++) {
                            if (selectHidden[i].childNodes[j].textContent === this.textContent) {
                                selectHidden[i].childNodes[j].removeAttribute('selected');
                            }
                        }
                    }
                }
            }
        } else {
            alert('childNode is not an input');
        }
        createInputString(selectedInputArr);

        if(!isMultiple){
            closeLists();
        }

        labelToggle();
    },
    createInputString :function (arr){
        let itemsRest = arr.length - 2;
        if(arr.length === 1){
            inputValueText.innerHTML = '';
            inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>`;
        } else if (arr.length === 2){
            inputValueText.innerHTML = '';
            inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>, <span class="highlighted">${arr[1]}</span>`;
        } else {
            inputValueText.innerHTML = '';
        }
        for(let i = 0; i < arr.length; i ++){
            if (arr.length > 2){
                inputValueText.innerHTML = '';
                inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>, <span class="highlighted">${arr[1]}</span>, еще ${itemsRest}`;
            }
        }
        this.coveredHTMLInput = inputValueText.innerHTML;
    },
    clearAll: function(){
        this.selectedInputArr = [];
        labelInput.value = '';
        inputValueText.innerHTML = '';
        this.coveredHTMLInput = '';
        selected.childNodes.remove();
        unselected.childNodes.remove();
        label.classList.remove("clicked");
        deleteBtn.classList.remove("visible");
        closeLists();
        createInnerUnselected(itemsArr);
        liToggle();
        removeSelectedAttribute();
    },
    liToggle : function(){
        for(let i = 0; i < lis.length; i++){
            let li = lis[i];
            li.onclick = liToggleChecked;
        }
    },
    closeLists : function(){
        unselected.classList.remove("open");
        selected.classList.remove("open");
        selectBoxes.classList.remove("open");
        caret.classList.remove("reverted");
    },
    labelToggle : function(){
        if(inputValueText.innerHTML !== ''){
            label.classList.add('clicked');
            deleteBtn.classList.add('visible');
        } else{
            label.classList.remove('clicked');
            deleteBtn.classList.remove('visible');
        }
    },
    addOpenClassesOnInput : function(){
        addDeleteClasses();
        caret.classList.add("reverted");
        unselected.classList.add("open");
        selected.classList.add("open");
        selectBoxes.classList.add("open");
        labelInput.style.borderColor = '#1A55F6';
    },
    removeOpenClasses : function(){
        removeDeleteClasses();
        caret.classList.remove("reverted");
        unselected.classList.remove("open");
        selected.classList.remove("open");
        selectBoxes.classList.remove("open");
        labelInput.style.borderColor = '#818181';
    },
    toggleOpenClasses : function() {
        label.classList.toggle("clicked");
        deleteBtn.classList.toggle("visible");
        caret.classList.toggle("reverted");
        unselected.classList.toggle("open");
        selected.classList.toggle("open");
        selectBoxes.classList.toggle("open");
    },
    addDeleteClasses : function(){
        label.classList.add('clicked');
        deleteBtn.classList.add('visible');
    },
    removeDeleteClasses : function(){
        label.classList.remove('clicked');
        deleteBtn.classList.remove('visible');
    },
    removeSelectedAttribute : function(){
        for(let i = 0; i < selectHidden.length; i++){
            for(let j = 0; j < selectHidden[i].children.length; j++){
                selectHidden[i][0].children[j].removeAttribute('selected');
            }
            selectHidden[i][0].dispatchEvent(event);
        }
    },
};

export default DomElementHelper;
