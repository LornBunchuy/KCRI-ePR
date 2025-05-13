var ComboManager = new function () {
    this.setComboBoxItemSource = function (selbox, items, addEmptyItem, useTextOnly) {
        if (!items) {
            items = [{ ItemValue: 0, ItemText: 'No item to show' }];
        }

        selbox.empty();
        if (addEmptyItem) {
            selbox.append(
                $('<option />')
                    .text('N/A')
                    .val(0)
            );
        }

        var c = null, i = 0;
        while (i < items.length) {
            c = items[i];

            if (!c) break;
            if (useTextOnly) {
                var a = c.ItemText;
                selbox.append(
                    $('<option />')
                        .text(a)
                        .val(a)
                );
            } else {
                selbox.append(
                    $('<option />')
                        .text(c.ItemText)
                        .val(c.ItemValue)
                );
            }
            i++;
        }
    };
    this.setSelectedItemFirst = function (selbox, items, selectedValue) {
        console.log('Items received:', items); // Log all items
        console.log('Selected value:', selectedValue); // Log the selected value

        if (!selectedValue) {
            this.setComboBoxItemSource(selbox, items, false, false);
            return;
        }
        const selectedItem = items.find(item => item.ItemValue == selectedValue);
        const otherItems = items.filter(item => item.ItemValue != selectedValue);
        const reorderedItems = selectedItem ? [selectedItem, ...otherItems] : items;
        this.setComboBoxItemSource(selbox, reorderedItems, false, false);

        if (selectedItem) {
            selbox.val(selectedValue).trigger('change');
            console.log('Selected item set in ComboBox');
        }
    };
};