async function putData(id, jsonData, endpoint_url) {
    const endpointUrl = `${window.location.origin}${endpoint_url}/${id}`;
    try {
       const response = await fetch(endpointUrl, {
          method: "PUT",
          headers: {
             "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
       });
       if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
       }
       return await response.json();
    } catch (error) {
       console.error("There was a problem with the fetch operation:", error);
    }
}
