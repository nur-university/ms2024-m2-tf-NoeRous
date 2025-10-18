# Microservicio Delivery

## Descripción
Este microservicio gestiona la logística de entrega de paquetes. Permite:
- Crear Dealers (distribuidores o repartidores).
- Asignar paquetes a Dealers.
- Marcar paquetes como entregados.
- Consultar rutas de entrega y paquetes asignados.

El microservicio está desarrollado aplicando:
- **Domain Driven Design (DDD)**
- **Arquitectura Limpia**
- **CQRS**

No incluye frontend; expone una API REST para ser consumida por otros servicios o aplicaciones.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|------------|
| POST | /delivery | Crear un Repartidor |
| POST | /delivery/assign-package | Asignar paquete a un repartidor |
| POST | /delivery/deliver-package | Marcar paquete como entregado |

## Capa de Dominio

### Diagrama de clases
![Diagrama de clases](docs/diagrama.png)




### Entidades
- Dealer
- Package
- DeliveryRoute

### Value Objects
- CellPhone

### Agregados
- DeliveryRoute (agrega paquetes y dealer)

## Tecnologías
- Node.js / NestJS
- PostgreSQL
- TypeORM
- CQRS (@nestjs/cqrs)
