const { Login } = require('../Module2/Module2Function');
const UID_Session = require('../variablesGlobales'); // Asegúrate de proporcionar la ruta correcta
const connection = require('../SQL_CONECTION');

describe('Login', () => {
  // Simular objetos req y res
  const mockReq = {};
  const mockRes = {
    status: jest.fn(),
    json: jest.fn(),
  };

  // Mock de datos para la prueba
  const testData = {
    Email: 'test@example.com',
    Password: 'password123',
  };

  it('debería manejar inicio de sesión exitoso', async () => {
    // Simular la respuesta de la base de datos
    const mockRows = [{ UID: 'fakeUID', Password: 'password123' }];
    mockReq.body = testData;
    jest.spyOn(mockRes, 'status').mockReturnValue(mockRes);
    jest.spyOn(mockRes, 'json').mockReturnValue(mockRes);
    jest.spyOn(connection, 'query').mockResolvedValue({ rows: mockRows });

    await Login(mockReq, mockRes, testData);

    // Verificar que la respuesta sea la esperada
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Inicio de sesión exitoso', user: mockRows[0] });
  });


  
  

});
