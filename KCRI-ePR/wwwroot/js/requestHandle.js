function getJsonString(moduleName, actionName, data, callback, method = "GET") {
    if (!moduleName || !actionName) {
        console.error("Module name and action name are required.");
        return;
    }

    const url = `/${moduleName}/${actionName}`;

    $.ajax({
        url: url,
        type: method.toUpperCase(),
        contentType: "application/json",
        data: method.toUpperCase() === "GET" ? null : data, // Only send body for non-GET
        dataType: "json",
        success: function (response) {
            callback(response);
        },
        error: function (xhr, status, error) {
            console.error(`AJAX Error [${status}]: ${xhr.responseText || error}`);
        }
    });
}
