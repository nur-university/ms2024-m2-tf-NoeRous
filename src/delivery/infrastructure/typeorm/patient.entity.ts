import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('patients')
export class PatientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "identity_card" })
    identityCard: string;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ name: "cell_phone" })
    cellPhone: number;
}