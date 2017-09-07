if (screen.width <= 325) {
  var sse1 = function () {

      return {
          buildMenu: function () {
              var m = document.getElementById('sses1');
              if(!m) return;
              var ul = m.getElementsByTagName("ul")[0];
              m.style.width = ul.offsetWidth+1+"px";
              var items = m.getElementsByTagName("li");
              var a = m.getElementsByTagName("a");

              slip = document.createElement("li");
              slip.className = "highlight";
              ul.appendChild(slip);

              var url = document.location.href.toLowerCase();
              k = -1;
              var nLength = -1;
              for (var i = 0; i < a.length; i++) {
                  if (url.indexOf(a[i].href.toLowerCase()) != -1 && a[i].href.length > nLength) {
                      k = i;
                      nLength = a[i].href.length;
                  }
              }

              if (k == -1 && /:\/\/(?:www\.)?[^.\/]+?\.[^.\/]+\/?$/.test) {
                  for (var i = 0; i < a.length; i++) {
                      if (a[i].getAttribute("maptopuredomain") == "true") {
                          k = i;
                          break;
                      }
                  }
                  if (k == -1 && a[0].getAttribute("maptopuredomain") != "false")
                      k = 0;
              }

              if (k > -1) {
                  slip.style.width = items[k].offsetWidth + "px";
                  //slip.style.left = items[k].offsetLeft + "px";
                  sse1.move(items[k]); //comment out this line and uncomment the line above to disable initial animation
              }
              else {
                  slip.style.visibility = "hidden";
              }

              for (var i = 0; i < items.length - 1; i++) {
                  items[i].onmouseover = function () {
                      if (k == -1) slip.style.visibility = "visible";
                      if (this.offsetLeft != slip.offsetLeft) {
                          sse1.move(this);
                      }
                  };
              }

              m.onmouseover = function () {
                  if (slip.t2)
                      slip.t2 = clearTimeout(slip.t2);
              };

              m.onmouseout = function () {
                  if (k > -1 && items[k].offsetLeft != slip.offsetLeft) {
                      slip.t2 = setTimeout(function () { sse1.move(items[k]); }, 50);
                  }
                  if (k == -1) slip.t2 = setTimeout(function () { slip.style.visibility = "hidden"; }, 50);
              };
          },
          move: function (target) {
              clearInterval(slip.timer);
              var direction = (slip.offsetLeft < target.offsetLeft) ? 1 : -1;
              slip.timer = setInterval(function () { sse1.mv(target, direction); }, 15);
          },
          mv: function (target, direction) {
              if (direction == 1) {
                  if (slip.offsetLeft - rebound < target.offsetLeft)
                      this.changePosition(target, 1);
                  else {
                      clearInterval(slip.timer);
                      slip.timer = setInterval(function () {
                          sse1.recoil(target, 1);
                      }, 15);
                  }
              }
              else {
                  if (slip.offsetLeft + rebound > target.offsetLeft)
                      this.changePosition(target, -1);
                  else {
                      clearInterval(slip.timer);
                      slip.timer = setInterval(function () {
                          sse1.recoil(target, -1);
                      }, 15);
                  }
              }
              this.changeWidth(target);
          },
          recoil: function (target, direction) {
              if (direction == -1) {
                  if (slip.offsetLeft > target.offsetLeft) {
                      slip.style.left = target.offsetLeft + "px";
                      clearInterval(slip.timer);
                  }
                  else slip.style.left = slip.offsetLeft + 2 + "px";
              }
              else {
                  if (slip.offsetLeft < target.offsetLeft) {
                      slip.style.left = target.offsetLeft + "px";
                      clearInterval(slip.timer);
                  }
                  else slip.style.left = slip.offsetLeft - 2 + "px";
              }
          },
          changePosition: function (target, direction) {
              if (direction == 1) {
                  //following +1 will fix the IE8 bug of x+1=x, we force it to x+2
                  slip.style.left = slip.offsetLeft + Math.ceil(Math.abs(target.offsetLeft - slip.offsetLeft + rebound) / 10) + 1 + "px";
              }
              else {
                  //following -1 will fix the Opera bug of x-1=x, we force it to x-2
                  slip.style.left = slip.offsetLeft - Math.ceil(Math.abs(slip.offsetLeft - target.offsetLeft + rebound) / 10) - 1 + "px";
              }
          },
          changeWidth: function (target) {
              if (slip.offsetWidth != target.offsetWidth) {
                  var diff = slip.offsetWidth - target.offsetWidth;
                  if (Math.abs(diff) < 4) slip.style.width = target.offsetWidth + "px";
                  else slip.style.width = slip.offsetWidth - Math.round(diff / 3) + "px";
              }
          }
      };
  } ();

  if (window.addEventListener) {
      window.addEventListener("load", sse1.buildMenu, false);
  }
  else if (window.attachEvent) {
      window.attachEvent("onload", sse1.buildMenu);
  }
  else {
      window[onload] = sse1.buildMenu;
  }

}


