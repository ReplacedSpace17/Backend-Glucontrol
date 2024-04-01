CREATE TABLE "users" (
  "UID" VARCHAR(255) PRIMARY KEY,
  "Email" VARCHAR(255),
  "Password" VARCHAR(255)
);

CREATE TABLE "personal_information" (
  "UID" VARCHAR(255) PRIMARY KEY,
  "Nombre" VARCHAR(255),
  "ApellidoPaterno" VARCHAR(255),
  "ApellidoMaterno" VARCHAR(255),
  "FechaNacimiento" DATE,
  "Altura" INT,
  "Peso" INT,
  "IMC" DOUBLE PRECISION
);

CREATE TABLE "foods" (
  "FID" VARCHAR(255) PRIMARY KEY,
  "UID" VARCHAR(255),
  "Food_name" VARCHAR(255),
  "Classification" VARCHAR(255)
);

CREATE TABLE "activities" (
  "AID" VARCHAR(255) PRIMARY KEY,
  "UID" VARCHAR(255),
  "Activitie_name" VARCHAR(255),
  "Classification" VARCHAR(255)
);

CREATE TABLE "value_Categories" (
  "Category_Name" VARCHAR(255) PRIMARY KEY,
  "Minimum_Value" INT,
  "Maximum_Value" INT
);

CREATE TABLE "glucose_readings" (
  "RID" VARCHAR(255) PRIMARY KEY,
  "UID" VARCHAR(255),
  "FID" VARCHAR(255),
  "Cantidad" VARCHAR(255),
  "AID" VARCHAR(255),
  "Duration" INT,
  "Glucose_level" INT,
  "Category" VARCHAR(255),
  "Registration_date" DATE,
  "Hour" time
);


