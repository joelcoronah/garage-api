import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Car } from '.';

@Index('users_pkey', ['id'], { unique: true })
@Index('users_identity_document_key', ['identityDocument'], { unique: true })
@Index('users_mail_key', ['mail'], { unique: true })
@Entity('users', { schema: 'public' })

export class User {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: number;

    @Column('character varying', { name: 'first_name', length: 255, comment: 'User first name' })
    firstName: string;

    @Column('character varying', { name: 'last_name', length: 255, comment: 'User last name' })
    lastName: string;

    @Column('character varying', { name: 'status', length: 100, comment: 'User status, e.g: active, deleted...' })
    status: string;

    @Column('character varying', { name: 'mail', unique: true, length: 50, comment: 'User email' })
    mail: string;

    @Column('character varying', {
        name: 'identity_document',
        nullable: true, unique: true, length: 50,
        comment: 'Identity doc of the user'
    })
    identityDocument: string | null;

    @Column('character varying', { 
        name: 'telephone',
        length: 50,
        nullable: true,
        comment: 'Phone number'
    })
    telephone: string | null;

    @Column('text', { name: 'address', nullable: true, comment: 'User address' })
    address: string | null;

    @Column('timestamp without time zone', {
        name: 'creation_date',
        default: () => 'CURRENT_TIMESTAMP',
        select: false,
        comment: 'Creation date and time of the user'
    })
    creationDate: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'modification_date',
        nullable: true,
        select: false,
        comment: 'Modification date and time of the user'
    })
    modificationDate: Date | null;

    /**
     *  Cars of the user
     */
    @OneToMany(
        () => Car,
        car => car.user
    )
    cars: Car[];

}