let objFunChange = new function () {
    this.star = $(".star");

    this.btnChange = $("#btnChange");
    this.txtPassword = $("#txtPassword");
    this.starPassword = $("#starPassword");
    this.errorPassword = $("#errorPassword");

    this.txtUsername = $("#txtUsername");
    this.starUsername = $("#starUsername");
    this.errorUsername = $("#errorUsername");

    this.txtNewPassword = $("#txtNewPassword");
    this.starNewPassword = $("#starNewPassword");
    this.errorNewPassword = $("#errorNewPassword");

    this.txtConfirmPassword = $("#txtConfirmPassword");
    this.starConfirmPassword = $("#starConfirmPassword");
    this.errorConfirmPassword = $("#errorConfirmPassword");

    this.formControl = $(".form-control");
    this.invalid = $(".invalid-feedback");
};

$(document).ready(function () {
    objFunChange.star.hide();

    objFunChange.btnChange.click(function () {
        let isValid = true;

        let ChangeData = {
            Username: objFunChange.txtUsername.val(),
            Password: objFunChange.txtPassword.val(),
            NewPassword: objFunChange.txtNewPassword.val(),
            ConfirmPassword: objFunChange.txtConfirmPassword.val()
        };

        objFunChange.formControl.removeClass("is-invalid");
        objFunChange.invalid.hide();
        objFunChange.star.hide().removeClass("require");

        if (!ChangeData.Username) {
            objFunChange.txtUsername.addClass("is-invalid");
            objFunChange.errorUsername.show();
            objFunChange.starUsername.show().addClass("require");
            isValid = false;
        }
        if (!ChangeData.Password) {
            objFunChange.txtPassword.addClass("is-invalid");
            objFunChange.errorPassword.show();
            objFunChange.starPassword.show().addClass("require");
            isValid = false;
        }
        if (!ChangeData.NewPassword) {
            objFunChange.txtNewPassword.addClass("is-invalid");
            objFunChange.errorNewPassword.show();
            objFunChange.starNewPassword.show().addClass("require");
            isValid = false;
        }
        if (!ChangeData.ConfirmPassword) {
            objFunChange.txtConfirmPassword.addClass("is-invalid");
            objFunChange.errorConfirmPassword.show();
            objFunChange.starConfirmPassword.show().addClass("require");
            isValid = false;
        }
        if (ChangeData.NewPassword !== ChangeData.ConfirmPassword) {
            objFunChange.txtConfirmPassword.addClass("is-invalid");
            objFunChange.errorConfirmPassword.text("Passwords do not match").show();
            objFunChange.starConfirmPassword.show().addClass("require");
            isValid = false;
        }

        if (!isValid) return;

        // Proceed with form submission or AJAX call
        console.log("Form is valid:", ChangeData);
    });
});
