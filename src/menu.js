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
            console.log('Crear almacén');
          },
        },
        {
          label: 'Cargar almacén',
          accelerator: 'CommandOrControl+L',
          click() {
            console.log('Crear almacén');
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
            console.log('Crear clave');
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
