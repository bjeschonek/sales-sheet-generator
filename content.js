// Function to extract data from the page
function getDataFromPage() {
    const data = {};
  
    // Replace the selectors below with actual selectors from the VinSolutions page
    data.customerName = document.querySelector('.customer-name')?.innerText || '';
    data.vehicleModel = document.querySelector('.vehicle-model')?.innerText || '';
    data.purchaseDate = document.querySelector('.purchase-date')?.innerText || '';
    // Add more fields as necessary
  
    return data;
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getData') {
      const data = getDataFromPage();
      sendResponse({ data });
    }
  });
  