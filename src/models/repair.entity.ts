import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Index('repairs_pkey', ['id'], { unique: true })
@Entity('repairs', { schema: 'public' })
export class Repair {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: string;

    @Column('character varying', { name: 'name', length: 255 })
    name: string;

    @Column('character varying', { name: 'description', length: 400 })
    description: string;

    @Column('int4', { name: 'id_car' })
    idCar: number;

    @Column('character varying', { name: 'status', length: 100 })
    status: string;

    @Column('timestamp without time zone', {
        name: 'creation_date',
        default: () => 'CURRENT_TIMESTAMP',
        select: false,
    })
    creationDate: Date;

    @Column('timestamp without time zone', {
        name: 'modification_date',
        nullable: true,
        select: false,
    })
    modificationDate: Date | null;

}
