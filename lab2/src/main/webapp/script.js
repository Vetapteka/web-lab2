let form = document.querySelector('.form')
let submit = form.querySelector('.submit')
let r = form.querySelector('.r-field')
let y = form.querySelector('.y-field')


let showError = function (val, text) {
    removeError(val.parentNode)
    let error = document.createElement('div')
    error.className = 'error'
    error.style.fontFamily = "DejaVu Sans Mono";
    error.innerHTML = text
    val.insertAdjacentElement("afterend", error)

    // let previosBackgroundColor =
    val.style.backgroundColor = "indianred"
    setTimeout(function () {
        val.style.backgroundColor = "transparent"
    }, 1000)

    // document.getElementById("logo").src = "images/fail.jpg"
}

let removeError = function (val) {
    // document.getElementById("logo").src = "images/logo.jpg"
    let errors = val.querySelectorAll('.error')
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
}

let check = function (val, a, b) {
    if (!val.value) {
        showError(val, 'field cannot be empty')
        return false
    }
    if (String(parseFloat(val.value)) !== String(val.value)) {
        showError(val, 'must be a number')
        return false
    }
    if (val.value < a || val.value > b) {
        showError(val, 'must be in range: (' + a + '; ' + b + ')')
        return false
    }
    val.style.backgroundColor = "yellowgreen"
    return true
}

let graph = document.querySelector('.graph');
graph.addEventListener("click", function (e) {

    let graphContent = document.querySelector('.graph-content')
    removeError(graph.parentNode);

    let isValidR = check(r, 1, 4)

    if (!isValidR) {
        showError(graph, "set R please!")
    } else {
        let top = graphContent.getBoundingClientRect().top + window.pageYOffset;
        let left = graphContent.getBoundingClientRect().left + window.pageXOffset;
        let width = 250
        let x = (e.pageX - left - width) / width * r.value
        let y = (width - e.pageY + top) / width * r.value
        alert("coor : " + x + "  " + y);

        $.ajax({
            type: 'GET',
            url: "hello-servlet",
            data: {x: x, y: y, r: r.value},

            success: function (response) {
                document.getElementById("table-place").innerHTML += response;
                // window.sessionStorage.setItem("stored", document.getElementById("table-place").innerHTML);
            },
        });
    }
});


form.addEventListener('submit', function (event) {
    event.preventDefault()
    removeError(form)

    let isValidY = check(y, -3, 3)
    let isValidR = check(r, 1, 4)


    if (isValidR && isValidY) {
        let x = document.querySelector('input[name="x"]:checked')

        // form.submit()

        $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: {x: x.value, y: y.value, r: r.value},

                success: function (response) {
                    document.getElementById("table-place").innerHTML += response;
                    // window.sessionStorage.setItem("stored", document.getElementById("table-place").innerHTML);
                },
            }
        );
    }
});