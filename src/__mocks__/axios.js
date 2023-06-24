export default {
    create: jest.fn(() => ({
      // Puedes personalizar esto según tus necesidades
      get: jest.fn(() => Promise.resolve({})),
      post: jest.fn(() => Promise.resolve({})),
      // Agrega otras funciones que necesites simular
    })),
  };
  