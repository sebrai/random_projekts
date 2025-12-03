const targetElement = document.getElementById('mpos');
const c = document.getElementById("c")
const ctx = c.getContext("2d")
const paintcolors = document.getElementById("colors")
const paintbsize =document.getElementById("strokesize")
const clear = document.getElementById("clear")
const downloadbtn = document.getElementById("download")
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
    // console.log(element)
    element.addEventListener("click",()=>{
        ctx.strokeStyle = element.textContent
        for (let r = 0; r < paintcolors.children.length; r++) {
            const rm = paintcolors.children[r]
            rm.style.boxShadow = "none"
        }
        element.style.boxShadow = "1px 1px 5px 0 inset"
        // console.log(element.style.boxShadow)
    })
}
console.log(paintbsize.children)
for (let children = 0; children < paintbsize.children.length; children++) {
    const element = paintbsize.children[children];
    element.addEventListener("click",()=>{
        ctx.lineWidth = parseInt(element.textContent,10)
         for (let r = 0; r < paintbsize.children.length; r++) {
            const rm = paintbsize.children[r]
            rm.style.boxShadow = "none"
        }
        element.style.boxShadow = "1px 1px 2px 0 inset"
        // console.log(element.style.boxShadow)
    })
    
}
clear.addEventListener("click",()=>{
    ctx.clearRect(0,0,1000,560)
})
downloadbtn.addEventListener("click",()=>{
    const img_url = c.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "your_masterpiece.png"
    link.href = img_url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
})