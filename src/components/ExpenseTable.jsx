import React from 'react'
import './ExpenseTable.css'
import { FaPencilRuler, FaTrashAlt } from 'react-icons/fa'

const ExpenseTable = ({expenses, onEdit, onDelete}) => {

    const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    return(
    <table>
        <thead>
            <tr>
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>ACTIONS</th>
            </tr>
        </thead>

        <tbody>
            {expenses.map((expenses) => (
                <tr key={expenses._id}>
                    <td>{expenses.description}</td>
                    <td>{expenses.amount}</td>

                    <td>
                        <div className='action-buttons'>
                            <span><FaPencilRuler onClick={() => onEdit(expenses._id, expenses)}/></span>
                            <span><FaTrashAlt onClick={() => onDelete(expenses._id)}/></span>
                        </div>
                    </td>
                </tr>
            ))}

            <tr>
                <td><strong>Total</strong></td>
                <td colSpan="2"><strong>Rs.{totalExpenses.toFixed(2)}</strong></td>
            </tr>
        </tbody>
    </table>
    )
}

export default ExpenseTable