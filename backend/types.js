//for zod validations
const zod = require("zod");

//1. create todo
const createTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const updateTodo = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodo,
  updateTodo,
};
