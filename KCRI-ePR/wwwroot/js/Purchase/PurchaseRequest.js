let allRowsData = [];
let objFuncPR = new function () {
    let today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    if (!$("#requestedDate").val()) {
        $("#requestedDate").val(today);
    }

    this.lbCCDept = $("#lbCCDept");
    this.lbDocEntry = $("#lbDocEntry");
    this.lbIsCashAdv = $("#lbIsCashAdv");
    this.lbDeliveryMethod = $("#lbDeliveryMethod");
    this.lbIsBudget = $("#lbIsBudget");

    this.txtAdditionalSpec = $("#additionalSpec");

    this.star = $(".star");
    this.checkbox = $("input[type='checkbox']");

    this.txtPRNo = $("#prNo");
    this.txtAddress = $("#Address");
    this.txtCashAdvAmt = $("#txtAmount");
    this.errorAmount = $("#errorAmount");


    this.errorAddress = $("#errorAddress");

    this.btnSubmit = $("#btnsubmit");
    this.btnCancel = $("#btnCancel");
    this.btnBack = $("#btnBack");
    this.btnAddRow = $("#addRow");
    this.btnRemoveRow = $("#removeRow");

    this.txtRequestedDate = $("#requestedDate");
    this.errorRequestedDate = $("#errorRequestedDate");
    this.starRequestedDate = $("#starRequestedDate");

    this.txtRequireDate = $("#requireDate");
    this.errorRequireDate = $("#errorRequireDate");
    this.starRequireDate = $("#starRequireDate");

    this.cbCompany = $("#company");
    this.errorCompany = $("#errorCompany");
    this.starCompany = $("#starCompany");

    this.cbDevision = $("#devision");
    this.errorDevision = $("#errorDevision");
    this.starDevision = $("#starDevision");

    this.txtStatus = $("#status");
    this.errorStatus = $("#errorStatus");
    this.starStatus = $("#starStatus");

    this.txtPurpose = $("#purpose");
    this.errorPurpose = $("#errorPurpose");
    this.starPurpose = $("#starPurpose");

    this.errorBudgeted = $("#errorBudgeted");
    this.starBudgeted = $("#starBudgeted");

    this.errorAdvance = $("#errorAdvance");
    this.starAdvance = $("#starAdvance");

    this.errorPMOD = $("#errorPMOD");
    this.starPMOD = $("#starPMOD");

    this.errorCostCenter = $("#errorCostCenter");
    this.starCostCenter = $("#starCostCenter");

    this.isBudgetedYes = $("#budgetedYes").is(":checked");
    this.isBudgetedNo = $("#budgetedNo").is(":checked");

    this.deliveryMethodSelfPickup = $("#selfPickup").is(":checked");
    this.deliveryMethodAddress = $("#deliveryAddress").is(":checked");
    this.deliveryAddressText = $("input[name='deliveryAddressText']").val();

    this.advanceRequiredYes = $("#advanceYes").is(":checked");
    this.advanceRequiredNo = $("#advanceNo").is(":checked");

    this.costCenterFixedAsset = $("#costCenterFixedAsset").is(":checked");
    this.costCenterStock = $("#costCenterStock").is(":checked");
    this.costCenterStationery = $("#costCenterStationery").is(":checked");
    this.costCenterService = $("#costCenterService").is(":checked");

    this.formControl = $(".form-control");
    this.formSelect = $(".form-select");
    this.invalid = $(".invalid-feedback");
}();


function getAllRowValues() {
    allRowsData = [];

    $('#editableTable tbody tr').each(function () {
        const rowData = {};
        let hasValue = false;

        $(this).find('td').each(function () {
            const input = $(this).find('input');
            if (input.length > 0) {
                const name = input.attr('name');
                const value = input.val().trim();
                if (value !== '') {
                    hasValue = true;
                }
                rowData[name] = value;
            }
        });

        if (hasValue) {
            allRowsData.push(rowData);
        }
    });

    return allRowsData;
}

