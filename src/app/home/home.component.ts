import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocaoService } from 'src/app/home/services/promocao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private servicoPromocao: PromocaoService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    alert('Back-End hospedado na fly.io com serviço gratuito, aguarde de 2-5 segundos para inicializar o serviço.')
    this.servicoPromocao.listar()
      .subscribe(
        resposta => {
          console.log(resposta)
        }
      )
  }
  navegarParaBusca(ev: any) {
    this.router.navigate(['busca']);
  }
}
