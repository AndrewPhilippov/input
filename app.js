import '../css/components/drop-down-list.scss';

(function () {
    // Helper to remove element
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    };
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(i = this.length - 1; i >= 0; i--) {
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
            if (deleteBtn.classList.contains('visible') && !caret.classList.contains('reverted')) {
                labelInput.style.borderColor = '#818181';
            } else if (selected.classList.contains('open') || deleteBtn.classList.contains('visible')){
                labelInput.style.borderColor = '#1A55F6';
            } else if (!selected.childNodes.length){
                removeSelectedAttribute();
                labelInput.style.borderColor = '#818181';
            }else {
                labelInput.style.borderColor = '#818181';
            }
        } while (targetElement);
        // This is a click outside.
        removeOpenClasses();
        labelToggle();
        if(labelInput.value !== '' && inputValueText.innerHTML !== ''){
            addDeleteClasses();
        } else if (coveredHTMLInput !== ''){
            addDeleteClasses();
            inputValueText.innerHTML = coveredHTMLInput;
        } else {
            labelInput.value = ''
        }
    });

    let i,
        label = document.querySelector( ".label"),
        labelInput = document.querySelector( ".input-text"),
        caret = document.querySelector( ".caret-box"),
        deleteBtn = document.querySelector( ".delete"),
        unselected = document.querySelector(".unselected"),
        lis = unselected.getElementsByTagName('li'),
        selected = document.querySelector(".selected"),
        selectBlock = document.querySelector('.select-block'),
        selectBoxes = document.querySelector('.select-boxes'),
        selectedInputArr = [],
        selectHidden = document.querySelector('.select-hidden'),
        isMultiple = selectHidden.multiple,
        itemsArr = [],
        inputValueText = document.querySelector('.input-value-text'),
        optionsList = document.querySelectorAll('.select-hidden option'),
        coveredHTMLInput = '',
        event = new Event('change');

    for(i = 0; i < optionsList.length; i++){
        itemsArr.push(optionsList[i].textContent);
    }

    labelInput.addEventListener("click", function(){
        if(inputValueText.innerHTML  === '' && labelInput.value === ''){
            addOpenClassesOnInput();
            addDeleteClasses()
        } else if (inputValueText.innerHTML !== ''){
            inputValueText.innerHTML = '';
            addOpenClassesOnInput();
            addDeleteClasses()
        } else {
            toggleOpenClasses();
            addDeleteClasses()
        }
    });
    labelInput.addEventListener('input', function(){
        addOpenClassesOnInput();
        let value = this.value;
        selected.classList.add('open');
        selectBoxes.classList.add('open');
        labelInput.style.borderColor = '#1A55F6';
        let regex = new RegExp(value, "ui");
        let unselectedItems = document.querySelectorAll('.unselected-item');
        let match = [];
        let notMatch = [];

        for(i = 0; i < unselectedItems.length; i++){
            if(regex.test(unselectedItems[i].textContent)){

                match.push(unselectedItems[i]);
            } else {
                notMatch.push(unselectedItems[i]);
            }
        }

        itemsArr = [...match, ...notMatch];
        unselected.childNodes.remove();

        createInnerUnselected(itemsArr);

        liToggle();
    });
    deleteBtn.addEventListener('click', function(e){
        e.preventDefault();
        clearAll();
    });

    createInnerUnselected(itemsArr);
    liToggle();

    function createInnerUnselected(arr){
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
    }
    function liToggleChecked(e){
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
                    for(i = 0; i < selectHidden.childNodes.length; i++){
                        if(selectHidden.childNodes[i].textContent === this.textContent){
                            selectHidden.childNodes[i].setAttribute('selected', 'selected');
                        }
                    }
                    selectHidden.dispatchEvent(event);
                } else {
                    this.classList.remove('selected-item');
                    this.classList.add('unselected-item');
                    unselected.appendChild(this);
                    selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                    for(i = 0; i < selectHidden.childNodes.length; i++){
                        if(selectHidden.childNodes[i].textContent === this.textContent){
                            selectHidden.childNodes[i].removeAttribute('selected');
                        }
                    }
                    selectHidden.dispatchEvent(event);
                }
            } else {
                if(input.checked){
                    selectedInputArr = [];
                    for(i = 0; i < selected.childNodes.length; i++){
                        selected.childNodes[i].childNodes[0].checked = false;
                        unselected.appendChild(selected.childNodes[i]);
                    }
                    this.classList.remove('unselected-item');
                    this.classList.add('selected-item');
                    selected.appendChild(this);
                    selectedInputArr.push(this.textContent);
                    removeSelectedAttribute();
                    for(i = 0; i < selectHidden.childNodes.length; i++){
                        if(selectHidden.childNodes[i].textContent === this.textContent){
                            selectHidden.childNodes[i].setAttribute('selected', 'selected');
                        }
                    }
                    selectHidden.dispatchEvent(event);
                } else {
                    this.classList.remove('selected-item');
                    this.classList.add('unselected-item');
                    unselected.appendChild(this);
                    selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                    for(i = 0; i < selectHidden.childNodes.length; i++){
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

        if(!isMultiple){
            closeLists();
        }

        labelToggle();
    }
    function createInputString(arr){
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
        for(i = 0; i < arr.length; i ++){
            if (arr.length > 2){
                inputValueText.innerHTML = '';
                inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>, <span class="highlighted">${arr[1]}</span>, еще ${itemsRest}`;
            }
        }
        coveredHTMLInput = inputValueText.innerHTML;
    }
    function clearAll(){
        selectedInputArr = [];
        labelInput.value = '';
        inputValueText.innerHTML = '';
        coveredHTMLInput = '';
        selected.childNodes.remove();
        unselected.childNodes.remove();
        label.classList.remove("clicked");
        deleteBtn.classList.remove("visible");
        closeLists();
        createInnerUnselected(itemsArr);
        liToggle();
        removeSelectedAttribute();
    }
    function liToggle(){
        for(i = 0; i < lis.length; i++){
            let li = lis[i];
            li.onclick = liToggleChecked;
        }
    }
    function closeLists(){
        unselected.classList.remove("open");
        selected.classList.remove("open");
        selectBoxes.classList.remove("open");
        caret.classList.remove("reverted");
    }
    function labelToggle(){
        if(inputValueText.innerHTML !== ''){
            label.classList.add('clicked');
            deleteBtn.classList.add('visible');
        } else{
            label.classList.remove('clicked');
            deleteBtn.classList.remove('visible');
        }
    }
    function addOpenClassesOnInput(){
        addDeleteClasses();
        caret.classList.add("reverted");
        unselected.classList.add("open");
        selected.classList.add("open");
        selectBoxes.classList.add("open");
        labelInput.style.borderColor = '#1A55F6';
    }
    function removeOpenClasses(){
        removeDeleteClasses();
        caret.classList.remove("reverted");
        unselected.classList.remove("open");
        selected.classList.remove("open");
        selectBoxes.classList.remove("open");
        labelInput.style.borderColor = '#818181';
    }
    function toggleOpenClasses() {
        label.classList.toggle("clicked");
        deleteBtn.classList.toggle("visible");
        caret.classList.toggle("reverted");
        unselected.classList.toggle("open");
        selected.classList.toggle("open");
        selectBoxes.classList.toggle("open");
    }
    function addDeleteClasses(){
        label.classList.add('clicked');
        deleteBtn.classList.add('visible');
    }
    function removeDeleteClasses(){
        label.classList.remove('clicked');
        deleteBtn.classList.remove('visible');
    }
    function removeSelectedAttribute(){
        for(i = 0; i < selectHidden.children.length; i++){
            selectHidden.children[i].removeAttribute('selected');
        }
        selectHidden.dispatchEvent(event);
    }
})();
