const express = require('express');
const userService = require("./user.service");

const router = express.Router();

// GET /user
router.get('/user', async (req, res) => {
    // #swagger.tags = ['Usuario']
    try {
        params = JSON.parse(req.headers['params']);

        let paginated = await userService.paginated(params);
        return res.status(200).send(paginated);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// GET /user/:id
router.get("/user/:id", async (req, res) => {
    // #swagger.tags = ['Usuario']
    try {
        const userId = req.params.id;
        const user = await userService.findOneById(userId);
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// POST /user
router.post("/user", async (req, res) => {
    // #swagger.tags = ['Usuario']
    try {
        const newUser = req.body;
        console.log(newUser);
        const user = await userService.save(newUser);
        return res.status(201).send(user);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

// PUT /user/:id
router.put("/user/:id",  async (req, res) => {
    // #swagger.tags = ['Usuario']
    try {
      const userId = req.params.id;
      const updatedUser = req.body;
      const user = await userService.update(userId, updatedUser);
      return res.status(200).send(user);
  
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
});

// DELETE /user/:id
router.delete("/user/:id", async (req, res) => {
    // #swagger.tags = ['Usuario']
    try {
      const userId = req.params.id;
      await userService.remove(userId);
      return res.status(200).send("Usuario eliminado correctamente.");
  
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
});

module.exports = router;