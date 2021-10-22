const betterRoute = function (rt) {
    const timeout = setTimeout(function () {
        document.querySelector("main").innerHTML=`
            <div class="load-5">
                <div class="ring-2">
                    <div class="ball-holder">
                        <div class="ball"></div>
                    </div>
                </div>
            </div>
        `
    }, 100)
        
    route(rt).then(function () {
        clearTimeout(timeout)
    })
}