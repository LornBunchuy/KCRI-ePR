let PRList = new function () {
    this.purchaseTable = $("#purchaseTable");
    this.purchaseCol = [
        {
            field: 'no',
            title: 'No',
        },
        {
            field: 'docNum',
            title: 'PR No',
        },
        {
            field: 'requestDate',
            title: 'Requeste Date',
            formatter: function (value) {
                if (value) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-GB'); // 'en-GB' gives dd/mm/yyyy format
                }
                return value; // Return the original value if not a valid date
            }
        },
        {
            field: 'requireDate',
            title: 'Require Date',
            formatter: function (value) {
                if (value) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-GB'); // 'en-GB' gives dd/mm/yyyy format
                }
                return value; // Return the original value if not a valid date
            }
        },
        {
            field: 'company',
            title: 'Company',
        },
        {
            field: 'division',
            title: 'Division',
        },
        {
            field: 'purpose',
            title: 'Purpose',
        },
        {
            field: 'status',
            title: 'Status',
        },
        {
            field: 'total',
            title: 'Total',
        },
    ]
}
$(document).ready(function () {
    getJsonString("Purchase", "PRList", null, (result) => {
        if (result != null && Array.isArray(result)) {
            // Assign auto-incremented "no" field to each row
            result.forEach((item, index) => {
                item.no = index + 1;
            });
            // Now this makes 'field: no' work
            TableManager.loadData(PRList.purchaseTable, true, true, true, result, PRList.purchaseCol);
        }
    });
  
    });