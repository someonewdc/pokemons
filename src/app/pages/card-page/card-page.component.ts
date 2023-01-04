import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonDetail } from '@app/pages/card-page/card-page.models';
import { CardPageFacadeService } from '@app/pages/card-page/services/card-page-facade.service';
import { CommonModule } from '@angular/common';
import { CardPageApiService } from '@app/pages/card-page/services/card-page-api.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  providers: [CardPageFacadeService, CardPageApiService],
})
export class CardPageComponent {
  public pokemon$: Observable<PokemonDetail>;

  public readonly mockPropertiesCount = Array.from({ length: 4 });

  constructor(
    private route: ActivatedRoute,
    private facade: CardPageFacadeService
  ) {
    const pokemonId = this.route.snapshot.paramMap.get('id')!;
    this.pokemon$ = this.facade.fetchCard$(pokemonId);
  }
}