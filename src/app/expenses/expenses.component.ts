import { Component } from '@angular/core';
import { BudgetService } from '../budget.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class ExpensesComponent {
  description = '';
  amount = 0;

  constructor(private budgetService: BudgetService) {}

  addExpense() {
    if (this.description && this.amount > 0) {
      this.budgetService.addTransaction({
        id: Date.now(),
        description: this.description,
        amount: this.amount,
        type: 'expense'
      });
      this.description = '';
      this.amount = 0;
    }
  }
}