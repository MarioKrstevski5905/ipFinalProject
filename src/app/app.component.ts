import { Component } from '@angular/core';
import { IncomeComponent } from './income/income.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { BudgetSummaryComponent } from './budget-summary/budget-summary.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [IncomeComponent, ExpensesComponent, BudgetSummaryComponent]
})
export class AppComponent {}