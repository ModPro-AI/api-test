import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service.js';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getAllPokemon(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.pokemonService.getAllPokemon(limit, offset);
  }

  @Get(':idOrName')
  getPokemon(@Param('idOrName') idOrName: string) {
    return this.pokemonService.getPokemon(idOrName);
  }
}
