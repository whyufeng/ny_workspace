const crypto = require("crypto");

const secretKey = "E101E63A77EC445F6AA4D67C4940E1D0";
const timestamp = "" + Math.floor(Date.now() / 1000);
const hmac = crypto.createHmac("sha256", secretKey);
const dataToHash = timestamp + "GET" + "/users/self/verify";

const connId = hmac.update(dataToHash).digest("base64");
console.log(timestamp);
console.log(connId);

// -57f65234
