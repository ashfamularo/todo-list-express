//CLIENT-SIDE JAVASCRIPT


//EVENT LISTENERS
const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

//listen for click on delete button to remove item from list (delete DB document)
Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

//listen for click on list item to mark as complete (update DB docuemtn)
Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

//listen for click on completed (crossed out and greyed out) list item to mark as not-complete (update DB document)
Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete)
})

//Delete Function
async function deleteItem(){
    //pull text of list item and wrap up into variable itemText
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        //make a CRUD delete request to our server, where API is waiting. wait for response from server
        const response = await fetch('deleteItem', {
            //information sent along with request
            //CRUD method
            method: 'delete',
            //'Hey, it's JSON data!'
            headers: {'Content-Type': 'application/json'},
            //String containing list item text
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
       //once server sends response, console log the data it sends back to client-side and refresh the page, prompting a new GET request for the index.ejs and public-facing JS and CSS   
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

//Complete Function
async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

//Undo Complete Function
async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}