const route = function (route) {
    return fetch("pages/" + route)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            document.querySelector("main").innerHTML = json.content
            gtag('config', 'UA-43565951-3', {
                page_path: '/' + route
            })
        })
}
