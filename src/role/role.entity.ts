import { Permission } from "src/permission/permission.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @ManyToMany(()=>Permission, {cascade:true})
    //table de liason
    @JoinTable({
        name:'role_permission',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'permission_id', referencedColumnName :'id'}
        
    })
    permission : Permission[];
}