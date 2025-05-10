let objFuncPR = new function () {
    let today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    if (!$("#requestedDate").val()) {
        $("#requestedDate").val(today);
    }
    this.star = $(".star");
    this.checkbox = $("input[type='checkbox']");
    this.txtRequestedDate = $("#requestedDate");
    this.txtRequireDate = $("#requireDate");
    this.errorRequireDate = $("#errorRequireDate");
    this.starRequireDate = $("#starRequireDate");
    this.btnSubmit = $("#btnsubmit");
    this.btnAddRow = $("#addRow");
    this.btnRemoveRow = $("#removeRow");
    this.txtPRNo = $("#prNo"); // Store the jQuery object
    this.cbCompany = $("#company");
    this.cbDevision = $("#devision");
    this.txtStatus = $("#status");

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
    this.purpose = $("#purpose").val();

    this.formControl = $(".form-control");
    this.formSelect = $(".form-select");
    this.invalid = $(".invalid-feedback");
}();

// Function to add a new row
function createRow() {
    return `
<tr>
    <td class="row-number"></td>
    <td><input type="text" name="Description[]" /></td>
    <td><input type="text" name="UOM[]" /></td>
    <td><input type="text" name="Quantity[]" /></td>
    <td><input type="text" name="UnitPrice[]" /></td>
    <td><input type="text" name="Amount[]" readonly /></td>
</tr>`;
}

function updateRowNumbers() {
    $('#editableTable tbody tr').each(function (index) {
        $(this).find('.row-number').text(index + 1);
    });
}

$(document).ready(function () {

    let hasAnyValue = false;
    objFuncPR.star.hide();
    objFuncPR.txtPRNo.prop('readonly', true);

    objFuncPR.checkbox.click(function () {
        objFuncPR.checkbox.not(this).prop("checked", false);
    });
    ComboManager.setComboBoxItemSource(objFuncPR.cbCompany, staticData.getCompanyItems(), true, false);
    ComboManager.setComboBoxItemSource(objFuncPR.cbDevision, staticData.getDevisionItems(), true, false);
    objFuncPR.cbCompany.change(function () {
        console.log("Dropdown changed");
        ComboManager.setComboBoxItemSource(objFuncPR.cbCompany, staticData.getCompanyItems(), true, false);
    });

    

    for (let i = 0; i < 10; i++) {
        $('#editableTable tbody').append(createRow());
    }

    updateRowNumbers();
    $('#editableTable tbody').on('click', 'tr', function () {
        $(this).addClass('selected').siblings().removeClass('selected');

        const row = $(this);
        const inputs = row.find('input');
        inputs.each(function () {
            if ($(this).val().trim() !== '') {
                hasAnyValue = true;
            }
        });
    });

    objFuncPR.btnAddRow.click(function () {
        const selectedRow = $('#editableTable tbody tr.selected');

        // If a row is selected
        if (selectedRow.length) {
            selectedRow.after(createRow()); // Insert the new row after the selected row
        } else {
            $('#editableTable tbody').append(createRow()); // Insert the new row at the end
        }
        updateRowNumbers();
    });

    // Remove Row
    objFuncPR.btnRemoveRow.click(function () {
    const selectedRow = $('#editableTable tbody tr.selected');
    const rowCount = $('#editableTable tbody tr').length;
    if (selectedRow.length) {
        
        if (hasAnyValue = true) {
            XSAlert({
                title: 'Confirmation',
                message: "All fields are filled. Are you sure you want to delete this row?",
                icon: 'question',
                showCancelButton: true
            }).then((results) => {
                if (results == 'ok') {
                    if (rowCount > 1) {
                        selectedRow.remove();
                        updateRowNumbers();
                    }
                    hasAnyValue = false
                }
            });
        } else {
            if (rowCount > 1) {
                selectedRow.remove();
                updateRowNumbers();
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
            RequireDate: objFuncPR.txtRequireDate.val()
        };
        objFuncPR.formControl.removeClass("is-invalid");
        objFuncPR.formSelect.removeClass("is-invalid");
        objFuncPR.invalid.hide();
        objFuncPR.star.hide().removeClass("require");

        let isValid = true;
        if (!PRData.RequireDate) {
            objFuncPR.txtRequireDate.addClass("is-invalid");
            objFuncPR.errorRequireDate.show();
            objFuncPR.starRequireDate.show().addClass("require");
            isValid = false;
        }
        if (!isValid) {
            return;
        }
    });


    // Auto-calculate Amount = Quantity × UnitPrice
    $('#editableTable').on('input', 'input[name="Quantity[]"], input[name="UnitPrice[]"]', function () {
        const row = $(this).closest('tr');
        const qty = parseFloat(row.find('input[name="Quantity[]"]').val()) || 0;
        const price = parseFloat(row.find('input[name="UnitPrice[]"]').val()) || 0;
        row.find('input[name="Amount[]"]').val((qty * price).toFixed(2));
    });
});
