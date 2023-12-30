import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Initialize Firebase

const appSettings = {
    databaseURL: "https://realtime-database-e574b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref (database, "Shopping List")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// Event listener for the add button
addButtonEl.addEventListener("click", function(){

    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {

   if(snapshot.exists()){

    let itemsArray = Object.entries(snapshot.val())
    clearShoppingListEl()

        for(let i=0; i < itemsArray.length; i++){

            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)
            
        } 
   }else {
    shoppingListEl.innerHTML = "No items here... yet"


    
        }
})
// Function to clear shoppinlistEl
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
    }
// Function to clear the input field
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

// Function to update the shopping list in the UI
function appendItemToShoppingListEl(item) {
    

   let itemID = item[0]
   let itemValue = item[1] 
   let newEl = document.createElement("li")

   newEl.textContent = itemValue

   shoppingListEl.append(newEl)
   
   newEl.addEventListener("click",function(){
    let exactLocationOfItemInDB = ref(database, `Shopping List/${itemID}`)
    remove(exactLocationOfItemInDB)

   })
}




