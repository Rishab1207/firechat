var CryptoJS = require("crypto-js");
var crypto = require("crypto");

const message =
	"Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:";

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(message, "secret key 123").toString();

console.log(ciphertext);

// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log({ originalText, bytes }); // 'my message'

const buffer = crypto.randomBytes(256);
console.log(
	`${buffer.length} bytes of random data: ${buffer.toString("base64")}`
);
