import { PackageCreatedEvent } from "../events/package-create.event";
import { PackageDeliveredEvent } from "../events/package-delivered.event";
import { PackageInTransitEvent } from "../events/package-in-transit.event";
import { Address } from "../value-objects/address.vo";

export class Package {
    constructor(
        public readonly id: string,
        public patientId: string,
        public deliveryDate: Date,
        public address: Address,
        private status: 'pending' | 'in_transit' | 'delivered' = 'pending'

    ) { }

    //marcar  como en transito 
    markInTransit(dealerId: string) {
        this.status = 'in_transit';
        new PackageInTransitEvent(this.id, dealerId, this.deliveryDate);
    }

    //marcar el paquete como entregado 
    markDelivered() {
        this.status = 'delivered';
        this.deliveryDate = new Date();
        //new PackageDeliveredEvent(this.id, dealerId, this.deliveryDate);
    }

    //obtener el estado del paquete 
    getStatus(): string {
        return this.status;
    }

    //crear paquete
    static create(id: string, patientId: string, deliveryDate: Date, address: Address): Package {
        const pkg = new Package(id, patientId, deliveryDate, address);
        new PackageCreatedEvent(id, patientId, deliveryDate);
        return pkg;
    }
}