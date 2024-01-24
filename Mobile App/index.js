import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
    databaseURL: "https://realtime-database-46c05-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


const app = initializeApp(appSettings);
const database = getDatabase(app);
const listDatabase = ref(database, "List");


const inputFieldEl = document.getElementById("inputField");
const addButtonEl = document.getElementById("addButton");
const listEl = document.getElementById('container-list');

onValue(listDatabase, function(snapshot){
    if(snapshot.exists()){
        let listArr = Object.entries(snapshot.val())
        clearListElement();
        for(let i = 0; i < listArr.length; i++){
            let currentEl = listArr[i];
            appendToList(currentEl);
        }
    } else {
        // Create a circular image with text when there is no data
        let circularImageContainer = document.createElement('div');
        circularImageContainer.classList.add('circular-image');

        let imgElement = document.createElement('img');
        imgElement.src = '/Furina3.gif';
        imgElement.alt = 'No Data';

        let textOverlay = document.createElement('div');
        textOverlay.classList.add('text-overlay');
        textOverlay.textContent = 'Empty';

        circularImageContainer.appendChild(imgElement);
        circularImageContainer.appendChild(textOverlay);

        clearListElement();
        listEl.appendChild(circularImageContainer);
    }
})
addButtonEl.addEventListener("click", function(){
    var inputValue = inputFieldEl.value;
    if(inputValue !== "") 
        push(listDatabase, inputValue);
    clearInputElement();
})


function clearListElement(){
    listEl.innerHTML = "";
}
function clearInputElement(){
    inputFieldEl.value = "";
}

function appendToList(element){
    // listEl.innerHTML += `<li> ${input} </li>` // Using INNERHTML make the "item" unable to use a function
    let itemID = element[0];
    let itemValue = element[1];
    const newEl = document.createElement('li');
    newEl.addEventListener("dblclick", function(){
        console.log(itemID);
        let itemToBeRemoved = ref(database, `List/${itemID}`);
        remove(itemToBeRemoved); 
    })
    newEl.textContent = itemValue;
    listEl.appendChild(newEl);
}