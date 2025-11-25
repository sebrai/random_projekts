const targetElement = document.getElementById('mpos');
const c = document.getElementById("c")
const ctx = c.getContext("2d");
let isPointerDown = false;
document.addEventListener('mousemove', (event) => {
    const elementRect = c.getBoundingClientRect();

    const relativeX = event.clientX - elementRect.left;
    const relativeY = event.clientY - elementRect.top;

    targetElement.textContent = `Mouse position relative to element: X=${relativeX}, Y=${relativeY}`
});

c.addEventListener("pointermove", (event) => {
    if (isPointerDown) {
        ctx.beginPath();
        const elementRect = c.getBoundingClientRect();

        const relativeX = event.clientX - elementRect.left;
        const relativeY = event.clientY - elementRect.top;
        ctx.arc(relativeX, relativeY, 1, 0, 2 * Math.PI);
        ctx.stroke();
        console.log(`Mouse position relative to element: X=${relativeX}, Y=${relativeY}`)
    }


})



document.addEventListener('pointerdown', function (event) {

    if (event.isPrimary) {
        isPointerDown = true;

    }
});

document.addEventListener('pointerup', function (event) {
    if (event.isPrimary) {
        isPointerDown = false;

    }
});


