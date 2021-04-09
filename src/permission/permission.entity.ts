import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


//entity non de la table
@Entity('permission')
export class Permission{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
}