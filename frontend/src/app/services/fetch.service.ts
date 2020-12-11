import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, takeUntil } from 'rxjs/operators';

export enum FetchStatus {
  INIT = 'INIT',
  LOADED = 'LOADED',
  IN_PROGRESS = 'IN_PROGRESS',
}

@Injectable()
export class FetchService implements OnDestroy {
  public destroy$ = new Subject();
  public error$ = new BehaviorSubject<any>(null);
  public fetchStatus$ = new BehaviorSubject<FetchStatus>(FetchStatus.INIT);

  isInStatus(status: FetchStatus): Observable<boolean> {
    return this.fetchStatus$.pipe(map((currentStatus) => currentStatus === status));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetch<T>(call: Observable<T>): Observable<T> {
    this.fetchStatus$.next(FetchStatus.IN_PROGRESS);
    this.error$.next(null);
    return call.pipe(
      finalize(() => this.fetchStatus$.next(FetchStatus.LOADED)),
      catchError((e) => {
        this.error$.next(e);
        return throwError(e);
      }),
      takeUntil(this.destroy$),
    );
  }
}
