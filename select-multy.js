import '../css/components/drop-down-list.scss';

const DropDownList = {
    init : function(nodeId) {
        const wrapper = '.form-group.field-' + nodeId + ' ';
        let selectHidden = document.querySelectorAll(wrapper + '.select-hidden')[0],
            selectedText = selectHidden.querySelectorAll('option[selected]');

        // Helper to remove element
        Element.prototype.remove = function () {
            this.parentElement.removeChild(this);
        };
        NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
            for (i = this.length - 1; i >= 0; i--) {
                if (this[i] && this[i].parentElement) {
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
                } else if (selected.classList.contains('open') || deleteBtn.classList.contains('visible')) {
                    labelInput.style.borderColor = '#1A55F6';
                    // if(isMultiple){
                    //     for(i of selectedText){
                    //         selectedInputArr.push(i.textContent);
                    //     }
                    // }
                } else if (!selected.childNodes.length) {
                    clearChecked();
                    labelInput.style.borderColor = '#818181';
                } else {
                    labelInput.style.borderColor = '#818181';
                }
            } while (targetElement);
            // This is a click outside.
            removeOpenClasses();
            labelToggle();
            if (labelInput.value !== '' && inputValueText.innerHTML !== '') {
                addDeleteClasses();
            } else if (coveredHTMLInput !== '') {
                addDeleteClasses();
                labelInput.value = '';
                inputValueText.innerHTML = coveredHTMLInput;
            } else {
                labelInput.value = '';
            }
        });

        let i,
            label = document.querySelector(wrapper + '.label'),
            labelInput = document.querySelector(wrapper + '.input-text'),
            caret = document.querySelector(wrapper + '.caret-box'),
            deleteBtn = document.querySelector(wrapper + '.delete'),
            unselected = document.querySelector(wrapper + '.unselected'),
            selected = document.querySelector(wrapper + '.selected'),
            selectBlock = document.querySelector(wrapper + '.select-block'),
            selectBoxes = document.querySelector(wrapper + '.select-boxes'),
            selectedInputArr = [],
            isMultiple = !selectHidden.multiple,
            itemsArr = {},
            inputValueText = document.querySelector(wrapper + '.input-value-text'),
            optionsList = document.querySelectorAll(wrapper + 'option'),
            coveredHTMLInput = '',
            event = new Event('change'); // ПЕРЕМЕННЫЕ ТУТ

        labelInput.addEventListener("click", function () {
            onInitialClick();
        });
        labelInput.addEventListener('input', function () {
            addOpenClassesOnInput();
            let value = this.value;
            selected.classList.add('open');
            selectBoxes.classList.add('open');
            labelInput.style.borderColor = '#1A55F6';
            let regex = new RegExp(value, "ui");
            let match = {};
            let notMatch = {};

            for (i = 0; i < unselected.childNodes.length; i++) {
                let item = unselected.childNodes[i];
                let text = item.querySelector('label').textContent;
                if (regex.test(text)) {
                    match[item.querySelector('input').value] = text;
                } else {
                    notMatch[item.querySelector('input').value] = text;
                }
            }

            unselected.innerHTML = '';
            createInnerUnselected(match);
            createInnerUnselected(notMatch);
            liToggle();
        });
        deleteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            clearAll();
            clearChecked();
        });

        clearAll();
        setInitialString();

        function createInnerUnselected(arr) {

            let selectedItems = [];
            let selectedValues = [];
            for (let selectedItem of selectedText) {
                selectedItems.push(selectedItem.textContent);
                selectedValues.push(selectedItem.value);
            }

            for (i = 0; i < selectedValues.length; i++) { // ПРОСТАВЛЯЕМ SELECTED в selectHidden
                let option = selectHidden.querySelector('option[value="' + selectedValues[i] + '"]');
                option.setAttribute('selected', 'selected');
            }

            for (i in arr) { // СОЗДАЕМ ВНУТРЕННИЕ li
                let selectedItem = (-1 !== selectedValues.indexOf(i));

                // if (selectHidden.getAttribute('id') === 'buyoutapplicationform-brand_id') {
                //     // console.log(i, arr[i], selectedValue, selectedItem);
                // }
                let checkbox = document.createElement("input");
                let label = document.createElement("label");
                let newLi = document.createElement("li");

                checkbox.type = "checkbox";
                if (selectedItem) {
                    checkbox.checked = true;
                }
                checkbox.value = i;
                checkbox.id = "item[" + i + "]";

                label.setAttribute("for", "item[" + i + "]");

                label.innerText = arr[i];
                let hasHex = /\b[0-9A-F]{6}\b/gi;

                if(arr[i].match(hasHex)){
                    let isMatching = arr[i].match(hasHex);
                    let itemColor = `#${isMatching}`;
                    let cleanString = arr[i].split(' ');
                    label.innerHTML = `<span style="background-color: ${itemColor}"></span> ${cleanString[0]}`;
                }

                if(checkbox.checked){
                    newLi.classList.add("selected-item");
                } else {
                    newLi.classList.add("unselected-item");
                }
                newLi.appendChild(checkbox);
                newLi.appendChild(label);
                if(label.childNodes.length > 1){
                    label.parentNode.classList.add('color-li');
                }
                if(label.textContent !== ''){
                    if(checkbox.checked){
                        selected.appendChild(newLi);
                    } else {
                        unselected.appendChild(newLi);
                    }
                }
            }
        }
        function clearChecked(){
            for(i of selected.childNodes){
                i.childNodes[0].checked = false;
                unselected.appendChild(i);
                if(selectedText[0].textContent === i.textContent){
                    selectedText[0].removeAttribute('selected');
                }
            }
        }
        function liToggleChecked(e) {
            labelInput.value = '';
            e.preventDefault();
            if (this.childNodes[0].nodeName === 'INPUT') {
                let input = this.childNodes[0];
                input.checked = input.checked !== true; // toggle checkbox
                if (isMultiple) {
                    if (input.checked) {
                        this.classList.remove('unselected-item');
                        this.classList.add('selected-item');
                        selected.appendChild(this);
                        selectedInputArr.push(this.textContent);
                        for (i = 0; i < selectHidden.children.length - 1; i++) {
                            console.log(selectHidden.children[i]);
                            if (selectHidden.children[i].textContent === this.textContent
                                || ` ${selectHidden.children[i].textContent.split(" ")[0]}` === this.textContent) {
                                selectHidden.children[i].setAttribute('selected', 'selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    } else {
                        this.classList.remove('selected-item');
                        this.classList.add('unselected-item');
                        unselected.appendChild(this);
                        selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                        for (i = 0; i < selectHidden.children.length - 1; i++) {
                            if (selectHidden.children[i].textContent === this.textContent
                                || ` ${selectHidden.children[i].textContent.split(" ")[0]}` === this.textContent) {
                                selectHidden.children[i].removeAttribute('selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    }
                } else {

                    removeSelectedAttribute();
                    clearChecked();
                    if (input.checked) {

                        selectHidden.querySelector('option[value="' + input.value + '"]').setAttribute('selected', 'selected');
                        selectedText = selectHidden.querySelectorAll('option[selected]');

                        selectedInputArr = [];
                        for (i = 0; i < selected.childNodes.length; i++) {
                            selected.childNodes[i].childNodes[0].checked = false;
                            unselected.appendChild(selected.childNodes[i]);
                        }
                        this.classList.remove('unselected-item');
                        this.classList.add('selected-item');
                        selected.appendChild(this);
                        selectedInputArr.push(this.textContent);
                        for (i = 0; i < selectHidden.children.length - 1; i++) {
                            if (selectHidden.children[i].textContent === this.textContent
                                || ` ${selectHidden.children[i].textContent.split(" ")[0]}` === this.textContent) {
                                selectHidden.children[i].setAttribute('selected', 'selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    } else {
                        this.classList.remove('selected-item');
                        this.classList.add('unselected-item');
                        unselected.appendChild(this);
                        selectedInputArr.splice(selectedInputArr.indexOf(this), 1);
                        for (i = 0; i < selectHidden.children.length - 1; i++) {
                            if (selectHidden.children[i].textContent === this.textContent
                                || ` ${selectHidden.children[i].textContent.split(" ")[0]}` === this.textContent) {
                                selectHidden.children[i].removeAttribute('selected');
                            }
                        }
                        selectHidden.dispatchEvent(event);
                    }
                }
            } else {
                alert('childNode is not an input');
            }
            createInputString(selectedInputArr);

            if (!isMultiple) {
                closeLists();
            }

            labelToggle();
        }
        function createInputString(arr) {
            console.log(arr);
            arr.sort();
            let itemsRest = arr.length - 2;
            if (arr.length === 1) {
                inputValueText.innerHTML = '';
                if(!isMultiple){
                    inputValueText.innerHTML = `<span>${arr[0]}</span>`;
                } else {
                    inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>`;
                }
            } else if (arr.length === 2) {
                inputValueText.innerHTML = '';
                inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>, <span class="highlighted">${arr[1]}</span>`;
            } else {
                inputValueText.innerHTML = '';
            }
            for (i = 0; i < arr.length; i++) {
                if (arr.length > 2) {
                    inputValueText.innerHTML = '';
                    inputValueText.innerHTML = `<span class="highlighted">${arr[0]}</span>, <span class="highlighted">${arr[1]}</span>, еще ${itemsRest}`;
                }
            }
            coveredHTMLInput = inputValueText.innerHTML;
        }
        function clearAll() {
            itemsArr = [];
            selectedInputArr = [];
            labelInput.value = '';
            inputValueText.innerHTML = '';
            coveredHTMLInput = '';
            selected.innerHTML = '';
            unselected.innerHTML = '';
            label.classList.remove("clicked");
            deleteBtn.classList.remove("visible");
            closeLists();
            liToggle();
            removeSelectedAttribute();
            generateItemsArr(optionsList);
            createInnerUnselected(itemsArr);
        }
        function onInitialClick(){
            itemsArr = [];
            liToggle();
            if (inputValueText.innerHTML === '' && labelInput.value === '') {
                addOpenClassesOnInput();
                addDeleteClasses();
            } else if (inputValueText.innerHTML !== '') {
                inputValueText.innerHTML = '';
                addOpenClassesOnInput();
                addDeleteClasses();
            } else {
                toggleOpenClasses();
                addDeleteClasses();
            }
        }
        function liToggle() {
            for(i of unselected.childNodes){
                i.onclick = liToggleChecked;
            }
            for(i of selected.childNodes){
                i.onclick = liToggleChecked;
            }
        }
        function closeLists() {
            unselected.classList.remove("open");
            selected.classList.remove("open");
            selectBoxes.classList.remove("open");
            caret.classList.remove("reverted");
        }
        function labelToggle() {
            if (inputValueText.innerHTML !== '') {
                label.classList.add('clicked');
                deleteBtn.classList.add('visible');
            } else {
                label.classList.remove('clicked');
                deleteBtn.classList.remove('visible');
            }
        }
        function addOpenClassesOnInput() {
            addDeleteClasses();
            caret.classList.add("reverted");
            unselected.classList.add("open");
            selected.classList.add("open");
            selectBoxes.classList.add("open");
            labelInput.style.borderColor = '#1A55F6';
        }
        function removeOpenClasses() {
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
        function addDeleteClasses() {
            label.classList.add('clicked');
            deleteBtn.classList.add('visible');
        }
        function removeDeleteClasses() {
            label.classList.remove('clicked');
            deleteBtn.classList.remove('visible');
        }
        function removeSelectedAttribute() {
            for (i = 0; i < selectHidden.children.length - 1; i++) {
                selectHidden.children[i].removeAttribute('selected');
            }
            selectHidden.dispatchEvent(event);
        }
        function generateItemsArr(options){
            for (i = 0; i < options.length; i++) {
                if (options[i].textContent !== undefined && options[i].textContent !== '') {
                    itemsArr[options[i].value] = options[i].textContent;
                }
            }
        }
        function setInitialString(){

            let selectedItems = [];
            for (let selectedItem of selectedText) {
                let hasHex = /\b[0-9A-F]{6}\b/gi;
                if(selectedItem.textContent.match(hasHex)){
                    let cleanString = selectedItem.textContent.split(' ');
                    selectedItems.push(cleanString[0]);
                } else {
                    selectedItems.push(selectedItem.textContent);
                }
            }

            if(selectedItems.length){
                addDeleteClasses();
            }
            createInputString(selectedItems);
        }
    }
};
window.DropDownList = DropDownList;
