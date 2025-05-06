var TableManager = new function () {
    this.loadData = function (table, clickToSelect, singleSelect, maintainSelected, tblData, columnArray) {
        var ds = table.data('hasLoaded');

        if (ds == undefined || ds == null) {
            table.bootstrapTable({
                data: tblData,
                showCheckBox: true,
                clickToSelect: clickToSelect,
                maintainSelected: maintainSelected,
                singleSelect: singleSelect,
                columns: columnArray,
            });
            table.data('hasLoaded', 'true');
        } else {
            table.bootstrapTable('load', tblData);
        }
    };

    this.getData = function (table) {
        return table.bootstrapTable('getData');
    };

    this.getSelectedRows = function (table) {
        var selRows = table.bootstrapTable('getSelections');
        return selRows;
    };

    this.getSelectedValues = function (table, targetField) {
        var values = '';
        var selRows = table.bootstrapTable('getSelections');
        if (targetField == undefined || targetField == null) {
            return null;
        } else {
            for (var i = 0; i < selRows.length; i++) {
                values += ((values == '') ? '' : ',') + selRows[i][targetField];
            }
        }
        return values;
    };
};