import { Controller, Get, Query } from '@nestjs/common';
import { ExtractionService } from './extraction.service';

@Controller('extract')
export class ExtractionController {
  constructor(private readonly extractionService: ExtractionService) {}

  @Get()
  async extract(@Query('searchTerm') searchTerm: string) {
    return this.extractionService.extractEntities(searchTerm);
  }
}
