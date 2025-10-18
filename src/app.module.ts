import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './delivery/infrastructure/typeorm/package.entity';
import { DealerEntity } from './delivery/infrastructure/typeorm/dealer.entity';
import { DeliveryRouteEntity } from './delivery/infrastructure/typeorm/delivery_routes.entity';


@Module({
  imports: [DeliveryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',
      password: '123456',
      database: 'delivery',
      entities: [PackageEntity,DealerEntity,DeliveryRouteEntity], 
      synchronize: true, 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
