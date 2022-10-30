const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .expect(200));
    it("responds with an object with the result true if a combination of two numbers get the target", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("responds with an object with the result false if doesn't exist a combination of two numbers gets the target", () => {
      return agent
        .post("/sumArray")
        .send({ array: [1, 2, 3, 4, 5], num: 100 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        });
    });
    it("No puedes sumar dos números iguales", () => {
      return agent
        .post("/sumArray")
        .send({ array: [1, 2, 3, 4], num: 2 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        });
    });
  });

  describe("POST /numString", () => {
    it("Responde con status 200", () => {
      return agent.post("/numString").send({ string: "Holi" }).expect(200);
    });

    it("Responde con 4 si enviamos tuki", () => {
      return agent
        .post("/numString")
        .send({ string: "tuki" })
        .then((res) => {
          expect(res.body.result).toEqual(4);
        });
    });

    it("Responde con status 400 si el string es un número", () => {
      return agent.post("/numString").send({ string: 5 }).expect(400);
    });

    it("Responde con status 400 si el string está vacío", () => {
      return agent.post("/numString").send({ string: "" }).expect(400);
    });

  });

  describe("POST /pluck", () => {
    it("Responde con status 200", () => {
      return agent
        .post("/pluck")
        .send({
          array: [
            { nombre: "Jorge", apellido: "Vega" },
            { nombre: "Asdrubal", apellido: "Mejia" },
          ],
          string: "nombre"
        })
        .expect(200);
    });

    it("Responde con la funcionalidad del pluck", () => {
      return agent
        .post("/pluck")
        .send({
          array: [
            { nombre: "Jorge", apellido: "Vega" },
            { nombre: "Asdrubal", apellido: "Mejia" },
          ],
          string: "nombre"
        })
        .then((response) => {
          expect(response.body.result).toEqual(["Jorge", "Asdrubal"]);
        });
    });

    it("Responde con status 400 si el array no es un array", () => {
      return agent.post("/pluck").send({array: "Holis", string: "nombre"}).expect(400);
    });
    
    it("Responde con status 400 si el string está vacío", () => {
      return agent.post("/pluck").send({
        array: [
          { nombre: "Jorge", apellido: "Vega" },
          { nombre: "Asdrubal", apellido: "Mejia" },
        ],
        string: ""
      }).expect(400);
    });

  });
});
