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

  if(window.location.href != "https://www.moodle.aau.dk/my/"){
    let logo = document.querySelector('div.logo');
    let link = document.createElement("a");
    link.setAttribute("href", "https://www.moodle.aau.dk/my/");
    logo.parentNode.insertBefore(link, logo);
    link.appendChild(logo);
  }

  let sections = document.getElementsByClassName("section main");
  let button;
  for(i = 0; i<sections.length; i++) {
    button = document.createElement("button");
    button.innerHTML = "Vis mere";
    button.className = "show-more";
    button.onclick = (e) => {
      let content = e.target.parentElement.getElementsByClassName("content")[0]
      content.className = content.className.includes("open") ? "content" : "content open";
      e.target.innerHTML = content.className.includes("open") ? "Vis mindre" : "Vis mere";
    };
    sections[i].appendChild(button);
  }

  let cont = document.createElement("div");
  cont.style.display="none";
  window.top !== window.self || $(cont).load('https://www.moodle.aau.dk/calendar/view.php', () => {
    //var innerDoc = ifrm.contentDocument || ifrm.contentWindow.document;
    //let icallink = innerDoc.getElementsByClassName("ical-link")[0].getAttribute("href");
    let icallink = cont.getElementsByClassName("ical-link")[0].getAttribute("href");
    fetch("https://kontinemt.dk/ical?url=" + encodeURIComponent(icallink)).then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json.VCALENDAR[0])
      let cal = document.createElement("div");
      cal.id = "calendar";
      document.getElementsByClassName("almaincontent")[0].appendChild(cal);
      $(cal).fullCalendar({
          defaultView: 'agendaWeek',
          events: json.VCALENDAR[0].VEVENT.map((e) => ({
            title: e.SUMMARY,
            start: moment(e.DTSTART).format(),
            end: moment(e.DTEND).format(),
          })),
          height: "auto",
          views: {
            basic: {
                minTime: "08:00:00",
                maxTime: "18:00:00"
            },
            agenda: {
              minTime: "08:00:00",
              maxTime: "18:00:00",
              hiddenDays: [0,6]
            },
            week: {
                // options apply to basicWeek and agendaWeek views
            },
            day: {
                // options apply to basicDay and agendaDay views
            }
          }
      });


    });
  });

})();
