import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams | { [params: string]: any };
}
@Injectable()
export class HttpService {
  constructor(protected http: HttpClient) {}

  public createDefaultOptions(): Options {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public doGet<T>(serviceUrl: string, options?: Options): Observable<T> {
    const responseOptions = this.createOptions(options);

    return this.http
      .get(serviceUrl, responseOptions)
      .pipe(map((response) => response as T));
  }

  public doPost<T, R>(
    serviceUrl: string,
    body: T,
    opts?: Options
  ): Observable<R> {
    const responseOptions = this.createOptions(opts);

    return this.http
      .post(serviceUrl, body, responseOptions)
      .pipe(map((response) => response as R));
  }

  public doPut<T, R>(
    serviceUrl: string,
    body: T,
    opts?: Options
  ): Observable<R> {
    const responseOptions = this.createOptions(opts);

    return this.http
      .put(serviceUrl, body, responseOptions)
      .pipe(map((response) => response as R));
  }

  public doGetParameters<T>(
    serviceUrl: string,
    parameters: URLSearchParams,
    opts?: Options
  ): Observable<T> {
    const responseOptions = this.createOptions(opts);

    return this.http
      .get(serviceUrl, responseOptions)
      .pipe(map((response) => response as T));
  }

  public doDelete<T>(serviceUrl: string, opts?: Options): Observable<T> {
    const responseOptions = this.createOptions(opts);

    return this.http
      .delete(serviceUrl, responseOptions)
      .pipe(map((response) => response as T));
  }

  private createOptions(opts?: Options): Options {
    const defaultOpts: Options = this.createDefaultOptions();

    if (opts) {
      opts = {
        params: opts.params || defaultOpts.params,
        headers: opts.headers || defaultOpts.headers,
      };

      if (!opts.headers?.get('Content-Type')) {
        if (defaultOpts.headers && opts.headers) {
          const contentType = defaultOpts.headers.get('Content-Type');
          if (contentType) {
            opts.headers = opts.headers.set('Content-Type', contentType);
          }
        }
      }
    } else {
      opts = defaultOpts;
    }

    return opts;
  }
}
