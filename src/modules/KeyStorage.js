const fs = require('fs');

/** KeyStorage */
class KeyStorage {
  constructor(crypter, keyFilepath) {
    this.crypter = crypter;
    this.keyFilepath = keyFilepath;
    this.dataObject = null;
  }

  /**
   * Abre el fichero de almacén
   * @param {string} key
   */
  openDataFile(key) {
    this.crypter.setKey(key);

    // Si el fichero no existe lo creamos
    if (!fs.existsSync(this.keyFilepath)) {
      fs.writeFileSync(this.keyFilepath, this.crypter.encrypt('{}'));
    }

    const data = fs.readFileSync(this.keyFilepath, 'utf8');
    const decodedData = this.crypter.decrypt(data);

    // Lanza una excepción si falla

    this.dataObject = JSON.parse(decodedData);
  }

  /**
   * Añade un registro
   * @param {*} keyRegister
   */
  add(keyRegister) {
    Object.assign(this.dataObject, keyRegister);
  }

  /**
   * Salva el almacen
   */
  save() {
    const dataJSON = JSON.stringify(this.dataObject);
    const encodedData = this.crypter.encrypt(dataJSON);

    fs.writeFileSync(this.keyFilepath, encodedData, 'utf8');
  }

  /**
   * Encuetra una clave
   * @param {string} name
   */
  find(name) {
    return this.dataObject[name];
  }

  /**
   * Obtiene todos
   */
  getAll() {
    return this.dataObject;
  }

  /**
   * borra
   * @param {string} name
   */
  delete(name) {
    return delete this.dataObject[name];
  }
}

module.exports.KeyStorage = KeyStorage;
