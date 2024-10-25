document.addEventListener('DOMContentLoaded', () => {
  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    // Send a message to the content script to get data
    chrome.tabs.sendMessage(activeTab.id, { message: 'getData' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
        return;
      }

      if (response && response.data) {
        populateData(response.data);
      } else {
        console.error('No data received.');
      }
    });
  });

  // Add event listener to the export button
  document.getElementById('export-button').addEventListener('click', exportData);
});

function populateData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = '';

  for (const key in data) {
    const value = data[key];

    const itemDiv = document.createElement('div');
    itemDiv.className = 'data-item';

    const label = document.createElement('label');
    label.textContent = key;

    const select = document.createElement('select');
    select.id = key;

    // Example options - customize as needed
    const option1 = document.createElement('option');
    option1.value = value;
    option1.text = value;

    const option2 = document.createElement('option');
    option2.value = '';
    option2.text = 'Do not include';

    select.appendChild(option1);
    select.appendChild(option2);

    itemDiv.appendChild(label);
    itemDiv.appendChild(select);

    container.appendChild(itemDiv);
  }
}

function exportData() {
  const selects = document.querySelectorAll('#data-container select');
  const exportData = {};

  selects.forEach((select) => {
    if (select.value) {
      exportData[select.id] = select.value;
    }
  });

  if (Object.keys(exportData).length === 0) {
    alert('No data selected to export.');
    return;
  }

  // Send data to Google Sheets
  sendDataToGoogleSheets(exportData);
}

function sendDataToGoogleSheets(data) {
  fetch('YOUR_WEB_APP_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.result === 'Success') {
        alert('Data exported successfully!');
      } else {
        alert('Error exporting data: ' + result.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to export data.');
    });
}