// 🔄 Modified function: class name is now `txtLineTotal`
function createRow(readOnly = true) {
    return `
<tr>
    <td class="row-number"></td>
    <td><input type="text" class="txtDescription" name="ItemName" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtUOM" name="UoMName" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtQty" name="Quantity" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtUnitPrice" name="UnitPrice" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtLineTotal" name="LineTotal" readonly /></td>
</tr>`;
}

function updateTotals() {
    let totalQty = 0.00;
    let totalAmount = 0.00;
    $('#editableTable tbody tr').each(function () {
        const qty = parseFloat($(this).find('input[name="Quantity"]').val());
        const amount = parseFloat($(this).find('input[name="LineTotal"]').val());

        if (!isNaN(qty)) totalQty += qty;
        if (!isNaN(amount)) totalAmount += amount;
    });

    $('#totalB').text(totalQty.toFixed(2));
    $('.totalAmount').text(totalAmount.toFixed(2));
}

function updateRowNumbers() {
    $('#editableTable tbody tr').each(function (index) {
        $(this).find('.row-number').text(index + 1);
    });
}

// Auto-calculate Amount = Quantity × UnitPrice
$('#editableTable').on('input', 'input[name="Quantity"], input[name="UnitPrice"]', function () {
    const row = $(this).closest('tr');
    const qty = parseFloat(row.find('input[name="Quantity"]').val()) || 0;
    const price = parseFloat(row.find('input[name="UnitPrice"]').val()) || 0;
    row.find('input[name="LineTotal"]').val((qty * price).toFixed(2));
});

function clearData() {
    const today = new Date().toISOString().split('T')[0]; // Format: yyyy-mm-dd

    objFuncPR.txtRequestedDate.val(today); // Set to current date
    objFuncPR.txtRequireDate.val('');
    objFuncPR.txtPurpose.val('');
    objFuncPR.txtAddress.val('');
    objFuncPR.txtAdditionalSpec.val(''); // Fix typo

    objFuncPR.txtCashAdvAmt.val('');
    objFuncPR.cbCompany.val("0").trigger('change'); // Fix if misspelled

    $('input[name="budgeted"]').prop('checked', false);
    $('input[name="deliveryMethod"]').prop('checked', false);
    $('input[name="advancePayment"]').prop('checked', false);
    $('input[name="costCenter"]').prop('checked', false);

    $("tr").each(function () {
        $(this).find("input").val("");
    });
}


function formatfeild() {
    formatDecimal('.txtQty', 2);
    formatDecimal('.txtUnitPrice', 2);
    formatDecimal('.totalB', 2);
    alphaNumeric('.txtDescription');
    alphaNumeric('.txtUOM');
}


function checkMethodDelivery() {
    return $('#deliveryAddress').is(':checked');
}
function checkAdvancePayment() {
    return $('#advanceYes').is(':checked');
}


function triggerMethodDelivery() {
    $('input[name="deliveryMethod"]').on('change', function () {
        if ($('#deliveryAddress').is(':checked')) {
            $('#Address').prop("disabled", false);
        } else {
            $('#Address').prop("disabled", true).val("");
        }
    }).trigger('change');
}


function triggerAdvancePayment() {
    $('input[name="advancePayment"]').on('change', function () {
        if ($('#advanceYes').is(':checked')) {
            $('#txtAmount').prop("disabled", false);
        } else {
            $('#txtAmount').prop("disabled", true).val("");
        }
    }).trigger('change');
}


function preventCheckBox() {
    $("input[name='budgeted']").click(function () {
        $("input[name='budgeted']").not(this).prop("checked", false);
    });
    $("input[name='deliveryMethod']").click(function () {
        $("input[name='deliveryMethod']").not(this).prop("checked", false);
    });
    $("input[name='advancePayment']").click(function () {
        $("input[name='advancePayment']").not(this).prop("checked", false);
    });
    $("input[name='costCenter']").click(function () {
        $("input[name='costCenter']").not(this).prop("checked", false);
    });
}




