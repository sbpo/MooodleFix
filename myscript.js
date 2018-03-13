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
  if(window.location.href == "https://www.moodle.aau.dk/my/"){
    document.body.onclick = (e) => {
      //let el = e.target;
      e.path.forEach((el) => {
        //let el = ev.target;
        if(el.classList.contains("coursebox")) {
          let url = el.children[1].children[0].getAttribute("href");
          window.location.href=url;
          console.log(url);
          return;
        }
      })
    }
  }





  $(document).ready(()=>{
    const smallTabs = ()=>{
      let uiTab = document.getElementsByClassName("ui-tabs-tab");
      for(let i=2; i < uiTab.length; i++){
        let mText = uiTab[i].children[0].innerHTML;
        let text = mText.slice(0, 1);
        text += "-";
        text += mText.slice(mText.length-2, mText.length);
        uiTab[i].children[0].innerHTML = text;
      }

      //console.log($(".ui-tabs-tab").slice(2));
      let uiTabs = $(".ui-tabs-tab").slice(2);
      uiTabs.css(liCss).wrapAll('<div class="tabswrapper"></div>');

      //fix text ændringer
      $.each(uiTabs.children(), (i, child)=>{
        child.setAttribute("orgtext", child.innerHTML);
      });

      //ninjafix:
      let width = $(".tabswrapper").width();
      uiTabs.css({
          width: width / uiTabs.length
      });
      uiTabs.children().css({
        width: width / uiTabs.length
      });

      uiTabs.first().css({
        "border-radius": "0px, 5px, 5px, 0px!important",
      });
      uiTabs.last().css({
        "border-radius": "5px, 0px, 0px, 5px!important"
      });
      console.log(uiTabs.first());
    }

    //$(".ui-tabs-anchor").removeClass( 'ui-tabs-anchor' )
  });

  if(window.location.href == "https://www.moodle.aau.dk/my/"){
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
  }
})();
