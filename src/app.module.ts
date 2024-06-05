import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Brand } from './entities/brand.entity';
import { DishType } from './entities/dish-type.entity';
import { Diet } from './entities/diet.entity';
import { ExtractionService } from './extraction/extraction.service';
import { ExtractionController } from './extraction/extraction.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'admin@123',
      database: 'foodstyles',
      entities: [City, Brand, DishType, Diet],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([City, Brand, DishType, Diet]),
  ],
  controllers: [AppController, ExtractionController],
  providers: [AppService, ExtractionService],
})
export class AppModule {}
