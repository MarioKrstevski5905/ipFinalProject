import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class IncomeComponent {
  description = '';
  amount: number = 0;
  transactions: Transaction[] = [];

  constructor(private budgetService: BudgetService) {
    this.loadTransactions(); 
  }

  private loadTransactions() {
    this.budgetService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });
  }
  

  addIncome() {
    if (this.description && this.amount && this.amount > 0) {
      const maxId = this.transactions.length > 0 ? Math.max(...this.transactions.map(t => t.id)) : 0;
      const newTransaction: Transaction = {
        id: maxId + 1,
        description: this.description,
        amount: this.amount,
        type: 'income',
      };
  
      this.budgetService.addTransaction(newTransaction).subscribe(() => {
        this.transactions.push(newTransaction);
        this.loadTransactions();
        this.description = '';
        this.amount = 0;
      });
    }
  }
  
  
}
