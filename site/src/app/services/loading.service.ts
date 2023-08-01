import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
  public loading: boolean = false;

  iniciar(): void {
    this.loading = true;
  }

  finalizar(): void {
    this.loading = false;
  }
}