/*
user: admin@admin.com
pass:  Javier12345


token UID: 
e7786597-f773-4494-926e-f9e87332105a


//////////////////////////////////////////////////////////SEED DATA
-- Agregar un usuario en la tabla "users"
INSERT INTO "users" ("UID", "Email", "Password")
VALUES ('e7786597-f773-4494-926e-f9e87332105a', 'admin@admin.com', 'bd57085c42c7a6b15d1e09e990d3638cbc6bb515fae4010939b37fd6886674bb');

-- Agregar información personal en la tabla "personal_information"
INSERT INTO "personal_information" ("UID", "Nombre", "ApellidoPaterno", "ApellidoMaterno", "FechaNacimiento", "Altura", "Peso", "IMC")
VALUES ('e7786597-f773-4494-926e-f9e87332105a', 'Juan', 'Gómez', 'López', '1990-03-15', 175, 70, 22.86);



-- Agregar alimentos de prueba
INSERT INTO "foods" ("FID", "UID", "Food_name", "Classification")
VALUES ('1', 'e7786597-f773-4494-926e-f9e87332105a', '🍏 Manzana', 'Frutas');

INSERT INTO "foods" ("FID", "UID", "Food_name", "Classification")
VALUES ('2', 'e7786597-f773-4494-926e-f9e87332105a', '🍗 Pollo a la parrilla', 'Proteínas');

INSERT INTO "foods" ("FID", "UID", "Food_name", "Classification")
VALUES ('3', 'e7786597-f773-4494-926e-f9e87332105a', '🥬 Ensalada de espinacas', 'Verduras');

INSERT INTO "foods" ("FID", "UID", "Food_name", "Classification")
VALUES ('4', 'e7786597-f773-4494-926e-f9e87332105a', '🍕 Pizza', 'Dulces');

INSERT INTO "foods" ("FID", "UID", "Food_name", "Classification")
VALUES ('5', 'e7786597-f773-4494-926e-f9e87332105a', '🥛 Yogur', 'Productos lácteos');


-- Agregar actividades de prueba
INSERT INTO "activities" ("AID", "UID", "Activitie_name", "Classification")
VALUES ('1', 'e7786597-f773-4494-926e-f9e87332105a', '🚶‍♂️ Caminata', 'Ejercicio');

INSERT INTO "activities" ("AID", "UID", "Activitie_name", "Classification")
VALUES ('2', 'e7786597-f773-4494-926e-f9e87332105a', '🖥️ Trabajo de oficina', 'Trabajo');

INSERT INTO "activities" ("AID", "UID", "Activitie_name", "Classification")
VALUES ('3', 'e7786597-f773-4494-926e-f9e87332105a', '🏊‍♂️ Natación', 'Deporte');

INSERT INTO "activities" ("AID", "UID", "Activitie_name", "Classification")
VALUES ('4', 'e7786597-f773-4494-926e-f9e87332105a', '📝 Lectura', 'Estudiar');

INSERT INTO "activities" ("AID", "UID", "Activitie_name", "Classification")
VALUES ('5', 'e7786597-f773-4494-926e-f9e87332105a', '🌠 Descanso', 'Reposo');


INSERT INTO public."value_Categories"(
	"Category_Name", "Minimum_Value", "Maximum_Value")
	VALUES 	('Bajo', 0, 70),
  ('Normal', 71, 100),
  ('Alto', 101, 140),
  ('Muy alto', 141, 2000);





---pendiente
-- Insertar 20 registros de lecturas de glucosa en la tabla glucose_readings con categorías
INSERT INTO glucose_readings ("RID", "UID", "FID", "Cantidad", "AID", "Duration", "Glucose_level", "Category", "Registration_date", "Hour")
VALUES
  ('1', 'e7786597-f773-4494-926e-f9e87332105a', 'Pollo ', '200', 'Pescar', 120, 120, 'normal', '2023-10-23', '09:30:00'),
  ('2', 'e7786597-f773-4494-926e-f9e87332105a', 'Pasta', '300', 'Nadar', 90, 140, 'alto', '2023-10-24', '10:15:00'),
  ('3', 'e7786597-f773-4494-926e-f9e87332105a', 'Ensalada', '150', 'Correr', 60, 100, 'normal', '2023-10-25', '08:45:00'),
  ('4', 'e7786597-f773-4494-926e-f9e87332105a', 'Salmón', '250', 'Yoga', 75, 130, 'normal', '2023-10-26', '16:20:00'),
  ('5', 'e7786597-f773-4494-926e-f9e87332105a', 'Arroz', '180', 'Ciclismo', 100, 115, 'normal', '2023-10-27', '14:00:00'),
  ('6', 'e7786597-f773-4494-926e-f9e87332105a', 'Carne', '220', 'Levantamiento de pesas', 45, 125, 'normal', '2023-10-28', '18:30:00'),
  ('7', 'e7786597-f773-4494-926e-f9e87332105a', 'Verduras', '160', 'Escalada', 150, 110, 'alto', '2023-10-29', '11:45:00'),
  ('8', 'e7786597-f773-4494-926e-f9e87332105a', 'Pavo', '190', 'Baile', 70, 135, 'normal', '2023-10-30', '21:15:00'),
  ('9', 'e7786597-f773-4494-926e-f9e87332105a', 'Sopa', '120', 'Jardinería', 85, 145, 'alto', '2023-10-31', '07:00:00'),
  ('10', 'e7786597-f773-4494-926e-f9e87332105a', 'Atún', '270', 'Tenis', 110, 115, 'normal', '2023-11-01', '13:30:00'),
  ('11', 'e7786597-f773-4494-926e-f9e87332105a', 'Papas', '170', 'Natación', 95, 125, 'normal', '2023-11-02', '19:45:00'),
  ('12', 'e7786597-f773-4494-926e-f9e87332105a', 'Cerdo', '210', 'Senderismo', 80, 130, 'normal', '2023-11-03', '10:00:00'),
  ('13', 'e7786597-f773-4494-926e-f9e87332105a', 'Hamburguesa', '230', 'Boxeo', 70, 140, 'normal', '2023-11-04', '16:30:00'),
  ('14', 'e7786597-f773-4494-926e-f9e87332105a', 'Pescado', '250', 'Fútbol', 100, 115, 'normal', '2023-11-05', '15:10:00'),
  ('15', 'e7786597-f773-4494-926e-f9e87332105a', 'Ensalada', '140', 'Voleibol', 60, 105, 'normal', '2023-11-06', '08:15:00'),
  ('16', 'e7786597-f773-4494-926e-f9e87332105a', 'Salmón', '260', 'Patinaje', 95, 120, 'normal', '2023-11-07', '17:45:00'),
  ('17', 'e7786597-f773-4494-926e-f9e87332105a', 'Arroz', '190', 'Baloncesto', 80, 135, 'normal', '2023-11-08', '14:50:00'),
  ('18', 'e7786597-f773-4494-926e-f9e87332105a', 'Carne', '220', 'Levantamiento de pesas', 55, 145, 'alto', '2023-11-09', '18:00:00'),
  ('19', 'e7786597-f773-4494-926e-f9e87332105a', 'Verduras', '160', 'Natación sincronizada', 120, 110, 'alto', '2023-11-10', '11:30:00');

*/

