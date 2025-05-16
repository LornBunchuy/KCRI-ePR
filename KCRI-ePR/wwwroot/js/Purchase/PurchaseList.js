let PRList = new function () {
    this.mThis = this;
    this.purchaseTable = $("#purchaseTable");
    this.purchaseCol = [
        {
            field: 'no',
            title: 'No',
        },
        {
            field: 'docEntry',
            title: 'DocEntry',
            visible: false
        },
        {
            field: 'docNum',
            title: 'PR No',
            formatter: function (value, row) {
                return `<a href="#" id="tr-link" class="pr-link text-primary" data-docnum="${value}" style="cursor:pointer;">${value}</a>`;
            }
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
            TableManager.loadData(PRList.purchaseTable, true, true, true, result, PRList.purchaseCol, {
                onClickRow: function (row, $element) {
                    // Pass data to form when row is clicked
                    PRList.openPurchaseRequest(row);
                }
            });
        }
    });
    $('#purchaseTable').on('click', '#tr-link', function (e) {
        e.preventDefault();

        // Get the row index from the clicked row
        const row = $(this).closest('tr').data('index');

        // Get the row data from the Bootstrap Table
        const rowData = PRList.purchaseTable.bootstrapTable('getData')[row];

        // Convert docEntry to an integer
        const docEntry = parseInt(rowData.docEntry, 10);

        // Redirect to the Purchase action with the docEntry
        window.location.href = `/Purchase/PurchaseRequest?docEntry=${docEntry}`;


        // Log the clicked row data for debugging
        console.log('Clicked Row Data:', rowData);
    });

  });