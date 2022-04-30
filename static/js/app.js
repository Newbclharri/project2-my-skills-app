// console.log("connected")

// const $input = $("#0")
// console.log($input)

const submitBtns = document.querySelectorAll("input[type='submit']");

for(i=0; i < submitBtns.length; i++){
    submitBtns[i].classList.add("zoom")
}

console.log(submitBtns)
