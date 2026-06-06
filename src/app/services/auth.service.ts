import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly emailSubject = new BehaviorSubject<string>('');
  public readonly email$: Observable<string> = this.emailSubject.asObservable();

  public setEmail(email: string): void {
    this.emailSubject.next(email);
  }

  public getCurrentEmail(): string {
    return this.emailSubject.value;
  }
}
