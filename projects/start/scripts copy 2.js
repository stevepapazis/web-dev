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


function destroyEverything() {

};

if (navigator.maxTouchPoints > 0) {
    screen.orientation.lock('natural');
};

window.addEventListener("load", function(){
    animateCSS( "#loading", "fadeOut", 2.5, () => $("#loading").remove() );
    $("#middle").removeClass("middle-after-load");
    animateCSS( "#header", "slideInDown", 1 );
    document.querySelector("body").style.setProperty("overflow-y","visible");
    let tagline = typeMsg("#tagline","hey there! <br> welcome to my portfolio <br> thanks for dropping by");
    setTimeout( tagline.start(), 2000 );
});

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

document.getElementById("tagline").addEventListener( "click", destroyEverything(), {once:true} );