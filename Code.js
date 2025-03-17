function checkGoCardLess() {
  var recordId = 'recnPHGUAvVaYrwkg'; // Get the Record ID from AU2
  //New comment added
  if (!recordId) {
    Logger.log("Record ID is empty.");
    return false;
  }

  var baseId = "appBwIpTiua9aUx8h";
  var apiKey = "patWr2WaklDHkdGm4.566a05d298fc2a69726e2ae1281a2ed9930e949f02bd8bc8bd0a63d737d4d22c";
  var tableName = "Condomínios"; // Airtable Table Name

  var url = `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`;
  
  var options = {
    method: "get",
    headers: {
      "Authorization": "Bearer " + apiKey
    },
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch(url, options=options);
    var responseCode = response.getResponseCode();
    Logger.log(response);

    if (responseCode !== 200) {
      Logger.log("Error fetching record: " + response.getContentText());
      return false;
    }

    var data = JSON.parse(response.getContentText());
    var status = data.fields["Requisition status simple"]; // Extract the field value
    Logger.log(status);
    if (status === "Conta conectada") {
      Logger.log("True");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    Logger.log("Error: " + error);
    return false;
  }
}