var sse1 = function () {
    var rebound = 5; //set it to 0 if rebound effect is not prefered
    var slip, k;
    return {
        buildMenu: function () {
            var m = document.getElementById('sses1');
            if(!m) return;
            var ul = m.getElementsByTagName("ul")[0];
            m.style.width = ul.offsetWidth+1+"px";
            var items = m.getElementsByTagName("li");
            var a = m.getElementsByTagName("a");

            slip = document.createElement("li");
            slip.className = "highlight";
            ul.appendChild(slip);

            var url = document.location.href.toLowerCase();
            k = -1;
            var nLength = -1;
            for (var i = 0; i < a.length; i++) {
                if (url.indexOf(a[i].href.toLowerCase()) != -1 && a[i].href.length > nLength) {
                    k = i;
                    nLength = a[i].href.length;
                }
            }

            if (k == -1 && /:\/\/(?:www\.)?[^.\/]+?\.[^.\/]+\/?$/.test) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].getAttribute("maptopuredomain") == "true") {
                        k = i;
                        break;
                    }
                }
                if (k == -1 && a[0].getAttribute("maptopuredomain") != "false")
                    k = 0;
            }

            if (k > -1) {
                slip.style.width = items[k].offsetWidth + "px";
                //slip.style.left = items[k].offsetLeft + "px";
                sse1.move(items[k]); //comment out this line and uncomment the line above to disable initial animation
            }
            else {
                slip.style.visibility = "hidden";
            }

            for (var i = 0; i < items.length - 1; i++) {
                items[i].onmouseover = function () {
                    if (k == -1) slip.style.visibility = "visible";
                    if (this.offsetLeft != slip.offsetLeft) {
                        sse1.move(this);
                    }
                };
            }

            m.onmouseover = function () {
                if (slip.t2)
                    slip.t2 = clearTimeout(slip.t2);
            };

            m.onmouseout = function () {
                if (k > -1 && items[k].offsetLeft != slip.offsetLeft) {
                    slip.t2 = setTimeout(function () { sse1.move(items[k]); }, 50);
                }
                if (k == -1) slip.t2 = setTimeout(function () { slip.style.visibility = "hidden"; }, 50);
            };
        },
        move: function (target) {
            clearInterval(slip.timer);
            var direction = (slip.offsetLeft < target.offsetLeft) ? 1 : -1;
            slip.timer = setInterval(function () { sse1.mv(target, direction); }, 15);
        },
        mv: function (target, direction) {
            if (direction == 1) {
                if (slip.offsetLeft - rebound < target.offsetLeft)
                    this.changePosition(target, 1);
                else {
                    clearInterval(slip.timer);
                    slip.timer = setInterval(function () {
                        sse1.recoil(target, 1);
                    }, 15);
                }
            }
            else {
                if (slip.offsetLeft + rebound > target.offsetLeft)
                    this.changePosition(target, -1);
                else {
                    clearInterval(slip.timer);
                    slip.timer = setInterval(function () {
                        sse1.recoil(target, -1);
                    }, 15);
                }
            }
            this.changeWidth(target);
        },
        recoil: function (target, direction) {
            if (direction == -1) {
                if (slip.offsetLeft > target.offsetLeft) {
                    slip.style.left = target.offsetLeft + "px";
                    clearInterval(slip.timer);
                }
                else slip.style.left = slip.offsetLeft + 2 + "px";
            }
            else {
                if (slip.offsetLeft < target.offsetLeft) {
                    slip.style.left = target.offsetLeft + "px";
                    clearInterval(slip.timer);
                }
                else slip.style.left = slip.offsetLeft - 2 + "px";
            }
        },
        changePosition: function (target, direction) {
            if (direction == 1) {
                //following +1 will fix the IE8 bug of x+1=x, we force it to x+2
                slip.style.left = slip.offsetLeft + Math.ceil(Math.abs(target.offsetLeft - slip.offsetLeft + rebound) / 10) + 1 + "px";
            }
            else {
                //following -1 will fix the Opera bug of x-1=x, we force it to x-2
                slip.style.left = slip.offsetLeft - Math.ceil(Math.abs(slip.offsetLeft - target.offsetLeft + rebound) / 10) - 1 + "px";
            }
        },
        changeWidth: function (target) {
            if (slip.offsetWidth != target.offsetWidth) {
                var diff = slip.offsetWidth - target.offsetWidth;
                if (Math.abs(diff) < 4) slip.style.width = target.offsetWidth + "px";
                else slip.style.width = slip.offsetWidth - Math.round(diff / 3) + "px";
            }
        }
    };
} ();

