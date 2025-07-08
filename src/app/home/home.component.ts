import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocaoService } from 'src/app/home/services/promocao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private servicoPromocao: PromocaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicoPromocao.listar().subscribe((resposta) => {
      console.log(resposta);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      alert(
        'Back-End hospedado na fly.io com serviço gratuito, aguarde de 2-5 segundos para inicializar o serviço.'
      );
    }, 500); // 200ms é suficiente para permitir a renderização
  }

  navegarParaBusca(ev: any) {
    this.router.navigate(['busca']);
  }
}
