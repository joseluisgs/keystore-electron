// eslint-disable-next-line import/no-extraneous-dependencies
const { BrowserWindow } = require('electron');

/**
 * Ventana Modal
 * browserWindow, la panatalla padre
 * width, anchura pantalla modal
 * height altura pantalla modal
 * url, url del código a cargar en el proceso renderer
 */
function createFormModal(browserWindow, width, height, url) {
  const winForm = new BrowserWindow({
    width,
    height,
    frame: false,
    parent: browserWindow,
    modal: true,
  });
  winForm.loadURL(url);
}

// browserWindow es la pantalla sobre la que se quiere crear el menú
const mainMenu = (browserWindow) => {
  const templateMenu = [
    {
      label: 'Almacenes',
      submenu: [
        {
          label: 'Crear almacén',
          accelerator: 'CommandOrControl+N',
          click() {
            const url = `file://${__dirname}/renderers/form_create_filestorage.html`;
            createFormModal(browserWindow, 400, 350, url);
          },
        },
        {
          label: 'Cargar almacén',
          accelerator: 'CommandOrControl+L',
          click() {
            const url = `file://${__dirname}/renderers/form_load_filestorage.html`;
            createFormModal(browserWindow, 400, 350, url);
          },
        },
        {
          label: 'Salir',
          role: 'quit',
        },
      ],
    },
    {
      label: 'Acciones',
      submenu: [
        {
          label: 'Añadir clave',
          accelerator: 'CommandOrControl+B',
          click() {
            const url = `file://${__dirname}/renderers/form_add_keyregister.html`;
            createFormModal(browserWindow, 500, 550, url);
          },
        },
        {
          label: 'Editar clave',
          accelerator: 'CommandOrControl+E',
          click() {
            browserWindow.webContents.send('edit-keyregister');
          },
        },
        {
          label: 'Eliminar clave',
          accelerator: 'CommandOrControl+D',
          click() {
            browserWindow.webContents.send('delete-keyregister');
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];

  return templateMenu;
};

module.exports.mainMenu = mainMenu;
