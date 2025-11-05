let pic = document.getElementById("pic")
let btn = document.getElementById("btn")
pic.src ="https://avatar.iran.liara.run/public"
// console.log(pic)
btn.addEventListener("click", () => {
 pic.src = "spinner.svg"
pic.src ="https://avatar.iran.liara.run/public"
location.reload()
});