const fs = require('fs');
const crypto = require('crypto');

// Arbitrary string for AES key
const arbitraryKey = "CNRNTASDPTKRGABNCFDRLCMNI";
const iv = Buffer.alloc(16, 0);
console.log(iv);

// Function to encrypt and decrypt text using the arbitrary key
function encryptDecryptText(text, key, isEncrypt) {
    const cipher = crypto.createCipher('aes-256-cbc', key, {iv: iv});
    const decipher = crypto.createDecipher('aes-256-cbc', key, {iv: iv});
    let encryptedData;
    if (isEncrypt) {
        encryptedData = cipher.update(text, 'utf-8', 'base64');
        encryptedData += cipher.final('base64');
        return encryptedData;
    } else {
        let decryptedData = decipher.update(text, 'base64', 'utf-8');
        decryptedData += decipher.final('utf-8');
        console.log(decipher);
        return decryptedData;
    }
}

// Read the text file to encrypt
const textToEncrypt = fs.readFileSync('SecretMessage.txt', 'utf-8');

// Encrypt the text using the arbitrary key
const encryptedText = encryptDecryptText(textToEncrypt, arbitraryKey, true);
console.log('Encrypted text:', encryptedText);

// Write the encrypted text to a file
fs.writeFileSync('encrypted.txt', encryptedText, 'utf-8');
console.log('Encrypted text has been written to encrypted.txt');

// Read the encrypted text from file
const encryptedTextFromFile = fs.readFileSync('encrypted.txt', 'utf-8');

// Decrypt the text using the arbitrary key
const decryptedText = encryptDecryptText(encryptedTextFromFile, arbitraryKey, false);
console.log('Decrypted text:', decryptedText);
fs.writeFileSync('decrypted.txt', decryptedText, 'utf-8');
console.log('Decrypted text has been written to decrypted.txt');
