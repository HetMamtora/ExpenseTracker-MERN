const Expense = require('../models/Expense');
const User = require('../models/User');
const mongoose = require('mongoose');

//ADD EXPENSE
const addExpense = async (req, res) => {
    try{
        const {description, amount} = req.body;

        if(!req.user){
            return res.status(401).json({
                message: 'User not authorized'
            });
        }

        const expense = new Expense({
            description,
            amount,
            user: req.user.id
        });
        await expense.save();

        res.status(201).json({
            message: 'Expense saved successfully',
            expense,
        });
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    }
};

//GET ALL EXPENSES
const getAllExpenses = async(req, res) => {
    try{
        const expenses = await Expense.find({
            user: req.user.id,
        });
        res.status(200).json(expenses);
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    }
};

//UPDATE AN EXPENSE
const updateExpense = async (req, res) => {
    try{
        const {id} = req.params;
        const {description,amount} = req.body;

        const expense = await Expense.findOneAndUpdate(
            {   
                _id: id, 
                user: req.user.id
            },
            { 
                description,
                amount
            },
            { 
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or not authorized' });
        }

        res.status(200).json({
            message: 'Expense updated successfully',
            expense,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

//DELETE AN EXPENSE
const deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Expense Deleted Successfully'
        });
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    }
};

//GET ALL EXPENSES
const clearAllExpenses = async (req, res) => {
    try {
        await Expense.deleteMany({ user: req.user.id });
        res.status(200).json({
            message: 'All expenses cleared'
        });
    }catch(error){
        res.status(500).json({
            error: error.message
        });
    }
};

//SORT EXPENSES
const sortExpenses = async (req, res) => {
    try {
        const order = req.query.order === 'desc' ? -1 : 1;
        const expenses = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                },
            },
            {
                $sort: { amount: order },
            },
        ]);

        res.status(200).json(expenses);
    } catch (error) {
        console.error('Sort Expenses Error:', error.message);
        res.status(500).json({
            error: error.message,
        });
    }
};

//DELETE PROFILE + EXPENSES
const deleteUserNExpenses = async (req, res) => {
    try{
        await Expense.deleteMany({user: req.user.id});
        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({
            message: 'User and all associated Expenses are deleted successfully'
        });
    }catch(error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {addExpense, getAllExpenses, updateExpense, deleteExpense, clearAllExpenses, sortExpenses, deleteUserNExpenses};
