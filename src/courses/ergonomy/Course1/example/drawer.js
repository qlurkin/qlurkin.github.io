window.addEventListener('load', function () {
    const mainMenu = document.querySelector("#mainMenu") 
    const menuButton = document.querySelector("#menuButton") 
    const overlay = document.querySelector("#overlay")

    let menuShown = false
    let time

    function hideMenu() {
        mainMenu.classList.remove("show")
        overlay.classList.remove("show")
        time = setTimeout(function () {
            overlay.classList.remove("onscreen")
        }, 500)
        menuShown = false
    }

    function showMenu() {
        clearTimeout(time)
        mainMenu.classList.add("show")
        overlay.classList.add("onscreen")
        overlay.classList.add("show")
        menuShown = true
    }


    menuButton.addEventListener("click", function (event) {
        if(menuShown) hideMenu()
        else showMenu()

        checkLatency(event, '#menuButton:click')
    })

    overlay.addEventListener("click", function (event) {
        hideMenu()

        checkLatency(event, '#overlay:click')
    })

    function desactiveAllItem() {
        document.querySelectorAll('nav a').forEach(function (a) {
            a.classList.remove("active")
        })
    }

    document.querySelectorAll('nav a').forEach(function (a) {
        a.addEventListener('click', function (event) {
            desactiveAllItem()
            this.classList.add("active")
            hideMenu()

            checkLatency(event, 'nav a:click')
        })
    })
    document.querySelector('header h1 a').addEventListener('click', function (event) {
        desactiveAllItem()
        hideMenu()

        checkLatency(event, 'header h1 a:click')
    })
})

