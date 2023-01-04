import { inject, Injectable } from '@angular/core';
import { GraphQlService } from '@app/core';
import { PokemonTable } from '@app/pages/main-page/main-page.models';

@Injectable()
export class MainPageApiService {
  private graphQlService = inject(GraphQlService);

  public getCards$(query: string) {
    return this.graphQlService.query<{ cards: PokemonTable[] }>({ query });
  }
}
