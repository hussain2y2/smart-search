import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { Brand } from '../entities/brand.entity';
import { DishType } from '../entities/dish-type.entity';
import { Diet } from '../entities/diet.entity';

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
      const searchQuery = { where: { name: ILike(`%${term}%`) } };

      const city = await this.cityRepo.findOne(searchQuery);
      if (city) {
        results.push({ city: { id: city.id, name: city.name } });
      }

      const brand = await this.brandRepo.findOne(searchQuery);
      if (brand) {
        results.push({ brand: { id: brand.id, name: brand.name } });
      }

      const dishType = await this.dishTypeRepo.findOne(searchQuery);
      if (dishType) {
        results.push({ dishType: { id: dishType.id, name: dishType.name } });
      }

      const diet = await this.dietRepo.findOne(searchQuery);
      if (diet) results.push({ diet: { id: diet.id, name: diet.name } });
    }

    return results;
  }
}
