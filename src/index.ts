import express from "express";
import UsuarioRoutes from './Routes/UsuarioRoutes'
import ExpenseRoutes from './Routes/ExpenseRoutes'
import IncomeRoutes from './Routes/IncomeRoutes'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/login', UsuarioRoutes);
app.use('/api/register', UsuarioRoutes); 
  
app.use('/api/expenses', ExpenseRoutes);
app.use('/api/getexpenses', ExpenseRoutes);
app.use('/api/deleteexpense', ExpenseRoutes);
app.use('/api/editexpense', ExpenseRoutes)


app.use('/api/incomes', IncomeRoutes)
app.use('/api/getincome', IncomeRoutes)
app.use('/api/deleteincome', IncomeRoutes)


app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  };
})


app.listen(5432, () => {
  console.log("escuchando desde el puerto 5432");
  
});
