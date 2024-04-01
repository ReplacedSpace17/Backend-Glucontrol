const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');

function generarTokenID() {
  return uuidv4();
}

function InsertarUsuarios(req, res, data) {
  // Generar token
  const token = generarTokenID();

  // Crear objetos con los datos
  const dataPersonal = {
    UID: token,
    Nombre: data.Nombre,
    ApellidoPaterno: data.ApellidoPaterno,
    ApellidoMaterno: data.ApellidoMaterno,
    FechaNacimiento: data.FechaNacimiento,
    Altura: data.Altura,
    Peso: data.Peso,
    IMC: data.IMC
  };
  const dataUsuarios = {
    UID: token,
    Email: data.Email,
    Password: data.Pass
  };

  // Iniciar la inserción en la tabla "Personal_information"
  connection.query(
    'INSERT INTO "personal_information" ("UID", "Nombre", "ApellidoPaterno", "ApellidoMaterno", "FechaNacimiento", "Altura", "Peso", "IMC") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      dataPersonal.UID,
      dataPersonal.Nombre,
      dataPersonal.ApellidoPaterno,
      dataPersonal.ApellidoMaterno,
      dataPersonal.FechaNacimiento,
      dataPersonal.Altura,
      dataPersonal.Peso,
      dataPersonal.IMC
      
    ],
    (error, results) => {
      if (error) {
        console.error('Error al realizar el INSERT en Personal_information:', error);
        res.sendStatus(500);
      } else {
        // Iniciar la inserción en la tabla "Users" después del éxito en "Personal_information"
        connection.query(
          'INSERT INTO "users" ("UID", "Email", "Password") VALUES ($1, $2, $3)',
          [dataUsuarios.UID, dataUsuarios.Email, dataUsuarios.Password],
          (error, results) => {
            if (error) {
              console.error('Error al realizar el INSERT en Users:', error);
              res.sendStatus(500);
            } else {
              console.log("> Usuario agregado: " + dataUsuarios.Email);
              // Después de ambas consultas exitosas, envía la respuesta
              res.sendStatus(201);
            }
          }
        );
      }
    }
  );
}

module.exports = {
  InsertarUsuarios
};
