// infrastructure/typeorm/package.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { DeliveryRouteEntity } from './delivery_routes.entity';

@Entity('packages')
export class PackageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  deliveryDate: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  addressStreet: string;

  @Column({ nullable: true })
  addressCity: string;

  @Column({ nullable: true, type: 'float' })
  lat?: number;

  @Column({ nullable: true, type: 'float' })
  lng?: number;


  @ManyToOne(() => DeliveryRouteEntity, (route) => route.packages, { eager: false })
  @JoinColumn({ name: 'delivery_route_id' })
  deliveryRoute: DeliveryRouteEntity;
}
