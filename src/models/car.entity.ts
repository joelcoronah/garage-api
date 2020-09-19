import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '.';

@Index('cars_pkey', ['id'], { unique: true })
@Index('cars_plate_key', ['plate'], { unique: true })
@Entity('cars', { schema: 'public' })
export class Car {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: string;

    @Column('character varying', { name: 'model', length: 255 })
    model: string;

    @Column('character varying', { name: 'color', length: 255 })
    color: string;

    @Column('character varying', { name: 'brand', length: 255 })
    brand: string;

    @Column('int4', { name: 'id_user' })
    idUser: number;

    @Column('character varying', {
        name: 'plate',
        unique: true,
        length: 50,
    })
    plate: string;

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

    /**
     *  Creation user
     */
    @ManyToOne(
        () => User,
        (user) => user.cars
    )
    @JoinColumn([{ name: 'id_user', referencedColumnName: 'id' }])
    user: User;
}
