const connection = require('../SQL_CONECTION');
const { v4: uuidv4 } = require('uuid');


function generarFID(){
    return uuidv4();
  }

  function generarAID(){
    return uuidv4();
  }

/////////////////////create
async function CreateFood(req, res, foodData, UID) {
  try {
    // Generar un ID único para el nuevo alimento (FID)
    const FID = generarFID(); // Supongo que tienes una función para generar FID

    // Crear un objeto que representa el nuevo alimento
    const newFood = {
      FID: FID,
      UID: UID,
      Food_name: foodData.Food_name,
      Classification: foodData.Classification
    };

    // Realizar la inserción en la tabla "Foods"
    const insertQuery = `
      INSERT INTO "foods"("FID", "UID", "Food_name", "Classification")
      VALUES ($1, $2, $3, $4)
    `;
    const values = [newFood.FID, newFood.UID, newFood.Food_name, newFood.Classification];

    await connection.query(insertQuery, values);
    console.log('> Nuevo alimento ('+newFood.Food_name+' -> '+ newFood.Classification+' )');
    // Si llegamos a este punto, la inserción fue exitosa
    res.status(200).json({ message: 'Alimento creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el alimento:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}




async function GetUserFoods(req, res, UID) {
  try {
    // Consultar la base de datos para obtener FID, Food_name y Classification relacionados con un usuario específico (UID)
    const query = `
      SELECT "FID", "Food_name", "Classification"
      FROM "foods"
      WHERE "UID" = $1
    `;
    const values = [UID];

    const result = await connection.query(query, values);
    console.log('> Obteniendo Alimentos ✓ ('+UID+')');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los alimentos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}


async function UpdateFoodInformation(req, res, FID, updatedFoodData) {
  try {
    // Realizar una consulta para actualizar la información del alimento por FID
    const updateQuery = `
      UPDATE "foods"
      SET "Food_name" = $1, "Classification" = $2
      WHERE "FID" = $3
    `;
    const values = [updatedFoodData.Food_name, updatedFoodData.Classification, FID];

    const result = await connection.query(updateQuery, values);

    if (result.rowCount > 0) {
      // La información del alimento se actualizó correctamente
      console.log('> '+updatedFoodData.Food_name+' Modificado ✓ ');
      res.status(200).json({ message: 'Información del alimento actualizada exitosamente' });
    } else {
      // No se encontró un alimento con el FID proporcionado
      res.status(404).json({ error: 'No se encontró el recurso' });
    }
  } catch (error) {
    console.error('Error al actualizar información del alimento:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}



      
async function DeleteFood(req, res, FID) {
  try {
    // Realizar una consulta para eliminar un alimento por FID
    const deleteQuery = `
      DELETE FROM "foods"
      WHERE "FID" = $1
    `;
    const values = [FID];

    const result = await connection.query(deleteQuery, values);

    if (result.rowCount > 0) {
      // El alimento se eliminó correctamente
      console.log('> (' +FID + ') Eliminado ✓ ');
      res.status(200).json({ message: 'Alimento eliminado exitosamente' });
    } else {
      // No se encontró un alimento con el FID proporcionado
      res.status(404).json({ error: 'No se encontró el recurso' });
    }
  } catch (error) {
    console.error('Error al eliminar el alimento:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}





  ////////////////////////////////////////////////////////////////////////////////////// actividad

  async function CreateActivity(req, res, actData, UID) {
    try {
      
      const AID = generarFID(); // Supongo que tienes una función para generar FID
  
      const insertQuery = `
        INSERT INTO "activities"("AID", "UID", "Activitie_name", "Classification")
        VALUES ($1, $2, $3, $4)
      `;
      const values = [AID, UID, actData.Activitie_name, actData.Classification];
  
      await connection.query(insertQuery, values);
      console.log('> Nueva actividad ('+actData.Activitie_name+' -> '+ actData.Classification+' )');
      // Si llegamos a este punto, la inserción fue exitosa
      res.status(200).json({ message: 'Actividad creada exitosamente' });
    } catch (error) {
      console.error('Error al crear la actividad:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }


  async function GetActivitiesByUID(req, res, UID) {
    try {
      // Consultar la base de datos para obtener FID, Food_name y Classification relacionados con un usuario específico (UID)
      const query = `
        SELECT "AID", "Activitie_name", "Classification"
        FROM "activities"
        WHERE "UID" = $1
      `;
      const values = [UID];
  
      const result = await connection.query(query, values);
      console.log('> Obteniendo Actividades ✓ ('+UID+')');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }


  async function UpdateActivity(req, res, AID, newDataActivitie) {
    try {
      // Realizar una consulta para actualizar la información del alimento por FID
      const updateQuery = `
        UPDATE "activities"
        SET "Activitie_name" = $1, "Classification" = $2
        WHERE "AID" = $3
      `;
      const values = [newDataActivitie.Activitie_name, newDataActivitie.Classification, AID];
  
      const result = await connection.query(updateQuery, values);
  
      if (result.rowCount > 0) {
        // La información del alimento se actualizó correctamente
        console.log('> '+newDataActivitie.Activitie_name+' Modificado ✓ ');
        res.status(200).json({ message: 'Información de actividad actualizada exitosamente' });
      } else {
        // No se encontró un alimento con el FID proporcionado
        res.status(404).json({ error: 'No se encontró el recurso' });
      }
    } catch (error) {
      console.error('Error al actualizar información de la actividad:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }


  async function DeleteActivity(req, res, AID) {
    try {
      // Realizar una consulta para eliminar un alimento por FID
      const deleteQuery = `
        DELETE FROM "activities"
        WHERE "AID" = $1
      `;
      const values = [AID];
  
      const result = await connection.query(deleteQuery, values);
  
      if (result.rowCount > 0) {
        // El alimento se eliminó correctamente
        console.log('> (' +AID + ') Eliminado ✓ ');
        res.status(200).json({ message: 'Actividad eliminado exitosamente' });
      } else {
        // No se encontró un alimento con el FID proporcionado
        res.status(404).json({ error: 'No se encontró el recurso' });
      }
    } catch (error) {
      console.error('Error al eliminar :', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }



  
  ////////////////////////////////////////////////////////////////////////////////////////glucosa

  function assignCategory(glucoseLevel, valueCategories) {
    for (const category of valueCategories) {
      if (glucoseLevel >= category.Minimum_Value && glucoseLevel <= category.Maximum_Value) {
        return category.Category_Name;
      }
    }
    // Si no se encuentra ninguna categoría correspondiente, puedes asignar una categoría por defecto o manejarla de acuerdo a tus necesidades.
    return 'Sin categoría';
  }

  
  async function CreateGlucoseReading(req, res, formData, UID) {
    //obtener los valores de category
    try {
      // Consultar la base de datos para obtener los valores de categorías
      const query = `
        SELECT *
        FROM "value_Categories"
      `;
      const result = await connection.query(query); // Corregir la variable a 'result'
      //obtener la categoria  
      const category = assignCategory(formData.Glucose_level, result.rows);
      try {
      
        const RID = generarFID(); // Supongo que tienes una función para generar FID
    
        const insertQuery = `
          INSERT INTO "glucose_readings"("RID", "UID", "FID", "Cantidad", "AID", "Duration", "Glucose_level", "Category", "Registration_date", "Hour")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        const values = [RID, UID, formData.FID, formData.Cantidad, formData.AID, formData.Duration, formData.Glucose_level,
          category, formData.Registration_date, formData.Hour];
    
        await connection.query(insertQuery, values);
        console.log('> Nueva lectura Level:'+formData.Glucose_level + ' mg/dl ('+category+')');
        // Si llegamos a este punto, la inserción fue exitosa
        res.status(200).json({ message: 'Lectura creada exitosamente' });
      } catch (error) {
        console.error('Error al crear la Lectura:', error);
        res.status(500).json({ error: 'Error del servidor' });
      }
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
    
  }


  async function GetGlucoseReadings(req, res, UID) {
    try {
      // Consultar la base de datos para obtener FID, Food_name y Classification relacionados con un usuario específico (UID)
      const query = `
        SELECT *
        FROM "glucose_readings"
        WHERE "UID" = $1
      `;
      const values = [UID];
  
      const result = await connection.query(query, values);
      console.log('> Obteniendo lecturas ✓ ('+UID+')');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }



  async function getLatestGlucoseReading(req, res, UID) {

    try {
      // Consultar la base de datos para obtener FID, Food_name y Classification relacionados con un usuario específico (UID)
      const query = `
      SELECT *
FROM "glucose_readings"
WHERE "UID" = $1
ORDER BY "Registration_date" DESC, "Hour" DESC
LIMIT 1

      `;
      const values = [UID];
  
      const result = await connection.query(query, values);
      console.log('> Obteniendo ultima lecturas ✓ ('+UID+')');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }

  
  // Define la función queryPromise para realizar consultas a la base de datos y devolver una promesa
function queryPromise(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Luego, puedes definir la función UpdateGlucoseReadingByNumber y utilizar query

  async function UpdateGlucoseReadingByNumber(req, res, RID, updatedGlucoseReading) {
    try {
      // Consultar la base de datos para obtener las categorías de valores
      const query = `
        SELECT *
        FROM "value_Categories"
      `;
      const result = await connection.query(query);
  
      // Obtener la categoría
      const category = assignCategory(updatedGlucoseReading.Glucose_level, result.rows);
  
      // Actualizar el registro de glucosa en la tabla "glucose_readings"
      const updateQuery = `
        UPDATE "glucose_readings"
        SET
          "FID" = $1,
          "Cantidad" = $2,
          "AID" = $3,
          "Duration" = $4,
          "Glucose_level" = $5,
          "Category" = $6,
          "Registration_date" = $7,
          "Hour" = $8
        WHERE "RID" = $9
      `;
  
      const values = [
        updatedGlucoseReading.FID,
        updatedGlucoseReading.Cantidad,
        updatedGlucoseReading.AID,
        updatedGlucoseReading.Duration,
        updatedGlucoseReading.Glucose_level,
        category,
        updatedGlucoseReading.Registration_date,
        updatedGlucoseReading.Hour,
        RID,
      ];
  
      const updateResult = await connection.query(updateQuery, values);
  
      if (updateResult.rowCount > 0) {
        // El registro de glucosa se actualizó correctamente
        res.status(200).send('Registro de glucosa actualizado con éxito');
      } else {
        // No se encontró un registro de glucosa con el RID proporcionado
        res.status(404).send('No se encontró el registro de glucosa');
      }
    } catch (error) {
      console.error('Error al actualizar el registro de glucosa:', error);
      res.status(500).send('Error del servidor');
    }
  }
  
  
  

  async function DeleteGlucoseReading(req, res, RID) {
    
    try {
      // Realizar una consulta para eliminar un alimento por FID
      const deleteQuery = `
        DELETE FROM "glucose_readings"
        WHERE "RID" = $1
      `;
      const values = [RID];
  
      const result = await connection.query(deleteQuery, values);
  
      if (result.rowCount > 0) {
        // El alimento se eliminó correctamente
        console.log('> (' +RID + ') Eliminado ✓ ');
        res.status(200).json({ message: 'Lectura eliminado exitosamente' });
      } else {
        // No se encontró un alimento con el FID proporcionado
        res.status(404).json({ error: 'No se encontró el recurso' });
      }
    } catch (error) {
      console.error('Error al eliminar :', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }


  async function GetMostRegisteredAID(req, res, UID) {
    try {
      // Consultar la base de datos para obtener las AID más registradas
      const query = `
        SELECT "AID", COUNT("AID") as "Numero_Registros"
        FROM "glucose_readings"
        WHERE "UID" = $1
        GROUP BY "AID"
        ORDER BY "Numero_Registros" DESC
        LIMIT 10; -- Puedes ajustar este límite según tus necesidades
      `;
      const values = [UID];
  
      const result = await connection.query(query, values);
      console.log('> Obteniendo AID más registradas ✓ (' + UID + ')');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener las AID más registradas:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
  


  async function GetMostRegisteredFID(req, res, UID) {
    try {
      // Consultar la base de datos para obtener los FID más registrados
      const query = `
        SELECT "FID", COUNT("FID") as "Numero_Registros"
        FROM "glucose_readings"
        WHERE "UID" = $1
        GROUP BY "FID"
        ORDER BY "Numero_Registros" DESC
        LIMIT 10; -- Puedes ajustar este límite según tus necesidades
      `;
      const values = [UID];
  
      const result = await connection.query(query, values);
      console.log('> Obteniendo FID más registrados ✓ (' + UID + ')');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener los FID más registrados:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }

  

module.exports = {
    CreateFood, UpdateFoodInformation, DeleteFood, GetUserFoods,
    CreateActivity, GetActivitiesByUID, UpdateActivity, DeleteActivity,
    CreateGlucoseReading, GetGlucoseReadings, UpdateGlucoseReadingByNumber, DeleteGlucoseReading, getLatestGlucoseReading,
    GetMostRegisteredAID, GetMostRegisteredFID
}