//Initailize
$(document).ready(function () {
    showLoader();
    objFuncPR.star.hide();
    objFuncPR.txtPRNo.prop("disabled", true);
    triggerMethodDelivery();
    triggerAdvancePayment();
    preventCheckBox();
    formatfeild();
    getJsonString("Purchase", "GetUsername", {}, (result) => {
        objShared.lbUsername.text(result.username);
    });
    // Assuming objFuncPR properties are jQuery elements like $('#txtRequestedDate')
    let depCodeDocEntry = objFuncPR.lbDocEntry.data('depcode');
    let depCodeRequestedDate = objFuncPR.txtRequestedDate.data('depcode');
    let depCodeRequireDate = objFuncPR.txtRequireDate.data('depcode');
    let depCodePRNo = objFuncPR.txtPRNo.data('depcode');
    let depCodeCompany = objFuncPR.cbCompany.data('depcode');
    let depCodeDevision = objFuncPR.cbDevision.data('depcode');
    let depCodeStatus = objFuncPR.txtStatus.data('depcode');
    let depCodeAddress = objFuncPR.txtAddress.data('depcode');
    let depCodeCashAdvAmt = objFuncPR.txtCashAdvAmt.data('depcode');
    let depCodePurpose = objFuncPR.txtPurpose.data('depcode');
    let depCodeAdditionalSpec = objFuncPR.txtAdditionalSpec.data('depcode');

    let depCodeBudgeted = objFuncPR.lbIsBudget.data('depcode');
    let depCodeDeliveryMethod = objFuncPR.lbDeliveryMethod.data('depcode');
    let depCodeAdvancePayment = objFuncPR.lbIsCashAdv.data('depcode');
    let depCodeCostCenter = objFuncPR.lbCCDept.data('depcode');

    // Logs
    console.log("depCodeDocEntry:", depCodeDocEntry);
    console.log("depCodeRequestedDate:", depCodeRequestedDate);
    console.log("depCodeRequireDate:", depCodeRequireDate);
    console.log("depCodePRNo:", depCodePRNo);
    console.log("depCodeCompany:", depCodeCompany);
    console.log("depCodeDevision:", depCodeDevision);
    console.log("depCodeStatus:", depCodeStatus);
    console.log("depCodeAddress:", depCodeAddress);
    console.log("depCodeCashAdvAmt:", depCodeCashAdvAmt);
    console.log("depCodePurpose:", depCodePurpose);
    console.log("depCodeAdditionalSpec:", depCodeAdditionalSpec);

    console.log("depCodeBudgeted (checked):", depCodeBudgeted);
    console.log("depCodeDeliveryMethod (checked):", depCodeDeliveryMethod);
    console.log("depCodeAdvancePayment (checked):", depCodeAdvancePayment);
    console.log("depCodeCostCenter (checked):", depCodeCostCenter);


    
    //ComboManager.setComboBoxItemSource(objFuncPR.cbCompany, staticData.getCompanyItems(), true, false);
    //ComboManager.setComboBoxItemSource(objFuncPR.cbDevision, staticData.getDevisionItems(), true, false);

    //change combobox is get DocNum
    objFuncPR.cbCompany.on("change", function () {
        let company = $(this).find("option:selected").text();
        let code = $(this).val();
        // get docNum
        if (objFuncPR.lbDocEntry.data('depcode') == 0) {
            if (code != "0") {
                getJsonString("Purchase", "GetDocNum", company, (result) => {
                    if (result != null) {
                        objFuncPR.txtPRNo.val(result);
                    } else {
                        objFuncPR.txtPRNo.val("N/A"); // Clear if null
                    }
                }, "POST");
            } else {
                objFuncPR.txtPRNo.val("N/A");
            }
        }
       
        //prevent
        if (objFuncPR.lbDocEntry.data('depcode') != 0) {
            objFuncPR.cbDevision.prop("disabled", true);
        }
        else if ($(this).val() == "1") {
            objFuncPR.cbDevision.prop("disabled", false);
        } else {
            objFuncPR.cbDevision.prop("disabled", true).val("0");
        }
    });

    // Force initial check
    objFuncPR.cbCompany.trigger("change");

    //create row default 10
    const minRows = 10;
    if (!details || details.length === 0) {
        for (let i = 0; i < 10; i++) {
            $('#editableTable tbody').append(createRow(i !== 0));
        }
        hideLoader();
    } else {
        // If details exist, create rows from data
        details.forEach((item, index) => {

            const row = $(createRow(false)); // editable rows

            row.find('input[name="ItemName"]').val(item.ItemName);
            row.find('input[name="UoMName"]').val(item.UoMName);
            row.find('input[name="Quantity"]').val(item.Quantity);
            row.find('input[name="UnitPrice"]').val(item.UnitPrice);

            // Calculate and set LineTotal
            const qty = parseFloat(item.Quantity);
            const price = parseFloat(item.UnitPrice);
            if (!isNaN(qty) && !isNaN(price)) {
                row.find('input[name="LineTotal"]').val((qty * price).toFixed(2));
            }

            $('#editableTable tbody').append(row);
        });
        const extraRows = minRows - details.length;
        if (extraRows > 0) {
            for (let i = 0; i < extraRows; i++) {
                $('#editableTable tbody').append(createRow(i !== 0));
            }
        }
        hideLoader();
    }
    updateRowNumbers();
    updateTotals();

    // Handle row
    $('#editableTable tbody').on('click', 'tr', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // Input event handler for any input inside the tbody
    $('#editableTable tbody').on('input', 'input', function () {
        const currentRow = $(this).closest('tr');
        const inputs = currentRow.find('input').not('[name="LineTotal"]');
        let allFilled = true;

        inputs.each(function () {
            if ($(this).val().trim() === '') {
                allFilled = false;
                return false; // break loop
            }
        });

        const qty = parseFloat(currentRow.find('input[name="Quantity"]').val());
        const price = parseFloat(currentRow.find('input[name="UnitPrice"]').val());
        if (!isNaN(qty) && !isNaN(price)) {
            currentRow.find('input[name="LineTotal"]').val((qty * price).toFixed(2));
            updateTotals();
        } else {
            currentRow.find('input[name="LineTotal"]').val('');
        }

        // Control readonly state of rows based on completeness
        let reachedIncomplete = false;

        $('#editableTable tbody tr').each(function (index, tr) {
            if (reachedIncomplete) {
                $(tr).find('input').not('[name="LineTotal"]').attr('readonly', true);
                return;
            }

            const rowInputs = $(tr).find('input').not('[name="LineTotal"]');
            const isFilled = rowInputs.toArray().every(input => $(input).val().trim() !== '');

            if (isFilled) {
                $(tr).find('input').not('[name="LineTotal"]').removeAttr('readonly');
            } else {
                reachedIncomplete = true;
                $(tr).find('input').not('[name="LineTotal"]').removeAttr('readonly');
            }
        });
    });

    //Button add
    objFuncPR.btnAddRow.click(function () {
        const selectedRow = $('#editableTable tbody tr.selected');
        let newRow = $(createRow(true));

        if (selectedRow.length) {
            selectedRow.after(newRow);
        } else {
            $('#editableTable tbody').append(newRow);
        }

        updateRowNumbers();
        newRow.addClass('selected').siblings().removeClass('selected');
        updateTotals();
        $('#editableTable tbody input:first').trigger('input');
    });

    //Button remove
    objFuncPR.btnRemoveRow.click(function () {
        const selectedRow = $('#editableTable tbody tr.selected');
        const rowCount = $('#editableTable tbody tr').length;

        if (selectedRow.length) {
            let hasAnyValue = false;

            selectedRow.find('input[name!="LineTotal"]').each(function () {
                if ($(this).val().trim() !== '') {
                    hasAnyValue = true;
                    return false;
                }
            });

            if (hasAnyValue) {
                XSAlert({
                    title: 'Confirmation',
                    message: "All fields are filled. Are you sure you want to delete this row?",
                    icon: 'question',
                    showCancelButton: true
                }).then((results) => {
                    if (results === 'ok') {
                        if (rowCount > 1) {
                            selectedRow.remove();
                            updateRowNumbers();
                            updateTotals();
                        }
                    }
                });
            } else {
                if (rowCount > 1) {
                    selectedRow.remove();
                    updateRowNumbers();
                    updateTotals();
                } else {
                    XSAlert({
                        title: 'Warning',
                        message: 'Cannot delete the last row.',
                        icon: 'warning'
                    });
                }
            }
        }
    });

    //Data
    objFuncPR.btnSubmit.click(function () {
        showLoader();
        let PR = {
            DocEntry: objFuncPR.lbDocEntry.data('depcode'),
            RequestDate: objFuncPR.txtRequestedDate.val(),
            RequireDate: objFuncPR.txtRequireDate.val(),
            Company: objFuncPR.cbCompany.find("option:selected").text(),
            Division: objFuncPR.cbDevision.find("option:selected").text(),
            DocStatus: objFuncPR.txtStatus.val(),
            Purpose: objFuncPR.txtPurpose.val()?.trim() || "",
            DeliveryAddress: objFuncPR.txtAddress.val()?.trim() || "",
            Remark: objFuncPR.txtAdditionalSpec.val()?.trim() || "",
            IsBudget: $('input[name="budgeted"]:checked').val(),
            DeliveryMethod: $('input[name="deliveryMethod"]:checked').val(),
            IsCashAdv: $('input[name="advancePayment"]:checked').val(),
            CashAdvAmt: parseInt(objFuncPR.txtCashAdvAmt.val()) || 0,
            CCDept: $('input[name="costCenter"]:checked').val()
        };
        
        objFuncPR.formControl.removeClass("is-invalid");
        objFuncPR.formSelect.removeClass("is-invalid");
        objFuncPR.invalid.hide();
        objFuncPR.star.hide().removeClass("require");
        let isValid = true;

        if (checkMethodDelivery() == true) {
            if (!PR.DeliveryAddress) {
                objFuncPR.txtAddress.addClass("is-invalid");
                objFuncPR.errorAddress.show();
                isValid = false;
            }
        }
        if (checkAdvancePayment() == true) {
            if (!PR.CashAdvAmt) {
                objFuncPR.txtCashAdvAmt.addClass("is-invalid");
                objFuncPR.errorAmount.show();
                isValid = false;
            }
        }
        if (!PR.RequestDate) {
            objFuncPR.txtRequestedDate.addClass("is-invalid");
            objFuncPR.errorRequestedDate.show();
            objFuncPR.starRequestedDate.show().addClass("require");
            isValid = false;
        }

        if (!PR.RequireDate) {
            objFuncPR.txtRequireDate.addClass("is-invalid");
            objFuncPR.errorRequireDate.show();
            objFuncPR.starRequireDate.show().addClass("require");
            isValid = false;
        }

        if (!objFuncPR.cbCompany.val() || objFuncPR.cbCompany.val() == 0) {
            objFuncPR.cbCompany.addClass("is-invalid");
            objFuncPR.errorCompany.show();
            objFuncPR.starCompany.show().addClass("require");
            isValid = false;
        }
        if (objFuncPR.cbCompany.val() == "1") {
            if (!objFuncPR.cbDevision.val() || objFuncPR.cbDevision.val() == "0") {
                objFuncPR.cbDevision.addClass("is-invalid");
                objFuncPR.errorDevision.show();
                objFuncPR.starDevision.show().addClass("require");
                isValid = false;
            }
        }


        if (!PR.Purpose) {
            objFuncPR.txtPurpose.addClass("is-invalid");
            objFuncPR.errorPurpose.show();
            objFuncPR.starPurpose.show().addClass("require");
            isValid = false;
        }
        if ($('input[name="budgeted"]:checked').length == 0) {
            objFuncPR.errorBudgeted.show();
            objFuncPR.starBudgeted.show().addClass("require");
            isValid = false;
        };
        if ($('input[name="deliveryMethod"]:checked').length == 0) {
            objFuncPR.errorPMOD.show();
            objFuncPR.starPMOD.show().addClass("require");
            isValid = false;
        };
        if ($('input[name="advancePayment"]:checked').length == 0) {

            objFuncPR.errorAdvance.show();
            objFuncPR.starAdvance.show().addClass("require");
            isValid = false;
        };
        if ($('input[name="costCenter"]:checked').length == 0) {
            objFuncPR.errorCostCenter.show();
            objFuncPR.starCostCenter.show().addClass("require");
            isValid = false;
        };
        getAllRowValues();
        let requestData = {
            pr: PR,
            prDetails: allRowsData
        }
        if (requestData.prDetails.length == 0) {
            XSAlert({
                title: 'Information',
                message: "Please insert data row in table.",
                icon: 'notification',
                hideCancelButton: true
            }).then((results) => {
                if (results == 'ok') {
                    console.log("this iss :" + results);
                }
            })
            isValid = false;
        }
        if (!isValid) {
            hideLoader();
            return;
        }
        getJsonString("Purchase", "InsertPR", requestData, (result) => {
            if (result === 22) {
                XSAlert({
                    title: 'Information',
                    message: "Update failed. This transaction has already been integrated with SAP.",
                    icon: 'notification',
                    hideCancelButton: true
                });
                hideLoader()
            }
            if (result === 10) {
                XSAlert({
                    title: 'Success',
                    message: "Data inserted successfully.",
                    icon: 'notification',
                    hideCancelButton: true
                });
                //clearData();
                hideLoader()
            }
            if (result === 20) {
                XSAlert({
                    title: 'Success',
                    message: "Data updated successfully.",
                    icon: 'notification',
                    hideCancelButton: true
                });
                clearData();
                hideLoader()
                window.location.href = '/Purchase/PurchaseList';
            }
            if (result === 500) {
                XSAlert({
                    title: 'Error',
                    message: "Transaction failed. Please review your input and try again.",
                    icon: 'notification',
                    hideCancelButton: true
                });
                hideLoader()
            }
        },"POST");
    });
    objFuncPR.btnCancel.click(function () {
        showLoader()
        let depCodeDocEntry = parseInt(objFuncPR.lbDocEntry.data('depcode'));

        if (isNaN(depCodeDocEntry)) {
            alert("Invalid DocEntry");
            return;
        }

        if (depCodeDocEntry !== 0) {
            XSAlert({
                title: 'Confirmation',
                message: "Are you sure you want to cancel this transaction?",
                icon: 'notification',
                showCancelButton: true,
               
            }).then((results) => {
                if (results == 'ok') {
                    getJsonString("Purchase", "PRCancel", depCodeDocEntry, (result) => {
                        let alertOptions = {
                            title: 'Information',
                            icon: 'notification',
                            hideCancelButton: true
                        };
                        if (result === 11) {
                            alertOptions.message = "Cancellation failed. Please review your transaction and try again.";
                            hideLoader()
                        } else if (result === 22) {
                            alertOptions.message = "Cancellation failed. This transaction has already been integrated with SAP.";
                            hideLoader()
                        } else if (result === 1) {
                            alertOptions.message = "Cancellation successful. The transaction has been cancelled.";
                            hideLoader()
                            clearData();
                            window.location.href = '/Purchase/PurchaseList';
                            hideLoader()// only clear if successful
                        } else {
                            alertOptions.message = "Unexpected server response.";
                            hideLoader()
                        }

                        XSAlert(alertOptions);
                    }, "POST");
                } else {
                    hideLoader()
                }
            })
        } else {
            clearData();
            hideLoader()
        }
    });
    objFuncPR.btnBack.click(function () {
        showLoader()
        window.location.href = '/Purchase/PurchaseList';
        hideLoader()
    });
});
