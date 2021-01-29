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

function typewriter(id, speed1 = 200, speed2 = 200, cb = function(){} ) {
    let element = document.getElementById(id);
    let text = element.innerHTML;
    element.innerHTML =
        `<span id='${id}-typewriter'>`
       +   `<span id='${id}-typewriter-text'></span>`
       +   `<span id='${id}-typewriter-caret'>&#8203;</span>`
       +`</span>`;
    let textField = document.getElementById(`${id}-typewriter-text`);
    let caret = document.getElementById(`${id}-typewriter-caret`);
    let blink = `${id}-typewriter-blink-caret`;
    let sheet = document.createElement('style');
    sheet.innerHTML =
        `
        #${id}-typewriter {
            margin: auto;
            display: inline;
        }
        #${id}-typewriter-text {
            margin:0;
            padding:0;
            display:inline;
        }
        #${id}-typewriter-caret {
            margin:0;
            padding:0;
            display:inline;
            border-right: .10em solid #fff;
        }
        .${blink} {
            animation: ${blink} .9s step-end infinite!important;
        }
        @keyframes ${blink} {
            from, to { border-color: transparent }
            50% { border-color: #fff; }
        }
        `;
    document.getElementsByTagName("head")[0].append(sheet);

    function typeNextLetter(i, msg) {
        if ( i < msg.length ) {    
            setTimeout(
                function() {
                    if (msg[i]=="<" && msg[i+1]=="b" && msg[i+2]=="r" && msg[i+3]==">") {
                        typeNextLetter(i+4, msg);
                        textField.innerHTML += "<br>";
                    } else {
                        typeNextLetter(i+1, msg);
                        textField.innerHTML += msg[i];
                    }
                }, speed1 + Math.random()*speed2
            )
        } else {
            caret.classList.add(blink);
            cb();
        }
    }

    typeNextLetter(0,text);
};

async function destroyEverything() {
    setTimeout(function(){destroyEverything()},5000)
    typewriter("tagline",0,0);
    typewriter("title",0,0);
    typewriter("about",0,0);
    typewriter("portfolio",0,0);
    typewriter("links",0,0);
};



if ( navigator.maxTouchPoints > 0 && $(window).width() <= 500 ) {
    screen.orientation.lock('portrait');
};

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
            middle.style.setProperty("background-size",
            `${ Math.round(100 + 100*scrollTop() / middleHeight) }% auto`
            );
        } else {
            middle.style.setProperty("background-size", `100% auto` );
        }
    }
});

window.addEventListener( "scroll", function(){ $("#tagline").fadeOut("slow") } , {once: true});


window.addEventListener("load", function(){

    animateCSS( "#loading", "fadeOut", 2.5, () => $("#loading").remove() );

    $("#middle").removeClass("middle-after-load");

    animateCSS( "#header", "slideInDown", 1 );

    document.querySelector("body").style.setProperty("overflow-y","visible");

    setTimeout( function(){
        tagline.style.setProperty("display","block")
        typewriter( "tagline", 150, 200, function(){
            $("#tagline").one("mouseover", function(){
                let previousText = tagline.innerHTML;
                tagline.style.color = "transparent";
                document.getElementById(`tagline-typewriter-caret`).style.setProperty("display","none");
                tagline.innerHTML += "<span style='color:white'><br>click here to destroy the site</span>";
                tagline.addEventListener( "mouseleave", function(){
                    tagline.innerHTML = previousText;
                    tagline.style.color = "white";
                    document.getElementById(`tagline-typewriter-caret`).style.setProperty("display","inline");
                }, {once:true} );
                tagline.addEventListener( "click", function(){destroyEverything()}, {once:true} );
            });
        })
    }, 3000);
});