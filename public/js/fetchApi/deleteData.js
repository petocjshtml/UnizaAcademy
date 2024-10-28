async function deleteData(id, endpoint_url) {
    const endpointUrl = `${window.location.origin}${endpoint_url}/${id}`;
    try {
       const response = await fetch(endpointUrl, {
          method: "DELETE",
          headers: {
             "Content-Type": "application/json",
          },
       });
       if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
       }
       return await response.json();
    } catch (error) {
       console.error("There was a problem with the fetch operation:", error);
    }
}
