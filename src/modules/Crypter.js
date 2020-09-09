const crypto = require('crypto');

/**
 * Clase cifrador
 */
class Crypter {
  constructor() {
    this.hash = crypto.createHash('sha256');
    this.key = null;
    this.cipher = null;
    this.decipher = null;
  }

  /**
   * Establece la clave
   * @param {string} key
   */
  setKey(key) {
    this.key = this.hash.update(key).digest('hex');
  }

  /**
   * Encripta
   * @param {string} text
   */
  encrypt(text) {
    this.cipher = crypto.createCipher('aes192', this.key);
    let encrypted = this.cipher.update(text, 'utf8', 'hex');
    encrypted += this.cipher.final('hex');
    return encrypted;
  }

  /**
   * Desecncripta
   * @param {string} text
   */
  decrypt(text) {
    this.decipher = crypto.createDecipher('aes192', this.key);
    let decrypted = this.decipher.update(text, 'hex', 'utf8');
    decrypted += this.decipher.final('utf8');

    return decrypted;
  }
}

module.exports.Crypter = Crypter;
