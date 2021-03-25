const fs = require('fs');
fs.writeFileSync('./.env',`baseUrl=${process.env.baseUrl}\n`)