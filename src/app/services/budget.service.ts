import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:3000/transactions'; 
  private transactions: Transaction[] = [];
  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.transactions);

  constructor(private http: HttpClient) {
    this.fetchTransactions().subscribe(); 
  }

  fetchTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      tap((transactions) => {
        this.transactions = transactions;
        this.transactionsSubject.next(this.transactions);
      })
    );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction).pipe(
      tap((newTransaction) => {
        this.transactions.push(newTransaction);
        this.transactionsSubject.next(this.transactions);
      })
    );
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  calculateTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  calculateTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getRemainingBudget(): number {
    return this.calculateTotalIncome() - this.calculateTotalExpenses();
  }
}
