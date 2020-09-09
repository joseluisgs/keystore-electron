const fs = require('fs');
const { KeyStorage } = require('../src/modules/KeyStorage');
/**
 * Ficheros de test
 */
const mockCrypter = {
  encrypt: (text) => text,
  decrypt: (text) => text,
  setKey: (key) => { },
};

describe('KeyStorage 1', () => {
  let keyStorage;
  let keyfile;

  beforeEach(() => {
    keyfile = `${__dirname}/keyfile`;
    if (fs.existsSync(keyfile)) {
      fs.unlinkSync(keyfile);
    }
    keyStorage = new KeyStorage(mockCrypter, keyfile);
    keyStorage.openDataFile('laclave');
  });

  it('Debe crear un fichero json vacío', () => {
    const file = fs.readFileSync(keyfile, 'utf8');

    expect(file).toBe('{}');
  });

  it('Debe añadir una entrada', () => {
    const keyregister = {
      nombre: 'el nombre',
      apellidos: 'los apellidos',
    };
    keyStorage.add(keyregister);

    keyStorage.save();

    const json_string = fs.readFileSync(keyfile, 'utf8');

    const _object = JSON.parse(json_string);

    expect(_object.nombre).toBeDefined();
    expect(_object.nombre).toBe('el nombre');
    expect(_object.apellidos).toBeDefined();
    expect(_object.apellidos).toBe('los apellidos');
  });
});

describe('KeyStorage 2', () => {
  let keyStorage;
  let keyfile;

  beforeEach(() => {
    keyfile = `${__dirname}/keyfile`;
    if (fs.existsSync(keyfile)) {
      fs.unlinkSync(keyfile);
    }
    keyStorage = new KeyStorage(mockCrypter, keyfile);
    keyStorage.openDataFile('laclave');

    const keyregister1 = {
      clave1: {
        nombre: 'el nombre',
        apellidos: 'los apellidos',
      },
    };
    const keyregister2 = {
      clave2: {
        nombre: 'el nombre2',
        apellidos: 'los apellidos2',
      },
    };

    keyStorage.add(keyregister1);
    keyStorage.add(keyregister2);
    keyStorage.save();
  });

  it('Debe encontrar una entrada', () => {
    const k_found = keyStorage.find('clave1');

    expect(k_found.nombre).toBeDefined();
    expect(k_found.nombre).toBe('el nombre');
    expect(k_found.apellidos).toBeDefined();
    expect(k_found.apellidos).toBe('los apellidos');
  });

  it('debe borrar una entrada', () => {
    const k1_deleted = keyStorage.delete('clave1');

    const k1_found = keyStorage.find('clave1');

    expect(k1_found).toBeUndefined();
  });

  it('debe pillar todos los items', () => {
    const all = keyStorage.getAll();

    expect(all.clave1).toBeDefined();
    expect(all.clave2).toBeDefined();
    expect(all.clave1.nombre).toBeDefined();
    expect(all.clave1.apellidos).toBeDefined();
    expect(all.clave2.nombre).toBeDefined();
    expect(all.clave2.apellidos).toBeDefined();
  });
});
