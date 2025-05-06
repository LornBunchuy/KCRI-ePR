function getJsonString(moduleName, actionName, data, callback) {
    // Construct the API URL dynamically
    const url = `/${moduleName}/${actionName}`;

    // Make an AJAX call to the ASP.NET Core endpoint
    $.ajax({
        url: url,               // URL of the controller action
        type: "POST",           // HTTP method
        contentType: "application/json", // Tell the server the data type
        data: data,             // Send the JSON data to the server
        success: function (response) {
            // Call the callback with the response from the server
            callback(response);
        },
        error: function (xhr, status, error) {
            // Log errors for debugging
            console.error(`Error: ${status} - ${error}`);
        }
    });
}