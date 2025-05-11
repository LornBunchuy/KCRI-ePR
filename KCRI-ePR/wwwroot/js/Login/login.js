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

        // AJAX request to controller
        $.ajax({
            type: "POST",
            url: "/Purchase/PurchaseRequest", // Controller/Action
            data: loginData,
            success: function (response) {
                // Handle success (redirect or show message)
                alert("Login successful!");
                window.location.href = '/Purchase/PurchaseRequest';
            },
            error: function (xhr) {
                // Handle error
                alert("Login failed: " + xhr.responseText);
            }
        });
    });
});
