
let generate = document.getElementById("generate")
let color_display = document.getElementById("color_display")
let color_log = document.getElementById("color_log")
let clear = document.getElementById("clear")
let clipboard = document.getElementById("clipboard")
let colorlog = []
function randhex() {
    const hexval = "0123456789ABCDEF"
    let num = Math.floor(Math.random() * hexval.length)
    return hexval[num]
}
function getcolor() {
    let result = "#"
    for (let i = 0; i < 6; i++) {
        result += randhex()
    }
    return result
}
function newcolor() {
    const color = getcolor()
    colorlog.push(color)
    return color
}
function isColorLightOrDark(color) {
    // Convert HEX to RGB if necessary
    let r, g, b;
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        const bigint = parseInt(hex, 16);
        r = (bigint >> 16) & 255;
        g = (bigint >> 8) & 255;
        b = bigint & 255;
    } else if (color.startsWith('rgb')) {
        const matches = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        if (!matches) {
            console.error("Invalid RGB color format.");
            return null;
        }
        r = parseInt(matches[1]);
        g = parseInt(matches[2]);
        b = parseInt(matches[3]);
    } else {
        console.error("Unsupported color format. Please use HEX or RGB.");
        return null;
    }

    // Calculate perceived luminance (HSP method is often preferred for accuracy)
    // HSP (Highly Sensitive Poo) equation: http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // A threshold of 127.5 is commonly used (half of 255)
    if (hsp > 127.5) {
        return true;
    } else {
        return false;
    }
}

generate.addEventListener("click", () => {
    const c = newcolor()
    color_display.style.backgroundColor = c
    color_display.textContent = c
    if (isColorLightOrDark(c)) {
        color_display.style.color = "black"
    } else {
        color_display.style.color = "white"
    }
    const tekst = document.createTextNode(c)
    const item = document.createElement("li")
    item.appendChild(tekst)
    item.className = "listcolor"
    // if (!isColorLightOrDark(c)){
    //     item.style.backgroundColor = "var(--offwhite)"
    // }
    item.style.borderColor = c
    item.style.color = c
    item.addEventListener("click", () => {
        color_display.style.backgroundColor = item.textContent
        color_display.textContent = item.textContent
        if (isColorLightOrDark(item.textContent)) {
            color_display.style.color = "black"
        } else {
            color_display.style.color = "white"
        }
    })
    color_log.appendChild(item)
})
clear.addEventListener("click", () => {
    colorlog = []
    while (color_log.firstChild) {
        color_log.removeChild(color_log.firstChild)
    }
    color_display.style.backgroundColor = "azure"
    color_display.textContent = ""

})
clipboard.addEventListener("click", () => {
    let tekst = color_display.textContent
    if (tekst != "") {
        
        navigator.clipboard.writeText(tekst)
            .then(() => {
                alert(`"${tekst}" was copied to clipboard`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
    else{
        alert("no color to copy")
    }
})