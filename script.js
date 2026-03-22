const itemsarray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):[]

console.log(itemsarray)//this will print the array in the console of the chrome

document.querySelector("#enter").addEventListener("click", () =>{
    const item=document.querySelector("#item")
    createItem(item)
})

function createItem(item){
     if(item.value.trim() === "") return;
    itemsarray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsarray))
    location.reload()
}

function displayItems(){
    let items = ""
    for(let i=0 ; i<itemsarray.length ; i++){
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemsarray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-check deleteBtn"></i>
                <i class="fa-solid fa-pen-to-square editBtn"></i>
            </div>
        </div>
        <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
        </div>
    </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db,i)=>{
        db.addEventListener("click", () => {
            deleteItem(i)
        })
    })
}
function deleteItem(i){
    itemsarray.splice(i,1)
    localStorage.setItem("items", JSON.stringify(itemsarray))
    location.reload()
}

function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb,i)=>{
        eb.addEventListener("click", ()=>{
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })   
}
function activateSaveListeners(){
    const saveBtn= document.querySelectorAll(".saveBtn")
    const inputs= document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb,i)=>{
        sb.addEventListener("click", () =>{
        updateItem(inputs[i].value,i)
    })
})
}
function activateCancelListeners(){
    const cancelBtn=document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener("click", ()=>{
            updateController[i].style.display =  "none"
            inputs[i].disabled = true;
            inputs[i].value = itemsarray[i]
        })
    })
}

function updateItem(text,i){
    itemsarray[i]=text
    localStorage.setItem("items", JSON.stringify(itemsarray))
    location.reload()
}

let showdate = () => {
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] +" "+ date[2] + " " +date[3]; 
}
window.onload = () => {
    showdate()
    displayItems()
}