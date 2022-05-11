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


// получаем координаты элемента в контексте документа
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

//если установлено валидное значение для R, то посчитать точку и отправить запрос
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


            error: function (jqXHR, exception) {
                let msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connected.\n Verify Network.';
                } else if (jqXHR.status === 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status === 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }

                $('#post').html(msg);
            }
        });

    }
})