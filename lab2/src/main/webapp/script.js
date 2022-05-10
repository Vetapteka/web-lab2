let form = document.querySelector('.form')
let submit = form.querySelector('.submit')
let r = form.querySelector('.r-field')
let y = form.querySelector('.y-field')

let showError = function (val, text) {
    let error = document.createElement('div')
    error.className = 'error'
    error.style.fontFamily = "DejaVu Sans Mono";
    error.innerHTML = text
    val.insertAdjacentElement("afterend", error)
    val.style.backgroundColor = "indianred"

    // document.getElementById("logo").src = "images/fail.jpg"
}

let removeError = function () {
    // document.getElementById("logo").src = "images/logo.jpg"
    let errors = form.querySelectorAll('.error')
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
    if (val.value <= a || val.value >= b) {
        showError(val, 'must be in range: (' + a + '; ' + b + ')')
        return false
    }
    val.style.backgroundColor = "yellowgreen"
    return true
}


form.addEventListener('submit', function (event) {
    event.preventDefault()
    removeError()
    let isValidR = check(r, 1, 4)
    let isValidY = check(y, -3, 3)

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