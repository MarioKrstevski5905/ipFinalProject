import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private transactions: Transaction[] = [];
  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.transactionsSubject.next(this.transactions);
  }

  getTransactions() {
    return this.transactionsSubject.asObservable();
  }

  calculateTotalIncome() {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  calculateTotalExpenses() {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getRemainingBudget() {
    return this.calculateTotalIncome() - this.calculateTotalExpenses();
  }
}