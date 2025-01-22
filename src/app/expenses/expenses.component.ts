import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ExpensesComponent {
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
  

  addExpense() {
    if (this.description && this.amount && this.amount > 0) {
      const maxId = this.transactions.length > 0 ? Math.max(...this.transactions.map(t => t.id)) : 0;
      const newTransaction: Transaction = {
        id: maxId + 1,
        description: this.description,
        amount: this.amount,
        type: 'expense',
      };
  
      this.budgetService.addTransaction(newTransaction).subscribe(() => {
        this.transactions.push(newTransaction);
        this.description = '';
        this.amount = 0;
      });
    }
  }
  
}
