import { Component } from '@angular/core';
import { BudgetService } from '../budget.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class IncomeComponent {
  description = '';
  amount = 0;

  constructor(private budgetService: BudgetService) {}

  addIncome() {
    if (this.description && this.amount > 0) {
      this.budgetService.addTransaction({
        id: Date.now(),
        description: this.description,
        amount: this.amount,
        type: 'income'
      });
      this.description = '';
      this.amount = 0;
    }
  }
}