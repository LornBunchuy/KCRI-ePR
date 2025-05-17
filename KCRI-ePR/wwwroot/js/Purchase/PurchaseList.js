let purchaseData = [];
const rowsPerPage = 50;
let currentPage = 1;

let PRList = new function () {
    this.mThis = this;
    this.purchaseTable = $("#purchaseTable");
    this.purchaseCol = [
        { field: 'no', title: 'No' },
        { field: 'docEntry', title: 'DocEntry', visible: false },
        {
            field: 'docNum',
            title: 'PR No',
            formatter: function (value, row) {
                return `<a href="#" id="tr-link" class="pr-link text-primary" data-docnum="${value}" style="cursor:pointer;">${value}</a>`;
            }
        },
        {
            field: 'requestDate',
            title: 'Request Date',
            formatter: function (value) {
                if (value) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-GB');
                }
                return value;
            }
        },
        {
            field: 'requireDate',
            title: 'Require Date',
            formatter: function (value) {
                if (value) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-GB');
                }
                return value;
            }
        },
        { field: 'company', title: 'Company' },
        { field: 'division', title: 'Division' },
        { field: 'purpose', title: 'Purpose' },
        { field: 'status', title: 'Status' },
        { field: 'total', title: 'Total' }
    ];
}

$(document).ready(function () {
    showLoader();

    getJsonString("Purchase", "PRList", {}, function (result) {
        if (result && Array.isArray(result)) {
            purchaseData = result.map((item, index) => {
                item.no = index + 1;
                return item;
            });

            const totalPages = Math.ceil(purchaseData.length / rowsPerPage);
            renderPagination(totalPages);
            loadPageData(currentPage);
        }

        hideLoader();
    });

    $('#cbCompany, #cbStatus, #txtFromDate, #txtToDate, #cbPageSize').on('change', function () {
        filterData();
    });

    $('#purchaseTable').on('click', '#tr-link', function (e) {
        e.preventDefault();
        showLoader();
        const row = $(this).closest('tr').data('index');
        const rowData = PRList.purchaseTable.bootstrapTable('getData')[row];
        const docEntry = parseInt(rowData.docEntry, 10);
        window.location.href = `/Purchase/PurchaseRequest?docEntry=${docEntry}`;
        hideLoader();
    });

    // jQuery pagination handler
    $(document).on('click', '.btn-page', function () {
        currentPage = parseInt($(this).data('page'));
        const totalPages = Math.ceil(purchaseData.length / rowsPerPage);
        renderPagination(totalPages);
        loadPageData(currentPage);
    });

    $(document).on('click', '.btn-previous', function () {
        if (currentPage > 1) {
            currentPage--;
            const totalPages = Math.ceil(purchaseData.length / rowsPerPage);
            renderPagination(totalPages);
            loadPageData(currentPage);
        }
    });

    $(document).on('click', '.btn-next', function () {
        const totalPages = Math.ceil(purchaseData.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPagination(totalPages);
            loadPageData(currentPage);
        }
    });
});

function filterData() {
    const company = $('#cbCompany').val();
    const status = $('#cbStatus').val();
    const fromDate = $('#txtFromDate').val();
    const toDate = $('#txtToDate').val();

    let filtered = purchaseData.filter(item => {
        let matchCompany = company === "" || item.company === company;
        let matchStatus = status === "" || item.status === status;

        let matchFromDate = true;
        if (fromDate) {
            let itemDate = new Date(item.requestDate);
            let from = new Date(fromDate);
            matchFromDate = itemDate >= from;
        }

        let matchToDate = true;
        if (toDate) {
            let itemDate = new Date(item.requestDate);
            let to = new Date(toDate);
            to.setHours(23, 59, 59, 999);
            matchToDate = itemDate <= to;
        }

        return matchCompany && matchStatus && matchFromDate && matchToDate;
    });

    filtered.forEach((item, index) => item.no = index + 1);

    let pageSize = $('#cbPageSize').val();
    if (pageSize !== "All") {
        pageSize = parseInt(pageSize);
        filtered = filtered.slice(0, pageSize);
    }

    TableManager.loadData(PRList.purchaseTable, true, true, true, filtered, PRList.purchaseCol, {
        onClickRow: function (row, $element) {
            PRList.openPurchaseRequest(row);
        }
    });
}

function renderPagination(totalPages) {
    const $pagination = $(".btn-all");
    $pagination.empty();

    // Previous button
    $('<button>')
        .addClass('btn-previous')
        .prop('disabled', currentPage === 1)
        .text('Previous')
        .appendTo($pagination);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        $('<button>')
            .addClass('btn-page')
            .addClass(i === currentPage ? 'btn-active' : 'btn-addPage')
            .data('page', i)
            .text(i)
            .appendTo($pagination);
    }

    // Next button
    $('<button>')
        .addClass('btn-next')
        .prop('disabled', currentPage === totalPages)
        .text('Next')
        .appendTo($pagination);
}

function loadPageData(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = purchaseData.slice(start, end);

    pageData.forEach((item, index) => item.no = start + index + 1);

    TableManager.loadData(PRList.purchaseTable, true, true, true, pageData, PRList.purchaseCol, {
        onClickRow: function (row, $element) {
            PRList.openPurchaseRequest(row);
        }
    });

    $('html, body').animate({
        scrollTop: $("#purchaseTable").offset().top - 100
    }, 300);
}
