/*docReady(() => {
  let elements = document.getElementsByClassName("coursebox");
  console.log(elements);
  for (var i = 0; i < elements.length; i++) {
    elements[i].className="coursebox2";
    elements[i].setAttribute('class', 'coursebox2')
    console.log(elements[i].className);
  }
});*/

(() => {
  document.getElementsByTagName("title")[0].innerHTML = "AAU Moodle";
  document.body.onclick = (e) => {
    let el = e.target;
    if(el.classList.contains("coursebox")) {
      let url = el.children[1].children[0].getAttribute("href");
      window.location.href=url;
      console.log(url);
    }
  }
})();
