let inputRows = document.getElementById('inputRows');
let initRowsCopy = inputRows.firstElementChild.cloneNode(true);

function setupRemoveButton(button) {
    button.addEventListener('click', function () {
        this.parentNode.remove();
    });
}

function loadSavedData() {
    chrome.storage.sync.get('rules', function (result) {
        console.log(result)
        if (result.rules && result.rules.length > 0) {
            result.rules.forEach(function (item) {
                let newRow = createRow(item.rule, item.dir);
                inputRows.prepend(newRow);
                console.log("hi")
                setupRemoveButton(newRow.querySelector('.removeRowButton'));
            });
        }
    });
}

function createRow(ruleValue, dirValue) {
    let newRow = initRowsCopy.cloneNode(true)
    newRow.children[0].value = ruleValue
    newRow.children[1].value = dirValue
    return newRow;
}

function addNewRow() {
    let newRow = createRow('', '');
    inputRows.appendChild(newRow);
    setupRemoveButton(newRow.querySelector('.removeRowButton'));
}

loadSavedData();

document.getElementById('addRowButton').addEventListener('click', function () {
    addNewRow();
});

document.getElementById('saveButton').addEventListener('click', function () {
    let rows = document.getElementsByClassName('rule');
    let rules = [];

    for (let i = 0; i < rows.length; i++) {
        let ruleValue = rows[i].value;
        let dirValue = rows[i].nextElementSibling.value;
        if (ruleValue !== "" && dirValue !== ""){
            rules.push({ 'rule': ruleValue, 'dir': dirValue });
        }
    }

    chrome.storage.sync.set({ 'rules': rules }, function () {
        alert('Options saved successfully!');
    });
});

let removeButtons = document.getElementsByClassName('removeRowButton');
for (let i = 0; i < removeButtons.length; i++) {
    setupRemoveButton(removeButtons[i]);
}
