import {
  ApolloLink,
  FetchResult,
  NextLink,
  Observable,
  Operation,
} from "apollo-link";

export type SuccessResponse = FetchResult;

/**
 * Callback to be triggered when an error occurs within the link stack.
 */
export interface SuccessHandler {
  (data: SuccessResponse): Observable<FetchResult> | void;
}

export function onSuccess(successHandler: SuccessHandler): ApolloLink {
  return new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      let sub: any;
      let retriedSub: any;
      let retriedResult: any;

      try {
        sub = forward(operation).subscribe({
          next: (result) => {
            retriedResult = successHandler(result);
            observer.next(result);
          },
          error: (errorValue) => {
            observer.error(errorValue);
          },
          complete: () => {
            // disable the previous sub from calling complete on observable
            // if retry is in flight.
            if (!retriedResult) {
              observer.complete.bind(observer)();
            }
          },
        });
      } catch (e) {
        observer.error(e);
      }

      return () => {
        if (sub) sub.unsubscribe();
        if (retriedSub) sub.unsubscribe();
      };
    });
  });
}

export class SuccessLink extends ApolloLink {
  private link: ApolloLink;
  constructor(errorHandler: SuccessHandler) {
    super();
    this.link = onSuccess(errorHandler);
  }

  public request(
    operation: Operation,
    forward: NextLink
  ): Observable<FetchResult> | null {
    return this.link.request(operation, forward);
  }
}
