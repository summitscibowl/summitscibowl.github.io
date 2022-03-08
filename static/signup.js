// https://github.com/levinunnink/html-form-to-google-sheet

// Disable form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch the form we want to apply custom Bootstrap validation styles to
        var form = document.getElementById('form');
        // Prevent submission if invalid
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                // Validate the user for being a good person
                form.classList.add('was-validated');

                // Change the button
                document.getElementById('submission').disabled = true;
                document.getElementById('submission').innerHTML = "Submitting...";

                // Submit the form to google sheets
                fetch('https://script.google.com/macros/s/AKfycbyZufWTya0Dv4R6S7xu_SNMKU-xJuafklTkn2nb-v_Yblw1YvyEsLZ87TtyyYTKweL7/exec', {
                    method: 'POST',
                    body: new FormData(form),
                })
                .then(() => {
                    window.location.href = 'success';
                });
            }
        }, false);
    }, false);
})();