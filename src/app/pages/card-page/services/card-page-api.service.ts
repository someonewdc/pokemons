import { inject, Injectable } from '@angular/core';
import { GraphQlService } from '@app/core';
import { PokemonDetail } from '@app/pages/card-page/card-page.models';

@Injectable()
export class CardPageApiService {
  private graphQlService = inject(GraphQlService);

  public getCardInfo$(query: string) {
    return this.graphQlService.query<{ card: PokemonDetail }>({ query });
  }
}
