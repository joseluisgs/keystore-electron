/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const { ipcRenderer } = require('electron');
// const { Crypter } = require('../modules/Crypter');
// const { KeyStorage } = require('../modules/KeyStorage');

document.getElementById('btn_cancel').onclick = () => {
  window.close();
};

document.getElementById('btn_ok').onclick = () => {
  const title = document.getElementById('title').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const url = document.getElementById('url').value;
  const note = document.getElementById('note').value;

  const id = `_${Math.random().toString(36).substr(2, 9)}`;

  const register = {};

  register[id] = {
    title,
    username,
    password,
    url,
    note,
  };

  // Enviamos el registro a añadir al proceso principal
  ipcRenderer.send('add-keyregister', register);

  window.close();
};
