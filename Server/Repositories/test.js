const fs = require('fs');
const documentPath = 'Z:\\PC\\Festival Tycoon\\UserFiles\\Bands\\mysong.wav';

// Check if the file exists
if (fs.existsSync(documentPath)) {
  console.log('File exists.');
} else {
  console.log('File does not exist.');
}