if (window.addEventListener) {
    window.addEventListener("load", sse1.buildMenu, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", sse1.buildMenu);
}
else {
    window[onload] = sse1.buildMenu;
}

/* Contact */

var x = document.getElementById("form_sample");
var createform = document.createElement('form'); // Create New Element Form
createform.setAttribute("action", ""); // Setting Action Attribute on Form
createform.setAttribute("method", "post"); // Setting Method Attribute on Form
x.appendChild(createform);

var heading = document.createElement('h2'); // Heading of Form
heading.innerHTML = "Contact Form ";
createform.appendChild(heading);

var line = document.createElement('hr'); // Giving Horizontal Row After Heading
createform.appendChild(line);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var namelabel = document.createElement('label'); // Create Label for Name Field
namelabel.innerHTML = "Your Name : "; // Set Field Labels
createform.appendChild(namelabel);

var inputelement = document.createElement('input'); // Create Input Field for Name
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "dname");
createform.appendChild(inputelement);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var emaillabel = document.createElement('label'); // Create Label for E-mail Field
emaillabel.innerHTML = "Your Email : ";
createform.appendChild(emaillabel);

var emailelement = document.createElement('input'); // Create Input Field for E-mail
emailelement.setAttribute("type", "text");
emailelement.setAttribute("name", "demail");
createform.appendChild(emailelement);

var emailbreak = document.createElement('br');
createform.appendChild(emailbreak);

var messagelabel = document.createElement('label'); // Append Textarea
messagelabel.innerHTML = "Your Message : ";
createform.appendChild(messagelabel);

var texareaelement = document.createElement('textarea');
texareaelement.setAttribute("name", "dmessage");
createform.appendChild(texareaelement);

var messagebreak = document.createElement('br');
createform.appendChild(messagebreak);

var submitelement = document.createElement('input'); // Append Submit Button
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);

/* Anti-Spam */
function AntiSpam(num) {

num = document.CaptchaSpam.Captcha.value;

if( num == 10) {
    document.getElementById('submit').style.display = 'inline';}
else{

}

}
