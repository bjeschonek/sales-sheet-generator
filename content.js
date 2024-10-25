// Function to extract data from the page
function getDataFromPage() {
    const data = {};
  
    data.customerName = document.querySelector('.customer-name')?.innerText || '';
    data.vehicleModel = document.querySelector('.vehicle-model')?.innerText || '';
    data.purchaseDate = document.querySelector('.purchase-date')?.innerText || '';
  
    return data;
  }
  
  // Listen for messages from the popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getData') {
      const data = getDataFromPage();
      sendResponse({ data });
    }
  });
  