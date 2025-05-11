var APP_NAME = 'URM';
var CUR_LANG = 'en';
var xml_lang_doc = null;
var ENGLISH_DEPARTMENT_ID = 2;
 function getJsonString(controller, action, param_values, onSuccessHandler, method) {
    var myDefer = $.Deferred();
    var hasCallBack = false;
     var anti_XSRFToken = $('input:hidden[name="__RequestVerificationToken"]').val();
     anti_XSRFToken = "temps"
    if (!anti_XSRFToken || anti_XSRFToken == '') {
        alertify.error("0X-INTERN");//ERROR FAILED VALIDATE XSRF
        return;
    }
    if (!method) {
        method = "POST"
     }
    if (typeof onSuccessHandler == 'function') hasCallBack = true;
    if (method == "POST") {
       fetch(['/', controller, '/', action].join(''), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': anti_XSRFToken
            },
           body: param_values
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 500) {
                   window.location.href = "/Home/ErrorPage";
                }
            }
            return response.json();
        }).then((data) => {
            if (data == "0X-INTERN") {// CODE USER IS UNAUTHENCATE
                alertify.alert("User is unauthenicated", function () {
                    window.location.href = "../Identity/Account/Login";
                }).set({ transition: 'slide' });
                return;
            } else if (hasCallBack) {
                onSuccessHandler(data);
            }
        }).catch(error => {
            alertify.error(error.message);
        })

    } else {
        fetch(['/', controller, '/', action, '?', param_values].join(''), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': anti_XSRFToken
            },
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 500) {
                    window.location.href = "/Home/ErrorPage";
                }
            }
            return response.json();
        }).then((data) => {
            if (data == "0X-INTERN") {// CODE USER IS UNAUTHENCATE
                alertify.alert("User is unauthenicated", function () {
                    window.location.href = "../Identity/Account/Login";
                }).set({ transition: 'slide' });
                return;
            } else if (hasCallBack) {
                onSuccessHandler(data);
            }
        }).catch(error => {
            alertify.error(error.message);
        })
    }
    return myDefer.promise();
};