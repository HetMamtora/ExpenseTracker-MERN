const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addExpense, getAllExpenses, updateExpense, deleteExpense, clearAllExpenses, sortExpenses, deleteUserNExpenses} = require('../controllers/expenseController');
const router = express.Router();

router.post('/add', authMiddleware, addExpense);
router.get('/sort', authMiddleware, sortExpenses);
router.get('/', authMiddleware, getAllExpenses);
router.delete('/', authMiddleware, clearAllExpenses);
router.delete('/delete-user', authMiddleware, deleteUserNExpenses);

router.put('/:id', authMiddleware, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);

module.exports = router;
