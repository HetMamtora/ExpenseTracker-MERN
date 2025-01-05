import React, { useState, useEffect } from 'react'
import { addExpense, deleteExpense, getAllExpenses, updateExpense, clearAllExpenses, sortExpenses } from '../api';
import ExpenseTable from './ExpenseTable';
import './Dashboard.css'
import Navbar from './Navbar';

const Dashboard = ({setAuth}) => {

    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({description:'', amount: ''});
    const [editId, setEditId] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchExpenses = async () => {
            const {data} = await getAllExpenses();
            setExpenses(data);
        };
        
        fetchExpenses();
    }, []);

    const handleChange = (e) => setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(editId){
            await updateExpense(editId, formData);
            setEditId(null);
        }else{
            await addExpense(formData);
        }

        setFormData({ description: '', amount: ''});
        
        const {data} = await getAllExpenses();
        setExpenses(data);
    }

    const handleEdit = (id, expenses) => {
        setEditId(id);
        setFormData({ description: expenses.description, amount: expenses.amount });
    }

    const handleDelete = async (id) => {
        await deleteExpense(id);
        setExpenses(expenses.filter((expense) => expense._id !== id));
        window.location.reload();
    }

    const handleClearAllExpenses = async (e) => {
        await clearAllExpenses();
        setExpenses([]);
    };

    const handleSortExpenses = async (e) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);

        const {data} = await sortExpenses({order: newSortOrder});
        setExpenses(data);
    }

    return (
            <>
                <Navbar setAuth={setAuth}/>
                
                <div className='dashboard-container'>

                    <form className='expense-form' onSubmit={handleSubmit}>
                        <input type='text' name='description' placeholder='Description' value={formData.description} onChange={handleChange}/>
                        <input type='number' name='amount' placeholder='Amount' value={formData.amount} onChange={handleChange}/>

                        <button type='submit'>{editId ? 'UPDATE EXPENSE' : 'ADD EXPENSE'}</button>
                    </form>

                    <div className='table-container'>
                        <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDelete}/>
                    </div>
                
                    <div className='container-bottom'>
                        <button className='clear-button' onClick={handleClearAllExpenses}>CLEAR ALL EXPENSES</button>
                        <button className='clear-button' onClick={handleSortExpenses}>
                            SORT <b> ({sortOrder === 'asc' ? '↑' : '↓'})</b>
                        </button>
                    </div>
                </div>
            </>
    )
}

export default Dashboard