// (A) GET TEXTAREA + REMAINING COUNTER
let textarea = document.querySelector("#post"),
  remain = document.querySelector(".char-remain-count");

// (B) INIT REMAINING CHARACTERS
remain.innerHTML = textarea.maxLength;

// (C) CALCULATE REMAINING CHARACTERS WHILE TYPING
textarea.addEventListener("keyup", () => {
  // remain.innerHTML = textarea.maxLength - textarea.value.length;
  remain.innerHTML = textarea.maxLength - textarea.value.length;
});
