async function animateCSS(element, animation, duration, cleanup = function(){} ) {
    return await new Promise((resolve, reject) => {
        const animationName = `${animation}`;
        const node = document.querySelector(element);

        node.classList.add("animated", animationName);
        $(node).css("animation-duration",`${duration}s`);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove("animated", animationName);
            resolve('Animation ended');
            cleanup();
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
};

function scrollPercentage() {
    return Math.round( (window.pageYOffset / (document.body.offsetHeight - window.innerHeight))*100 );
};

function scrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
};

async function typewriter(id, speed1 = 150, speed2 = 50, lastline = false ) {
    let element = document.getElementById(id);
    let text = element.innerHTML;
    element.innerHTML =
          `<div id='${id}-typewriter'>`
        +   `<div class='typewriter-text'>${text}</div>`
        +   `<div class='typewriter-caret'>&#8203;</div>`
        + `</div>`;
    let sheet = document.createElement('style');
    sheet.innerHTML =
        `
        #${id}-typewriter {
            /*display:none;*/
        }
        #${id} .typewriter-text {
            display: inline;
        }
        #${id} .typewriter-caret {
            white-space: nowrap;
            border-right: .10em solid #fff;
            display: inline;
        }
        #${id}-typewriter-caret.typewriter-blink-caret {
            animation: typewriter-blink-caret .9s step-end infinite;
        }
        @keyframes typewriter-blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #fff; }
        }
        `;
    return 0;

    return await new Promise( resolve => {
        element.classList.add("turn-on-caret");
        let msg = element.innerHTML;
        element.innerHTML = "";
        element.style.setProperty("display", "block");
        let animation = element.style.animation

        async function typeNextLetter (i) {
            return await new Promise( resolve => {
                if (i < msg.length) {
                    setTimeout(
                        function(){
                            element.style.animation = "";
                            typeNextLetter(i+1);
                            element.innerHTML += msg[i]
                        },
                        speed1 + Math.random()*speed2
                    )
                } else {
                    element.style.setProperty("animation", animation);
                    if ( !lastline ) {
                        element.classList.remove("turn-on-caret");
                    }
                }
            })
        }

        setTimeout( typeNextLetter(0), Math.random()*1000 );
    });
};





function destroyEverything() {
    alert("needs implimenting");
};






















if (navigator.maxTouchPoints > 0) {
    screen.orientation.lock('natural');
};
























window.addEventListener("load", function(){
    animateCSS( "#loading", "fadeOut", 2.5, () => $("#loading").remove() );
    $("#middle").removeClass("middle-after-load");
    animateCSS( "#header", "slideInDown", 1 );
    document.querySelector("body").style.setProperty("overflow-y","visible");

    

    //setTimeout( type( ["tagline1","tagline2","tagline3"] ), 3000 );

    // let tagline = typeMsg("#tagline","hey there! <br> welcome to my portfolio <br> thanks for dropping by");
    // setTimeout( tagline.start(), 2000 );
});






























var tagline = document.getElementById("tagline")

var middle = document.getElementById("middle");
const middleHeight = middle.offsetHeight/2;

var buttonToTop = document.getElementById("btn_top_fixed");
var percentage = document.getElementById("percentage");

buttonToTop.addEventListener( "click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

window.addEventListener( "scroll", function() {
    if (scrollTop() > middleHeight) {
        buttonToTop.style.display = "block";
        percentage.innerHTML = `${scrollPercentage()}%`;
    } else {
        buttonToTop.style.display = "none";
    };
    if ($(window).width() >= 600) {
        if ( (scrollTop() > 20) && (scrollTop() < 2*middleHeight) ) {
            middle.style.setProperty("background-size", `${Math.round(100 + 30*scrollTop() / middleHeight)}% auto`);
        } else {
            middle.style.setProperty("background-size", "100% auto");
        }
    };
});

window.addEventListener( "scroll", function(){ $("#tagline").fadeOut("slow") } , {once: true});

// tagline.addEventListener( "mouseenter", function(){
//     let previousText = tagline.innerHTML;
//     tagline.innerHTML="destroy the site";
//     tagline.addEventListener( "mouseleave", function(){tagline.innerHTML=previousText}, {once:true} );
// });

$("#tagline").one("mouseover", function(){
    let previousText = tagline.innerHTML;
    tagline.innerHTML="destroy the site";
    tagline.addEventListener( "mouseleave", function(){tagline.innerHTML=previousText}, {once:true} );
    tagline.addEventListener( "click", destroyEverything(), {once:true} );
});


























































var aText = new Array(
    "hey there! <br>",
    "welcome to my portfolio <br>",
    "thanks for dropping by <br>"
    );

var iIndex = 0;
var iArrLength = aText[0].length;

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typew(msg, elementId) {
    var contents =  '';
    var speed = 60 + Math.random()*30;
    var destination = document.getElementById(elementId);

    destination.removeClass("turn-on-caret");

    destination.css("#tagline",)
    destination.innerHTML = contents + aText[iIndex].substring(0, iTextPos) + "|";
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
    destination.innerHTML = sContents + "<br>" + "bash: " + msg.split(" ")[0]; + ": command not found"
    destination.addClass("turn-on-caret");
}

// tobe deleted
// async function animateCSS(element, animation, duration, cleanup = function(){} ) {
//     return await new Promise((resolve, reject) => {
//         const animationName = `${animation}`;
//         const node = document.querySelector(element);

//         node.classList.add("animated", animationName);
//         $(node).css("animation-duration",`${duration}s`);

//         function handleAnimationEnd(event) {
//             event.stopPropagation();
//             node.classList.remove("animated", animationName);
//             resolve('Animation ended');
//             cleanup();
//         }

//         node.addEventListener('animationend', handleAnimationEnd, {once: true});
//     });
// };

// function scrollPercentage() {
//     return Math.round( (window.pageYOffset / (document.body.offsetHeight - window.innerHeight))*100 );
// };

// function scrollTop() {
//     return document.documentElement.scrollTop || document.body.scrollTop;
// };

function typeMsg(id, msg, wait, content = 'html', speed1=150, speed2 = 100, error =.8) {
    let element = document.getElementById(id);
    let words = msg.split(" ");
    let res;
    let typos;
    let typores;
    words = words.flatMap( word => {
        if ( word === "<br>" ) {
            return [word]
        }
        res = "";
        typos = 0;
        typores = "";
        return word.split("").map( letter => {
                    if (Math.random() > error + Math.random()*(1-error)) {
                        typos += 1;
                        typores += `^${speed1+speed2*Math.random()}`
                            + `${String.fromCharCode(97+Math.floor(Math.random() * 26))}`;
                    }
                    res += `^${speed1+speed2*Math.random()}` + letter;
                    return typos>0? [typores,res] : [res];
        });
    });
    return new Typed(id, {strings: words, contentType: content, startDelay: wait});
};




// if (navigator.maxTouchPoints > 0) {
//     screen.orientation.lock('natural');
// };



// var middle = document.getElementById("middle");
// const middleHeight = middle.offsetHeight/2;

// var buttonToTop = document.getElementById("btn_top_fixed");
// var percentage = document.getElementById("percentage");

// buttonToTop.addEventListener( "click", function() {
//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// });

// window.addEventListener( "scroll", function() {
//     if (scrollTop() > middleHeight) {
//         buttonToTop.style.display = "block";
//         percentage.innerHTML = `${scrollPercentage()}%`;
//     } else {
//         buttonToTop.style.display = "none";
//     };
//     if ($(window).width() >= 600) {
//         if ( (scrollTop() > 20) && (scrollTop() < 2*middleHeight) ) {
//             middle.style.setProperty("background-size", `${Math.round(100 + 30*scrollTop() / middleHeight)}% auto`);
//         } else {
//             middle.style.setProperty("background-size", "100% auto");
//         }
//     };
// });

// window.addEventListener( "scroll", function(){ $("#tagline").fadeOut("slow") } , {once: true});
