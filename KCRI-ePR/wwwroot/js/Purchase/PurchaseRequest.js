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

    // Cost Center selections
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
        let hasValue = false; // Flag to track if any input has a value

        $(this).find('td').each(function (index) {
            const input = $(this).find('input');
            if (input.length > 0) {
                const name = input.attr('name'); // Get input field name (e.g., Description[])
                const value = input.val().trim(); // Get value of the input

                // If any value is non-empty, set the flag to true
                if (value !== '') {
                    hasValue = true;
                }

                rowData[name] = value; // Store value in rowData object
            }
        });

        // If the row contains any value, add it to the list
        if (hasValue) {
            allRowsData.push(rowData);
        }
    });

    return allRowsData; // Log all rows with non-empty columns
}

// Function to add a new row
function createRow(readOnly = true) {
    return `
<tr>
    <td class="row-number"></td>
    <td><input type="text" class="txtDescription" name="Description" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtUOM" name="UOM" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtQty" name="Quantity" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtUnitPrice" name="UnitPrice" ${readOnly ? "readonly" : ""} /></td>
    <td><input type="text" class="txtAmount" name="Amount" readonly /></td>
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
        // Only enable Address if #deliveryAddress is checked
        console.log($('input[id="deliveryAddress"]:checked').length);// Apply on load
        if ($('#deliveryAddress').is(':checked')) {
            $('#Address').prop('readonly', false);
        } else {
            $('#Address').prop('readonly', true).val(""); // Optionally clear
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
    let totalQty= 0.00;
    let totalAmount = 0.00;
    $('#editableTable tbody tr').each(function () {
        const qty = parseFloat($(this).find('input[name="Quantity"]').val());
        const amount = parseFloat($(this).find('input[name="Amount"]').val());

        if (!isNaN(qty)) totalQty += qty;
        if (!isNaN(amount)) totalAmount += amount;
    });

    $('#totalB').text(totalQty.toFixed(2));
    $('.totalAmount').text(totalAmount.toFixed(2));
}
$(document).ready(function () {
    let hasAnyValue = false;
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

    // Event: Row selection
    $('#editableTable tbody').on('click', 'tr', function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    });
    $('#editableTable tbody').on('input', 'input', function () {
       
        const currentRow = $(this).closest('tr');
        const inputs = currentRow.find('input[name!="Amount"]');

        let allFilled = true;
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                allFilled = false;
                return false; // break loop
            }
        });

        // Auto-calculate amount if Quantity and UnitPrice are filled
        const qty = parseFloat(currentRow.find('input[name="Quantity"]').val());
        const price = parseFloat(currentRow.find('input[name="UnitPrice"]').val());
        if (!isNaN(qty) && !isNaN(price)) {
            currentRow.find('input[name="Amount"]').val((qty * price).toFixed(2));
            updateTotals();
        } else {
            currentRow.find('input[name="Amount"]').val('');
        }

        let reachedIncomplete = false;

        // Enforce read-only state for rows below
        $('#editableTable tbody tr').each(function (index, tr) {
            if (reachedIncomplete) {
                $(tr).find('input[name!="Amount"]').attr('readonly', true);
                return;
            }

            const rowInputs = $(tr).find('input[name!="Amount"]');
            const isFilled = rowInputs.toArray().every(input => $(input).val().trim() !== '');

            if (isFilled) {
                $(tr).find('input[name!="Amount"]').removeAttr('readonly');
            } else {
                reachedIncomplete = true;
                $(tr).find('input[name!="Amount"]').removeAttr('readonly');
            }
        });
    });
    objFuncPR.btnAddRow.click(function () {
        const selectedRow = $('#editableTable tbody tr.selected');
        let newRow = $(createRow(true)); // start as readonly

        if (selectedRow.length) {
            selectedRow.after(newRow);
        } else {
            $('#editableTable tbody').append(newRow);
        }

        updateRowNumbers();

        // Auto-select the new row
        newRow.addClass('selected').siblings().removeClass('selected');
        updateTotals();
        // Re-evaluate editable states
        $('#editableTable tbody input:first').trigger('input');
    });



    // Remove Row
    objFuncPR.btnRemoveRow.click(function () {
        const selectedRow = $('#editableTable tbody tr.selected');
        const rowCount = $('#editableTable tbody tr').length;

        if (selectedRow.length) {
            let hasAnyValue = false;

            // Check if selected row has any filled value
            selectedRow.find('input[name!="Amount"]').each(function () {
                if ($(this).val().trim() !== '') {
                    hasAnyValue = true;
                    return false; // exit loop early
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
                            debugger
                            updateRowNumbers();
                            updateTotals(); // ✅ recalculate totals
                        }
                    }
                });
            } else {
                if (rowCount > 1) {
                    selectedRow.remove();
                    updateRowNumbers();
                    updateTotals(); // ✅ recalculate totals
                } else {
                    XSAlert({
                        title: 'Warning',
                        message: "You check-in false!!. Please try again.",
                        icon: 'warning',
                        hideCancelButton: true
                    });
                }
            }
        } else {
            XSAlert({
                title: 'Information',
                message: "Please select row you want delete.",
                icon: 'notification',
                hideCancelButton: true
            });
        }
    });

    objFuncPR.btnSubmit.click(function () {
        let PRData = {
            RequestedDate: objFuncPR.txtRequestedDate.val(),
            RequireDate: objFuncPR.txtRequireDate.val(),
            Company: objFuncPR.cbCompany.find("option:selected").text(),
            Devision: objFuncPR.cbDevision.find("option:selected").text(),
            Status: objFuncPR.txtStatus.val(),
            Purpose: objFuncPR.txtPurpose.val(),
            Address: objFuncPR.txtAddress.val(),
            additionalSpec: objFuncPR.additionalSpec.val(),
            Budgeted: $('input[name="budgeted"]:checked').val(),
            DeliveryMethod: $('input[name="deliveryMethod"]:checked').val(),
            AdvanceRequired: $('input[name="advanceRequired"]:checked').val(),
            CostCenter: $('input[name="costCenter"]:checked').val(),
            ListDataRow: getAllRowValues(),
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
        if (!PRData.RequestedDate) {
            objFuncPR.txtRequestedDate.addClass("is-invalid");
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
        $.ajax({
            url: '/Purchase/InsertPurchaseRequest',
            type: 'POST',
            contentType: 'application/json',
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
        row.find('input[name="Amount"]').val((qty * price).toFixed(2));
    });
});
