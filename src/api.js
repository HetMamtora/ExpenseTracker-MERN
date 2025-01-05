import axios from 'axios'

const API = axios.create({baseURL: 'https://expensetrackerv1.vercel.app/api'});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');

    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

//AUTH ROUTES
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const logoutUser = (data) => API.post('/auth/logout', data);

//EXPENSE ROUTES
export const addExpense = (data) => API.post('/expenses/add', data);
export const getAllExpenses = (data) => API.get('/expenses', data);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const clearAllExpenses = () => API.delete('/expenses');
//export const sortExpenses = (data) => API.get('/expenses/sort', data);
export const sortExpenses = ({ order }) => API.get(`/expenses/sort?order=${order}`);
export const deleteUserNExpenses = () => API.delete('/expenses/delete-user');
