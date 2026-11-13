import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PokemonService {
  /**
   * TODO (Task 1): Return a page of Pokémon from PokeAPI.
   * Response shape: see "API contract" in the root README.
   */
  getAllPokemon(limit?: number, offset?: number) {
    throw new NotImplementedException(
      `GET /pokemon is not implemented yet (limit=${limit}, offset=${offset})`,
    );
  }

  /**
   * TODO (Task 2): Return a single Pokémon by id or name.
   * Unknown Pokémon must respond with 404.
   */
  getPokemon(idOrName: string) {
    throw new NotImplementedException(
      `GET /pokemon/${idOrName} is not implemented yet`,
    );
  }
}
