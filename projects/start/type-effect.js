async function typeEffect(id, speed1 = 150, speed2 = 50, lastline = false ) {


    <div id="caret" class="blink-caret">&#8203;</div>

    #caret {
        white-space: nowrap;
        border-right: .10em solid #fff;
        display: inline;
    }
    .blink-caret {
        animation: blink-caret .9s step-end infinite;
    }
    @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: #fff; }
    }

    #tagline-text {
        display: inline;
    }

    <div id="tagline-text"></div>

    return await new Promise( resolve => {
        let element = document.getElementById(id);
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
