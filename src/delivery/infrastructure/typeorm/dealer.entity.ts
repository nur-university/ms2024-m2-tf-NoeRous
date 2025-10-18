// infrastructure/typeorm/dealer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DeliveryRouteEntity } from './delivery_routes.entity';


@Entity('dealers')
export class DealerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identityCard: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  cellPhone: number;

  @OneToMany(() => DeliveryRouteEntity, (route) => route.dealer, { cascade: true })
  deliveryRoutes: DeliveryRouteEntity[];
}
