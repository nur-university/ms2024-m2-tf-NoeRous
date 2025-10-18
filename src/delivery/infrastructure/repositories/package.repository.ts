import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import  { PackageRepository } from "src/delivery/domain/repositories/package.repository.interface";
import { PackageEntity } from "../typeorm/package.entity";

import { Address } from "src/delivery/domain/value-objects/address.vo";
import { Package } from "src/delivery/domain/entities/package.entity";

@Injectable()
export class PackageTypeOrmRepositoryImpl implements PackageRepository {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly ormRepo: Repository<PackageEntity>
  ) {}

  async save(pkg: Package): Promise<void> {
    const entity = this.ormRepo.create({
      id: pkg.id,
      patientId: pkg.patientId,
      deliveryDate: pkg.deliveryDate,
      status: pkg.getStatus(),
      addressStreet: pkg.address.street,
      addressCity: pkg.address.city,
      lat: pkg.address.lat,
      lng: pkg.address.lng,
    });
    await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<Package | null> {
    const entity = await this.ormRepo.findOne({ where: { id } });
    if (!entity) return null;

    return new Package(
      entity.id,
      entity.patientId,
      entity.deliveryDate,
      new Address(entity.addressStreet, entity.addressCity, entity.lat, entity.lng),
    );
  }

  async findAllPending(): Promise<Package[]> {
    const entities = await this.ormRepo.find({ where: { status: 'pending' } });
    return entities.map(
      e =>
        new Package(
          e.id,
          e.patientId,
          e.deliveryDate,
          new Address(e.addressStreet, e.addressCity, e.lat, e.lng),
        )
    );
  }
}


