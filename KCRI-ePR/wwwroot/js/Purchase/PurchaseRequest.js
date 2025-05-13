let allRowsData = [];

let objFuncPR = new function () {
    let today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    if (!$("#requestedDate").val()) {
        $("#requestedDate").val(today);
    }

    this.star = $(".star");
    this.checkbox = $("input[type='checkbox']");

    this.txtPRNo = $("#prNo");
    this.txtAddress = $("#Address");
    this.errorAddress = $("#errorAddress");
    this.additionalSpec = $("#additionalSpec");

    this.btnSubmit = $("#btnsubmit");
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

function triggerMethodDelivery() {
    $('input[name="deliveryMethod"]').on('change', function () {
        if ($('#deliveryAddress').is(':checked')) {
            $('#Address').prop('readonly', false);
        } else {
            $('#Address').prop('readonly', true).val("");
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
    $("input[name='advanceRequired']").click(function () {
        $("input[name='advanceRequired']").not(this).prop("checked", false);
    });
    $("input[name='costCenter']").click(function () {
        $("input[name='costCenter']").not(this).prop("checked", false);
    });
}

function updateRowNumbers() {
    $('#editableTable tbody tr').each(function (index) {
        $(this).find('.row-number').text(index + 1);
    });
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

$(document).ready(function () {
    objFuncPR.star.hide();
    objFuncPR.txtPRNo.prop('readonly', true);
    triggerMethodDelivery();
    preventCheckBox();
    formatfeild();

    ComboManager.setComboBoxItemSource(objFuncPR.cbCompany, staticData.getCompanyItems(), true, false);
    ComboManager.setComboBoxItemSource(objFuncPR.cbDevision, staticData.getDevisionItems(), true, false);

    for (let i = 0; i < 10; i++) {
        $('#editableTable tbody').append(createRow(i !== 0));
    }

    updateRowNumbers();

    $('#editableTable tbody').on('click', 'tr', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    $('#editableTable tbody').on('input', 'input', function () {
        const currentRow = $(this).closest('tr');
        const inputs = currentRow.find('input[name!="LineTotal"]');
        let allFilled = true;

        inputs.each(function () {
            if ($(this).val().trim() === '') {
                allFilled = false;
                return false;
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

        let reachedIncomplete = false;

        $('#editableTable tbody tr').each(function (index, tr) {
            if (reachedIncomplete) {
                $(tr).find('input[name!="LineTotal"]').attr('readonly', true);
                return;
            }

            const rowInputs = $(tr).find('input[name!="LineTotal"]');
            const isFilled = rowInputs.toArray().every(input => $(input).val().trim() !== '');

            if (isFilled) {
                $(tr).find('input[name!="LineTotal"]').removeAttr('readonly');
            } else {
                reachedIncomplete = true;
                $(tr).find('input[name!="LineTotal"]').removeAttr('readonly');
            }
        });
    });

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


    objFuncPR.btnSubmit.click(function () {
        let PRData = {
            RequestDate: objFuncPR.txtRequestedDate.val(),
            RequireDate: objFuncPR.txtRequireDate.val(),
            Company: objFuncPR.cbCompany.find("option:selected").text(),
            Division: objFuncPR.cbDevision.find("option:selected").text(),
            DocStatus: objFuncPR.txtStatus.val(),
            Purpose: objFuncPR.txtPurpose.val(),
            DeliveryAddress: objFuncPR.txtAddress.val(),
            Remark: objFuncPR.additionalSpec.val(),
            IsBudget: $('input[name="budgeted"]:checked').val(),
            DeliveryMethod: $('input[name="deliveryMethod"]:checked').val(),
            IsCashAdv: $('input[name="advanceRequired"]:checked').val(),
            CCDept: $('input[name="costCenter"]:checked').val()
        };
        
        objFuncPR.formControl.removeClass("is-invalid");
        objFuncPR.formSelect.removeClass("is-invalid");
        objFuncPR.invalid.hide();
        objFuncPR.star.hide().removeClass("require");

        let isValid = true;

        if (checkMethodDelivery() == true) {
            if (!PRData.Address) {
                objFuncPR.txtAddress.addClass("is-invalid");
                objFuncPR.errorAddress.show();
                isValid = false;
            }
        }
        if (!PRData.RequestDate) {
            objFuncPR.RequestDate.addClass("is-invalid");
            objFuncPR.errorRequestedDate.show();
            objFuncPR.starRequestedDate.show().addClass("require");
            isValid = false;
        }

        if (!PRData.RequireDate) {
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
        if (!objFuncPR.cbDevision.val() || objFuncPR.cbDevision.val() == 0) {
            objFuncPR.cbDevision.addClass("is-invalid");
            objFuncPR.errorDevision.show();
            objFuncPR.starDevision.show().addClass("require");
            isValid = false;
        }

        if (!PRData.Purpose) {
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
        if ($('input[name="advanceRequired"]:checked').length == 0) {

            objFuncPR.errorAdvance.show();
            objFuncPR.starAdvance.show().addClass("require");
            isValid = false;
        };
        if ($('input[name="costCenter"]:checked').length == 0) {
            objFuncPR.errorCostCenter.show();
            objFuncPR.starCostCenter.show().addClass("require");
            isValid = false;
        };
        if (!isValid) {
            return;
        }
        if (allRowsData.length == 0) {
            XSAlert({
                title: 'Information',
                message: "Please insert data row in table.",
                icon: 'notification',
                hideCancelButton: true
            });
        }
        console.log(PRData);
        $.ajax({
            url: '/Purchase/InsertPR',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(PRData),
            success: function (result) {
                console.log(result);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
  
    });
    // Auto-calculate Amount = Quantity × UnitPrice
    $('#editableTable').on('input', 'input[name="Quantity"], input[name="UnitPrice"]', function () {
        const row = $(this).closest('tr');
        const qty = parseFloat(row.find('input[name="Quantity"]').val()) || 0;
        const price = parseFloat(row.find('input[name="UnitPrice"]').val()) || 0;
        row.find('input[name="LineTotal"]').val((qty * price).toFixed(2));
    });
});
