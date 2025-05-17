let objFunLogin = new function () {
    this.star = $(".star");

    this.btnLogin = $("#btnLogin");
    this.txtPassword = $("#txtPassword");
    this.starPassword = $("#starPassword");
    this.errorPassword = $("#errorPassword");

    this.txtUsername = $("#txtUsername");
    this.starUsername = $("#starUsername");
    this.errorUsername = $("#errorUsername");

    this.formControl = $(".form-control");
    this.invalid = $(".invalid-feedback");
};

$(document).ready(function () {
    objFunLogin.star.hide();
    hideLoader()
    objFunLogin.btnLogin.click(function () {
        let isValid = true;

        let loginData = {
            Username: objFunLogin.txtUsername.val(),
            Password: objFunLogin.txtPassword.val()
        };

        objFunLogin.formControl.removeClass("is-invalid");
        objFunLogin.invalid.hide();
        objFunLogin.star.hide().removeClass("require");

        if (!loginData.Username) {
            objFunLogin.txtUsername.addClass("is-invalid");
            objFunLogin.errorUsername.show();
            objFunLogin.starUsername.show().addClass("require");
            isValid = false;
        }

        if (!loginData.Password) {
            objFunLogin.txtPassword.addClass("is-invalid");
            objFunLogin.errorPassword.show();
            objFunLogin.starPassword.show().addClass("require");
            isValid = false;
        }

        if (!isValid) return;
        debugger
        // AJAX request to controller
        showLoader()
        getJsonString("Auth", "AuthLogin", loginData, (response) => {
            if (response == 200) {
                XSAlert({
                    title: 'Success',
                    message: "You have logged in successfully.",
                    icon: 'success',
                    hideCancelButton: true
                }).then((results) => {
                    if (results === 'ok') {
                        clearAuth();
                        window.location.href = '/Purchase/PurchaseRequest';
                        hideLoader()
                    }
                });
            }
            if (response == 400) {
                XSAlert({
                    title: 'Login Failed',
                    message: "Invalid username or password. Please check try again.",
                    icon: 'error',
                    hideCancelButton: true
                });
                hideLoader()
            }

        },"POST");
    });
});
function clearAuth() {
    objFunLogin.txtUsername.val('');
    objFunLogin.txtPassword.val('');
}
