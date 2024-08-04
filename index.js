import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-7f522-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")




const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")




addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(itemsInDB, inputValue)

    clearInputFieldEl()
  
    
})

onValue(itemsInDB, function(snapshot) {
    
   if (snapshot.exists()) { 
    
    let itemsArrayFromDB = Object.entries(snapshot.val())
        

    clearShoppingList()

    for (let i = 0; i < itemsArrayFromDB.length; i++) {
         let currentItem = itemsArrayFromDB[i]

         let currentItemID = currentItem[0]
         let currentItemValue = currentItem[1]
       
         appendItemToShoppingList(currentItem) 

    }
    } else {
        shoppingList.innerHTML = "No items here... yet"
    }
})


function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingList(item) {
    //shoppingList.innerHTML += `<li>${itemValue}</li`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `items/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingList.append(newEl)
}