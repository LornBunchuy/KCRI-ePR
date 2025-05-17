let objShared = new function () {
    this.navAaccount = $("#navAaccount");
    this.lbUsername = $("#username");
}
$(document).ready(function () {
    objShared.navAaccount.click(function () {
        showLoader();
        XSAlert({
            title: 'Information',
            message: "Are you sure you want to log out?",
            icon: 'notification',
            showCancelButton: true,
        }).then((results) => {
            if (results == 'ok') {
                window.location.href = '/Auth/Login';
                hideLoader();
            } else {
                hideLoader();
            }
        })
    });
});
const showLoader = () => $('#loader, #loader-overlay').show();
const hideLoader = () => $('#loader, #loader-overlay').hide();
