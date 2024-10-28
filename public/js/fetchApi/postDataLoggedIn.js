async function postDataLoggedIn(jsonData, endpoint_url, token) {
    const endpointUrl = `${window.location.origin}${endpoint_url}`;
    try {
        const response = await fetch(endpointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(jsonData),
        });
        if (response.status === 401) {
            alert("Vaša relácia vypršala. Prosím, prihláste sa znova.");
            logOutUser();
            return;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}
