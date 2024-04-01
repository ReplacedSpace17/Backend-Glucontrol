const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// Enable CORS for all routes
app.use(cors());

const SERVER_PORT = process.env.ServerPORT || 5000;
// Configurar bodyParser para analizar el cuerpo de las solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//IMPORTS
const { InsertarUsuarios } = require('./Module1/Module1Functions');
const { Login } = require('./Module2/Module2Function');
const { EditUserInformation, GetUserInformation, DeleteUserAccount, test } = require('./Module3/Module3Function');
const { CreateFood, UpdateFoodInformation, DeleteFood, GetUserFoods,
  CreateActivity, GetActivitiesByUID, UpdateActivity, DeleteActivity,
  CreateGlucoseReading, GetGlucoseReadings, UpdateGlucoseReadingByNumber, DeleteGlucoseReading, getLatestGlucoseReading,
  GetMostRegisteredAID, GetMostRegisteredFID } = require('./Module4/Module4Functions');

const UID_Session = require('./variablesGlobales');
//-------------------------------------END POINTS----------------------------
//------------------------------------------------------------- MODULO 1
//////- REGISTRAR
app.post('/api/Module1/Login/Insert', async (req, res) => {
  //Método para registrar al usuario
  const formData = req.body;
  //console.log(formData);

  InsertarUsuarios(req, res, formData);

});
//------------------------------------------------------------- MODULO 2
//////- login
app.post('/api/Module2/Login', async (req, res) => {
  //Método para registrar al usuario
  const formData = req.body;
  const UID = await Login(req, res, formData);
  UID_Session.setGlobalUid(UID);
  //console.log(UID_Session.getGlobalUid());
});

//------------------------------------------------------------- MODULO 3
//////- Modify user
app.put('/api/Module3/EditUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a editar
  const dataUpdate = req.body; // Datos actualizados del usuario
  EditUserInformation(req, res, UID, dataUpdate);
  // Realizar una consulta para actualizar los datos del usuario en la base de datos
});

// Obtener info del usuario
app.get('/api/Module3/GetUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a consultar
  console.log("EL UID DADO ES: " + UID);
  GetUserInformation(req, res, UID);
});

// Endpoint para eliminar cuenta de usuario por UID
app.delete('/api/Module3/DeleteUser/:UID', async (req, res) => {
  const UID = req.params.UID; // Obtener el UID del usuario a eliminar
  DeleteUserAccount(req, res, UID);
});



//------------------------------------------------------------- MODULO 4
///////////////////////////////////////////////////////foods
// Endpoint para crear un nuevo alimento
app.post('/api/Module4/CreateFood', async (req, res) => {
  const actData = req.body; // Datos del nuevo alimento a crear
  const UID = UID_Session.getGlobalUid();
  CreateFood(req, res, actData, UID);
});

// Endpoint para obtener la lista de alimentos de un usuario por UID
app.get('/api/Module4/GetUserFoods', async (req, res) => {
  const UID = UID_Session.getGlobalUid(); // Obtener el UID del usuario
  GetUserFoods(req, res, UID);
});

// Endpoint para actualizar información de un alimento por FID
app.put('/api/Module4/UpdateFood/:FID', async (req, res) => {
  const FID = req.params.FID; // Obtener el FID del alimento a actualizar
  const updatedFoodData = req.body; // Datos actualizados del alimento
  UpdateFoodInformation(req, res, FID, updatedFoodData);
});

// Endpoint para eliminar un alimento por FID
app.delete('/api/Module4/DeleteFood/:FID', async (req, res) => {
  const FID = req.params.FID; // Obtener el FID del alimento a eliminar
  DeleteFood(req, res, FID);
});






//////////////////////////////////actividad
// Endpoint para crear una nueva actividad
app.post('/api/Module4/CreateActivity', async (req, res) => {
  const newActivityData = req.body; // Datos de la nueva actividad
  const UID = UID_Session.getGlobalUid();
  CreateActivity(req, res, newActivityData, UID);
});

// Endpoint para obtener las actividades de un usuario por su UID
app.get('/api/Module4/GetActivities', async (req, res) => {
  //const UID = req.params.UID; // Obtener el UID del usuario
  const UID = UID_Session.getGlobalUid();
  GetActivitiesByUID(req, res, UID);
});

// Endpoint para actualizar una actividad por su AID
app.put('/api/Module4/UpdateActivity/:AID', async (req, res) => {
  const AID = req.params.AID; // Obtener el AID de la actividad a actualizar
  const updatedActivityData = req.body; // Datos actualizados de la actividad
  UpdateActivity(req, res, AID, updatedActivityData);
});

// Endpoint para eliminar una actividad por su AID
app.delete('/api/Module4/DeleteActivity/:AID', async (req, res) => {
  const AID = req.params.AID; // Obtener el AID de la actividad a eliminar
  DeleteActivity(req, res, AID);
});








/////////////////////// glucosa
//add
app.post('/api/Module4/CreateGlucoseReading', async (req, res) => {
  const newGlucoseReading = req.body; // Datos de la nueva lectura de glucosa
  const UID = UID_Session.getGlobalUid();
  CreateGlucoseReading(req, res, newGlucoseReading, UID);
});

//obtener lecturas
app.get('/api/Module4/GetGlucoseReadings', async (req, res) => {
  const UID = UID_Session.getGlobalUid(); // Obtener el UID del usuario
  GetGlucoseReadings(req, res, UID);
});

app.get('/api/Module4/GetGlucoseReadingsLast', async (req, res) => {
  const UID = UID_Session.getGlobalUid(); // Obtener el UID del usuario
  getLatestGlucoseReading(req, res, UID);
});

app.put('/api/Module4/UpdateGlucoseReading/:Number', async (req, res) => {
  const Number = req.params.Number; // Obtener el Number del registro de glucosa
  const updatedGlucoseReading = req.body; // Datos actualizados del registro de glucosa
  UpdateGlucoseReadingByNumber(req, res, Number, updatedGlucoseReading);
});
//eliminar lecturas
app.delete('/api/Module4/DeleteGlucoseReading/:RID', async (req, res) => {
  const RID = req.params.RID; // Obtener el Number del registro de glucosa a eliminar
  DeleteGlucoseReading(req, res, RID);
});


//obtener actividad mas registrada
// Obtener AID más registradas
app.get('/api/Module4/GetMostRegisteredAID', async (req, res) => {
  const UID = UID_Session.getGlobalUid(); // Obtener el UID del usuario
  GetMostRegisteredAID(req, res, UID);
});


// Obtener FID más registrados
app.get('/api/Module4/GetMostRegisteredFID', async (req, res) => {
  const UID = UID_Session.getGlobalUid(); // Obtener el UID del usuario
  GetMostRegisteredFID(req, res, UID);
});


// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Obtener info del usuario
app.post('/test', async (req, res) => {
  const formData = req.body; // Datos de la nueva actividad
  console.log("Entro");
  console.log(formData);
  //test(req, res);
});

// Inicia el servidor
app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);

});
