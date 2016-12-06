function main() {

    createButtons();

    var btnSubmit = document.getElementById('btnSubmit');
    var btnClean = document.getElementById('aClean');
    var txtAccess = document.getElementById('txtAccess');

    btnClean.addEventListener('click', function() {
        txtAccess.value = "";
    });

    btnSubmit.addEventListener('click', function() {
        var nif = document.getElementById('txtNif').value;
        var birthday = document.getElementById('txtDate').value;
        wrongDate = document.getElementById('wrongDate');
        validateAccess(txtAccess.value);
        validateNif(nif);
        if (!validateDate(birthday)) {
            wrongDate.innerHTML = '<i class="material-icons right">error</i>Fecha incorrecta.';
            wrongDate.style.color = '#DF0101';
            return false;
        } else {
            wrongDate.innerHTML = '<i class="material-icons right">done</i>';
            wrongDate.style.color = '#3ADF00';
            return true;
        }
    });
}

function createButtons() {
    var btns = 10;
    var divBtns = document.getElementById('btns');
    var txtAccess = document.getElementById('txtAccess');
    var rndNums = [];
    if (divBtns.children.length > 0) {
        for (var i = divBtns.children.length; i > 0; i--) {
            divBtns.removeChild(divBtns.children[i - 1]);
        }
    }

    for (var i = 0; i < btns; i++) {
        do {
            var rnd = Math.floor(Math.random(i) * btns);
        } while (rndNums[rnd]);
        rndNums[rnd] = true;
        var btn = document.createElement('button');
        btn.setAttribute('id', 'btnNum');
        btn.setAttribute('class', 'btn waves-effect waves-light');
        btn.setAttribute('value', rnd)
        var btnContenido = document.createTextNode(rnd);
        btn.appendChild(btnContenido);
        divBtns.appendChild(btn);
        if (i == 4) {
            divBtns.innerHTML += "<br />";
        }

    }

    divBtns.addEventListener('click', function(event) {
        if (event.target.tagName === "BUTTON")
            txtAccess.value += event.target.value;
    });

}


function validateNif(value) {
    wrongNif = document.getElementById('wrongNif');
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str)) {
        wrongNif.innerHTML = '<i class="material-icons right">error</i>NIF incorrecto.';
        wrongNif.style.color = "#DF0101";
        return false;
    }

    var letter = str.substr(-1);
    var charIndex = parseInt(value.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) {
        wrongNif.innerHTML = '<i class="material-icons right">done</i>';
        wrongNif.style.color = "#3ADF00";
        return true;
    }
    wrongNif.innerHTML = '<i class="material-icons right">error</i>Letra incorrecta.';
    wrongNif.style.color = "#DF0101";
    return false;
}

function validateDate(date) {
    var expDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return (expDate.test(date));
}

function validateAccess(value) {
    wrongAccess = document.getElementById('wrongAccess');
    var keySuccess = 98765;
    if (value == "") {
        wrongAccess.innerHTML = '<i class="material-icons right">error</i>Campo obligatorio.'
        wrongAccess.style.color = "#DF0101";
        return false;
    } else if (value.length <= 4) {
        wrongAccess.innerHTML = '<i class="material-icons right">error</i>La contraseña no cumple con la longitud mínima'
        wrongAccess.style.color = "#DF0101";
        return false;
    }

    if (value != keySuccess) {
        wrongAccess.innerHTML = '<i class="material-icons right">error</i>Contraseña incorrecta';
        wrongAccess.style.color = "#DF0101";
        return false;
    } else {
        wrongAccess.innerHTML = '<i class="material-icons right">done</i>';
        wrongAccess.style.color = "#3ADF00";
    }
}



function resetForm() {
    createButtons();
    wrongDate.innerHTML = "";
    wrongAccess.innerHTML = "";
    wrongNif.innerHTML = "";
}

function genSelected(value) {
    var divPhoto = document.getElementById('divPhoto');
    if (value == "masculino") {
        divPhoto.innerHTML = "<img src='img/b.png'>";
    } else {
        divPhoto.innerHTML = "<img src='img/a.png'>";
    }
}





window.addEventListener('load', main, false);
