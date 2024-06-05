import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { Brand } from './entities/brand.entity';
import { DishType } from './entities/dish-type.entity';
import { Diet } from './entities/diet.entity';

@Injectable()
export class ExtractionService {
  constructor(
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(DishType) private dishTypeRepo: Repository<DishType>,
    @InjectRepository(Diet) private dietRepo: Repository<Diet>,
  ) {}

  async extractEntities(searchTerm: string) {
    const terms = searchTerm.split(' ');
    const results = [];

    for (const term of terms) {
      const city = await this.cityRepo.findOne({ where: { name: term } });
      const brand = await this.brandRepo.findOne({ where: { name: term } });
      const dishType = await this.dishTypeRepo.findOne({
        where: { name: term },
      });
      const diet = await this.dietRepo.findOne({ where: { name: term } });

      if (city) results.push({ type: 'city', entity: city });
      if (brand) results.push({ type: 'brand', entity: brand });
      if (dishType) results.push({ type: 'dishType', entity: dishType });
      if (diet) results.push({ type: 'diet', entity: diet });
    }

    return results;
  }
}
