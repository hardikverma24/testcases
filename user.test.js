const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

beforeEach(async () => {
  await User.deleteMany();
});

test("should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Hardik",
      email: "hardikverma@gmail.com",
      password: "Hardikv1"
    })
    .expect(201);
  console.log(response.body);
  const user = await User.findById(response.body._id);
  console.log(user);
  expect(user).not.toBeNull();
  expect(user.password.length).toBeGreaterThanOrEqual(7);
  expect(user.password.length).toBeLessThanOrEqual(20);
  expect(user.password).toMatch(/([A-Z])/);
  expect(user.password).toMatch(/([0-9])/);
});
