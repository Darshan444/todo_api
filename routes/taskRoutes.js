const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// for validation part
// router.route('/').post(validate([
//     body('title').notEmpty().withMessage("error message"),
//     body('description').notEmpty().withMessage("error message")
// ]), taskController.createTask)

module.exports = router;
