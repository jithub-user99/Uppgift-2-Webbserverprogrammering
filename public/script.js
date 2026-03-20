const bookName = document.getElementById("inputText");
const submitName = document.getElementById("submitButton")
const itemsDiv = document.querySelector(".items");
let done = false

async function get_items() {
    return await fetch("/api/items")
        .then(res => res.json())
}

async function init(){

    itemsDiv.innerHTML = ""

    const items = await get_items()

    items.forEach(item => {

        console.log(item)
        const titleDiv = document.createElement("div")
        titleDiv.className = "item-div"

        const itemId = document.createElement("p")
        itemId.textContent = item.id

        const itemTitle = document.createElement("p")
        itemTitle.textContent = item.title

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener("click", () => {
            deleteItem(item.id)
        })

        const editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.addEventListener("click", async () => {
            const newTitle = prompt("New title:", item.title)
            if (newTitle) {
                await updateItem(item.id, newTitle)
                init()
            }
        })

        titleDiv.append(itemTitle, itemId, deleteButton, editButton)
        itemsDiv.append(titleDiv)
    })
}

init()

async function deleteItem(id) {

    await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    init()
}

async function updateItem(id, newTitle) {
    return await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle
        })
    }).then(res => res.json())
}

submitName.addEventListener("click", async (e) => {
    e.preventDefault();

    await addBooks(bookName.value)

    bookName.value = ""

    init()
})

async function addBooks(book_title) {

    if(book_title){

        return await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: book_title
            })
        })
        .then(result => result.json())
    }
    else{
        console.log("ERROR: No book title")
    }
}