const { BrowserWindow } = require('electron');
/**
 * Nos sirve para crear y lanzar una ventana modal
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
  // console.log(browserWindow);
  const templateMenu = [
    {
      label: 'Almacenes',
      submenu: [
        {
          label: 'Crear almacén',
          accelerator: 'CommandOrControl+N',
          click() {
            // console.log('Crear almacén');
            // Lanzamos crear almacén
            const url = `file://${__dirname}/renderers/form_create_filestorage.html`;
            createFormModal(browserWindow, 400, 350, url);
          },
        },
        {
          label: 'Cargar almacén',
          accelerator: 'CommandOrControl+L',
          click() {
            // console.log('Crear almacén');
            // Lanzamos cargar almacen
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
            // console.log('Crear clave');
            // Lanzamos editar clave
            const url = `file://${__dirname}/renderers/form_add_keyregister.html`;
            createFormModal(browserWindow, 500, 550, url);
          },
        },
        {
          label: 'Editar clave',
          accelerator: 'CommandOrControl+E',
          click() {
            console.log('Editar clave');
          },
        },
        {
          label: 'Eliminar clave',
          accelerator: 'CommandOrControl+D',
          click() {
            console.log('Eliminar clave');
          },
        },
      ],
    },
    {
      label: 'Ver',
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
