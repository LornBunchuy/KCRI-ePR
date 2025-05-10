let staticData = new function () {

    let companyItem = [
        { ItemValue: 1, ItemText: "KCRI" },
        { ItemValue: 2, ItemText: "CHLL" }
    ];

    // Add a method to get the companyItem data
    this.getCompanyItems = function () {
        return companyItem;
    }

    let devisionItem = [
        { ItemValue: 1, ItemText: "CGs" },
        { ItemValue: 2, ItemText: "MSG" }
    ];

    // Add a method to get the companyItem data
    this.getDevisionItems = function () {
        return devisionItem;
    }

}