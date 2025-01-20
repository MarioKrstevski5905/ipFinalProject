import { Routes } from '@angular/router';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';
import { IncomeComponent } from './income/income.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
    { path: '', redirectTo: '/budget-summary', pathMatch: 'full' },  
    { path: 'budget-summary', component: BudgetSummaryComponent },
    { path: 'income', component: IncomeComponent },
    { path: 'expenses', component: ExpensesComponent }
];
