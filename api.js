// ⚠️ เปลี่ยน URL นี้เป็น URL ของคุณที่ได้จาก Google Apps Script
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby9FSG5MTIz-VH_xBELd4mwvCFQrtnCNeHMkMAfjlYHKdmeBVxbcfDD6B8kqgsa-zHZ/exec";

/**
 * ฟังก์ชันเรียก Backend API
 */
async function callAPI(functionName, ...args) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        function: functionName,
        args: args
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'เชื่อมต่อเซิร์ฟเวอร์ล้มเหลว: ' + error.message };
  }
}

// ฟังก์ชันเรียกใช้งานแต่ละฟีเจอร์
const API = {
  loadDataForDate: (date, lpId, forceRefresh = false) => 
    callAPI('loadDataForDate', date, lpId, forceRefresh),
    
  saveVerifiedLPData: (lpId, lpName, checkDate, palletId, verifiedList) => 
    callAPI('saveVerifiedLPData', lpId, lpName, checkDate, palletId, verifiedList),
    
  deleteVerifiedLPItem: (checkDate, palletId, barcode) => 
    callAPI('deleteVerifiedLPItem', checkDate, palletId, barcode),
    
  loadVerifiedPalletsForTruck: (checkDate, forceRefresh = false) => 
    callAPI('loadVerifiedPalletsForTruck', checkDate, forceRefresh),
    
  saveTruckLoadData: (checkDate, truckReg, truckRound, palletList) => 
    callAPI('saveTruckLoadData', checkDate, truckReg, truckRound, palletList)
};