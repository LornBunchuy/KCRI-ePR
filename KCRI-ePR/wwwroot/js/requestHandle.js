function getJsonString(moduleName, actionName, data = {}, callback = () => { }, method = "GET", headers = {}) {
    // Validate parameters
    if (typeof moduleName !== "string" || typeof actionName !== "string" || !moduleName.trim() || !actionName.trim()) {
        console.error("Valid module and action names are required.");
        return;
    }

    if (typeof callback !== "function") {
        console.error("Callback must be a function.");
        return;
    }

    const methodUpper = method.toUpperCase();
    let url = `/${encodeURIComponent(moduleName)}/${encodeURIComponent(actionName)}`;
    let ajaxData = null;

    // Build query string for GET
    if (methodUpper === "GET") {
        const query = $.param(data);
        if (query) url += `?${query}`;
    } else {
        // For POST/PUT, stringify data
        try {
            ajaxData = JSON.stringify(data || {});
        } catch (e) {
            console.error("Error serializing data:", e);
            return;
        }
    }

    // CSRF token support (optional)
    const csrfToken = $('input[name="__RequestVerificationToken"]').val();
    if (csrfToken) {
        headers["RequestVerificationToken"] = csrfToken;
    }

    // Final AJAX call
    $.ajax({
        url: url,
        type: methodUpper,
        contentType: "application/json",
        data: ajaxData,
        dataType: "json",
        headers: headers,
        success: (response) => callback(response),
        error: (xhr, status, error) => {
            const message = xhr?.responseJSON?.message || xhr?.responseText || error || "Unknown error";
            console.warn(`AJAX Error [${status}]: ${message}`);
        }
    });
}
