import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { FormBuscaService } from 'src/app/shared/services/form-busca.service';
import { PassagensService } from 'src/app/busca/services/passagens.service';
import {
  DadosBusca,
  Destaques,
  Passagem,
} from 'src/app/core/types/type';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss'],
})
export class BuscaComponent implements OnInit {
  passagens: Passagem[] = [];
  destaques?: Destaques;

  constructor(
    private passagensService: PassagensService,
    private formBuscaService: FormBuscaService
  ) {}

  ngOnInit(): void {
    const buscaPadrao: DadosBusca = {
      dataIda: new Date().toISOString(),// só a data (YYYY-MM-DD)
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: 'Executiva',
    };

    const busca = this.formBuscaService.formEstaValido
      ? this.formBuscaService.obterDadosBusca()
      : buscaPadrao;

    this.buscarPassagens(busca);
  }

  busca(ev: DadosBusca) {
    console.log('🔎 Busca enviada:', ev);
    this.buscarPassagens(ev);
  }

  private buscarPassagens(dadosBusca: DadosBusca): void {
    this.passagens = []; // limpa visualmente antes de carregar

    this.passagensService
      .getPassagens(dadosBusca)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('📦 Resposta:', res);

        this.passagens = res.resultado;

        // Atualiza filtro de preço no formulário
        this.formBuscaService.formBusca.patchValue({
          precoMin: res.precoMin,
          precoMax: res.precoMax,
        });

        this.obterDestaques();
      });
  }

  private obterDestaques(): void {
    this.destaques = this.passagensService.obterPassagensDestaques(this.passagens);
  }
}
