import { Directive, OnDestroy, Type } from '@angular/core';
import { Subscription } from 'rxjs';

// tslint:disable:no-string-literal
/**
 * Async component decorator
 * used for rxjs subscriptions management
 * Should be used in combination with
 * AsyncComponent base class
 */
export function Async(): (constructor: Type<AsyncComponent>) => void {
  // tslint:disable-next-line:only-arrow-functions
  return function(constructor: Type<AsyncComponent>) {
    const originalOnDestroy = constructor.prototype['ngOnDestroy'];
    constructor.prototype['ngOnDestroy'] = function() {
      if (this['subscription']) {
        this['subscription'].unsubscribe();
      }
      originalOnDestroy.apply(this, arguments);
    };
  };
}

// tslint:enable:no-string-literal

/**
 * Async component base class
 * should be used in combinations with Async decorator
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class AsyncComponent implements OnDestroy {

  /**
   * Holds component subscriptions
   */
  private subscription: Subscription = new Subscription();

  /**
   * Your subscriptions should be wrapped with this method
   * @param sub Subscription
   */
  async(sub: Subscription): void {
    this.subscription.add(sub);
  }

  /**
   * Angular destroy life-cycle method
   */
  ngOnDestroy(): void {}

}
