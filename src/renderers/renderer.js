/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');
const path = require('path');
const { Crypter } = require('../modules/Crypter');
const { KeyStorage } = require('../modules/KeyStorage');
const { GUI } = require('../modules/GUI');

let crypter; let
  keyStorage;
const gui = new GUI(document);
gui.init();

// Carga del fichero del almacén, recibe los datos
ipcRenderer.on('load-keystorage', (e, args) => {
  const { file } = args;
  const { key } = args;

  crypter = new Crypter();
  keyStorage = new KeyStorage(crypter, file);
  keyStorage.openDataFile(key);

  gui.setKeyStorage(keyStorage);
  gui.updateRegisterList(keyStorage.getAll());
  gui.setAppTitle(`Almacén de claves ACME (${path.parse(file).base})`);
});

// Añadir registros al almacén, recibe los datos
ipcRenderer.on('add-keyregister', (e, register) => {
  keyStorage.add(register);
  keyStorage.save();
  gui.updateRegisterList(keyStorage.getAll());
});

// Editar un registro
ipcRenderer.on('edit-keyregister', () => {
  gui.editRegister();
});

// Eliminar un registro
ipcRenderer.on('delete-keyregister', () => {
  gui.deleteRegister();
});
