import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.css'],
  standalone: true
})
export class BudgetSummaryComponent implements OnInit {
  totalIncome = 0;
  totalExpenses = 0;
  remainingBudget = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getTransactions().subscribe(() => {
      this.updateBudgetSummary();
    });
  }

  updateBudgetSummary() {
    this.totalIncome = this.budgetService.calculateTotalIncome();
    this.totalExpenses = this.budgetService.calculateTotalExpenses();
    this.remainingBudget = this.budgetService.getRemainingBudget();
  }
}