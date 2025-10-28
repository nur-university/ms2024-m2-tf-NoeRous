import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AssingPackageToDealerCommand } from '../aplication/commands/assign-package-to-dealer.command';
import { CreateDealerCommand } from '../aplication/commands/create-dealer.command';
import { DeliverPackageCommand } from '../aplication/commands/deliver-package.command';
import { CreatePackageCommand } from '../aplication/commands/create-package.command';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { AssignPackageDto } from './dto/assign-package.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { AssignPackagesDto } from './dto/assign-packages.dto';
import { CreateRouteWithPackagesCommand } from '../aplication/commands/create-route-with-packages.command';
import { TransitPackageCommand } from '../aplication/commands/transit-package.command';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private readonly commandBus: CommandBus) { }

    //CREAR REPARTIDOR
  
    @Post('create-dealer')
    @ApiOperation({ summary: 'Crear un nuevo Repartidor', description: 'Crea un Repartidor con los datos proporcionados.' })
    @ApiResponse({ status: 201, description: 'Dealer creado exitosamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async createDealer(@Body() body: CreateDealerDto) {
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
    @ApiOperation({ summary: 'Asignar paquete a repartidor', description: 'Asigna un paquete a un repartidor.' })
    @ApiResponse({ status: 201, description: 'Paquete asignado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async assignPackage(
        @Body() body: AssignPackageDto
    ) {
        const command = new AssingPackageToDealerCommand(
            body.packageId,
            body.dealerId,
            new Date()
        );

        await this.commandBus.execute(command);
        return { message: 'Package asignado correctamente' };
    }

    //ENTREGAR PAQUETE
    @Post(':id/deliver')
    @ApiOperation({ summary: 'Marcar paquete como entregado', description: 'Marca un paquete como entregado usando su ID.' })
    @ApiResponse({ status: 200, description: 'Paquete entregado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado.' })
    async markAsDelivered(@Param('id') id: string) {

        await this.commandBus.execute(
            new DeliverPackageCommand(id),
        );

        return {
            status: true,
            message: `Paquete ${id} marcado como entregado.`,
        };
    }

    //ENTREGAR PAQUETE
    @Post(':id/transit')
    @ApiOperation({ summary: 'Marcar paquete como en Camino', description: 'Marca un paquete como en camino usando su ID.' })
    @ApiResponse({ status: 200, description: 'Paquete entregado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Paquete no encontrado.' })
    async markAsTransit(@Param('id') id: string) {

        await this.commandBus.execute(
            new TransitPackageCommand(id),
        );

        return {
            status: true,
            message: `Paquete ${id} marcado como en camino.`,
        };
    }

    //crear paquete 
    @Post('create-package')
    @ApiOperation({ summary: 'Crear paquete', description: 'Crea un paquete con los datos proporcionados.' })
    @ApiResponse({ status: 201, description: 'Paquete creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos.' })
    async createPackage(@Body() body: CreatePackageDto) {
        await this.commandBus.execute(
            new CreatePackageCommand(
                body.patientId,
                new Date(body.deliveryDate),
                body.addressStreet,
                body.addressCity,
                body.lat,
                body.lng,
                body.deliveryRouteId
            )
        );
         return { message: 'Paquete creado correctamente' };
    }

    @Post('assign-packages-route')
    @ApiOperation({ summary: 'Asignar paquetes a una ruta de Repartidor', description: 'Crea una nueva ruta y asigna los paquetes recibidos a dicha ruta.' })
    @ApiResponse({ status: 201, description: 'Ruta creada exitosamente.' })
    @ApiResponse({ status: 400, description: 'Error en los datos enviados.' })
    async assignPackagesRoute(@Body() body: AssignPackagesDto) {
      const command = new CreateRouteWithPackagesCommand(body.deliveryId,body.deliveryDate, body.packages);
      return this.commandBus.execute(command);
    }
}
