import { DataSource } from 'typeorm';
import { City } from './entities/city.entity';
import { Brand } from './entities/brand.entity';
import { DishType } from './entities/dish-type.entity';
import { Diet } from './entities/diet.entity';
import * as fs from 'fs';
import * as path from 'path';

const readJsonFile = (filePath: string) => {
  const fullPath = path.join(__dirname, '..', 'data', filePath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(data);
};

// Utility function to convert string IDs to number
const convertIdToNumber = (data: { id: string; name: string }[]) => {
  return data.map((item) => ({
    ...item,
    id: parseInt(item.id, 10),
  }));
};

const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'admin@123',
  database: 'foodstyles',
  entities: [City, Brand, DishType, Diet],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const cities = readJsonFile('cities.json');
  const brands = readJsonFile('brands.json');
  const dishTypes = readJsonFile('dish-types.json');
  const diets = readJsonFile('diets.json');

  await AppDataSource.getRepository(City).save(convertIdToNumber(cities));
  await AppDataSource.getRepository(Brand).save(convertIdToNumber(brands));
  await AppDataSource.getRepository(DishType).save(
    convertIdToNumber(dishTypes),
  );
  await AppDataSource.getRepository(Diet).save(convertIdToNumber(diets));

  await AppDataSource.destroy();
}

seed().then(() => console.log('Seeding completed'));
