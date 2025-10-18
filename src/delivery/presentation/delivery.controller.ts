import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AssingPackageToDealerCommand } from '../aplication/commands/assign-package-to-dealer.command';
import { CreateDealerCommand } from '../aplication/commands/create-dealer.command';
import { v4 as uuidv4 } from 'uuid';
import { DeliverPackageCommand } from '../aplication/commands/deliver-package.command';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly commandBus: CommandBus) { }

    //CREAR REPARTIDOR
    @Post('create-dealer')
    async createDealer(@Body() body: { identityCard: string; firstName: string; lastName: string; cellPhone: number }) {
        const command = new CreateDealerCommand(
            body.identityCard,
            body.firstName,
            body.lastName,
            body.cellPhone
        );

        const dealer = await this.commandBus.execute(command);
        return { message: 'Dealer created successfully', dealer };
    }

    //ASIGNAR PAQUETE REPARTIDOR 
    @Post('assign-package')
    async assignPackage(
        @Body() body: { packageId: string; dealerId: string; date?: string }
    ) {
        const command = new AssingPackageToDealerCommand(
            body.packageId,
            body.dealerId,
            new Date()
        );

        await this.commandBus.execute(command);
        return { message: 'Package assigned successfully' };
    }

    //ENTREGAR PAQUETE
    @Post(':id/deliver')
    async markAsDelivered(@Param('id') id: string) {

        await this.commandBus.execute(
            new DeliverPackageCommand(id),
        );

        return {
            status: true,
            message: `Paquete ${id} marcado como entregado.`,
        };
    }
}
