function formatDecimal(selector, decimalPlaces = 2) {
    $(document).on('input', selector, function () {
        let val = $(this).val().replace(/[^0-9.]/g, '');
        // Only allow one decimal point
        if ((val.match(/\./g) || []).length > 1) {
            val = val.replace(/\.+$/, '');
        }
        // Limit to the specified decimal places
        const match = val.match(new RegExp(`^(\\d+)(\\.\\d{0,${decimalPlaces}})?`));
        if (match) {
            val = match[1] + (match[2] || '');
        }
        $(this).val(val);
    });
    $(document).on('blur', selector, function () {
        let val = parseFloat($(this).val());
        if (!isNaN(val)) {
            $(this).val(val.toFixed(decimalPlaces));
        }
    });
}
function alphaNumeric(selector) {
    $(document).on('input', selector, function () {
        // Keep only a-z, A-Z, 0-9, and spaces
        let val = $(this).val().replace(/[^a-zA-Z0-9\s]/g, '');
        $(this).val(val);
    });
}

