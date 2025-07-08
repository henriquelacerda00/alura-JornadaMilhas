import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    alert('Back-end hospedado na fly.io com plano gratuito, aguarde 2 - 5 segundos para inicializar o serviço.');
  }
  title = 'jornada-milhas';
}
