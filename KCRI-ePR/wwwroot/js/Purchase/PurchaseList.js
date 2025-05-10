
$(document).ready(function () {
    $('#purchaseTable').DataTable({
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        order: [[1, 'desc']] // Sort by Date descending
    });
    });