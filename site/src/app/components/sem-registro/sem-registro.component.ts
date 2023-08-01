import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sem-registro',
  templateUrl: './sem-registro.component.html',
  styleUrls: ['./sem-registro.component.css']
})
export class SemRegistroComponent {
  @Input() exibir: boolean = true;
}
