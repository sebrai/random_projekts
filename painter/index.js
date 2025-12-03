const targetElement = document.getElementById('mpos');
const c = document.getElementById("c")
const ctx = c.getContext("2d")
const paintcolors = document.getElementById("colors")
let isPointerDown = false
let currcolor = "black"
document.addEventListener('mousemove', (event) => {
    const elementRect = c.getBoundingClientRect()

    const relativeX = event.clientX - elementRect.left
    const relativeY = event.clientY - elementRect.top

    targetElement.textContent = `Mouse position relative to element: X=${relativeX}, Y=${relativeY}`
});

c.addEventListener("pointermove", (event) => {
    if (isPointerDown) {
       
        const elementRect = c.getBoundingClientRect()

        const relativeX = event.clientX - elementRect.left
        const relativeY = event.clientY - elementRect.top
        ctx.arc(relativeX, relativeY, 10**-32, 0, 2 * Math.PI)
        ctx.stroke()
        console.log(`Mouse position relative to element: X=${relativeX}, Y=${relativeY}`)
    }


})
// c.addEventListener("onclick", (event) => {
   
//         ctx.beginPath();
//         const elementRect = c.getBoundingClientRect();

//         const relativeX = event.clientX - elementRect.left;
//         const relativeY = event.clientY - elementRect.top;
//         ctx.arc(relativeX, relativeY, 1, 0, 2 * Math.PI);
//         ctx.stroke();
//         console.log(`Mouse position relative to element: X=${relativeX}, Y=${relativeY}`)
    


// })


document.addEventListener('pointerdown', function (event) {

    if (event.isPrimary) {
        isPointerDown = true
         ctx.beginPath()
    }
});

document.addEventListener('pointerup', function (event) {
    if (event.isPrimary) {
        isPointerDown = false

    }
});


for (let childen = 0; childen < paintcolors.children.length; childen++) {
    const element = paintcolors.children[childen];
    element.style.color = element.textContent
    console.log(element)
    element.addEventListener("click",()=>{
        ctx.strokeStyle = element.textContent
    })
}