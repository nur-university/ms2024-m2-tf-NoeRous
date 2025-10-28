import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DeliveryController } from './presentation/delivery.controller';
// Repositorios de infraestructura
import { DealerTypeOrmRepositoryImpl } from './infrastructure/repositories/dealer.repository';
import { PackageTypeOrmRepositoryImpl } from './infrastructure/repositories/package.repository';
import { DeliveryRouteTypeOrmRepositoryImpl } from './infrastructure/repositories/delivery-route.repository';
import { AssignPackageToDealerHandler } from './aplication/handlers/assing-package-to-dealer.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './infrastructure/typeorm/package.entity';
import { DeliveryRouteEntity } from './infrastructure/typeorm/delivery_routes.entity';
import { DealerEntity } from './infrastructure/typeorm/dealer.entity';
import { CreateDealerHandler } from './aplication/handlers/create-dealer.handler';
import { DeliverPackageHandler } from './aplication/handlers/deliver-package.handler';
import { CreatePackageHandler } from './aplication/handlers/create-package.handler';
import { PatientEntity } from './infrastructure/typeorm/patient.entity';
import { CreateRouteWithPackagesHandler } from './aplication/handlers/create-route-with-packages.handler';
import { UnitOfWorkRepositoryImpl } from './infrastructure/repositories/unit-of-work.repository';


@Module({
  imports: [CqrsModule,
     TypeOrmModule.forFeature([PackageEntity,DeliveryRouteEntity,DealerEntity,PatientEntity]),
  ],
  controllers: [DeliveryController],
  providers: [
    AssignPackageToDealerHandler,CreateDealerHandler,DeliverPackageHandler,CreatePackageHandler,CreateRouteWithPackagesHandler,
    { provide: 'DealerRepository', useClass: DealerTypeOrmRepositoryImpl },
    { provide: 'PackageRepository', useClass: PackageTypeOrmRepositoryImpl },
    { provide: 'DeliveryRouteRepository', useClass: DeliveryRouteTypeOrmRepositoryImpl },
    { provide: 'UnitOfWorkRepository', useClass: UnitOfWorkRepositoryImpl },
  ],
   //
})
export class DeliveryModule {}
