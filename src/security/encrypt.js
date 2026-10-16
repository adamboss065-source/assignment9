import CryptoJS from "crypto-js";

export function encryptvalue({ value, key = process.env.ENCRYPT_KEY }) {
  return CryptoJS.AES.encrypt(value, key).toString();
}
export function dencryptvalue({ ciphervalue, key = process.env.ENCRYPT_KEY }) {
  const bytes = CryptoJS.AES.decrypt(ciphervalue, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
