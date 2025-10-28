import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './delivery/infrastructure/database/typeorm.config';


@Module({
  imports: [
    DeliveryModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
