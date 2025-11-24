let items = localStorage.getItem("items")
const addbar = document.getElementById("addbar")
const addbtn = document.getElementById("addbtn")
const list = document.getElementById("list")
let par_items = []

function additem(item) {
    let t = document.createTextNode(item.title)
    let e = document.createElement("div")
    e.appendChild(t)
    let box = document.createElement("li")
    let rmt = document.createTextNode("remove")
    let rm = document.createElement("button")
    rm.appendChild(rmt)
    rm.addEventListener("click", () => {
        let rmvalue = par_items.indexOf(item)
        if (rmvalue > -1) {
            par_items.splice(rmvalue, 1)
            localStorage.setItem("items", JSON.stringify(par_items))
            box.style.display = "none"
        }
    })
    let fnt = document.createTextNode("finish!")
    let fn = document.createElement("button")
    fn.addEventListener("click", () => {
        item.done = !item.done
        e.style.textDecoration = "line-through"
        localStorage.setItem("items", JSON.stringify(par_items))
    })
    fn.appendChild(fnt)
    e.appendChild(rm)
    e.appendChild(fn)
    box.appendChild(e)

    if (item.done) {
        e.style.textDecoration = "line-through"
    }
    box.className = "todo_li"
    list.appendChild(box)
}

if (items != "[]" && items) {
    par_items = JSON.parse(items)
    console.table(items)
    for (let i = 0; i < par_items.length; i++) {
        const element = par_items[i];
        additem(element)

    }
}
else {
    console.log("nothing in list")
}
function createitem() {
    const newitem = addbar.value
    if (newitem != "") {
        const item = { title: newitem, done: false }
        par_items.push(item)
        console.table(par_items)
        addbar.value = ""
        additem(item)
        localStorage.setItem("items", JSON.stringify(par_items))
    } else {
        alert("must whrite down new item")
    }
}
addbtn.addEventListener("click", () => {
    createitem()
})
// addbar.addEventListener("keydown"(key)=> {
//     console.log('Key pressed:', key.key);
//     console.log('Key code:', key.keyCode);
//     console.log('Code:', key.code);
// })