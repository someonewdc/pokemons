import { inject, Injectable } from '@angular/core';
import { CardPageApiService } from '@app/pages/card-page/services/card-page-api.service';
import { createGetCardQuery } from '@app/pages/card-page/card-page.queries';
import { delay, map } from 'rxjs';

@Injectable()
export class CardPageFacadeService {
  private api = inject(CardPageApiService);

  public fetchCard$(id: string) {
    const getCardQuery = createGetCardQuery(id);
    return this.api.getCardInfo$(getCardQuery).pipe(
      map(response => response.card),
      delay(300)
    );
  }
}
