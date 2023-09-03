import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: '_id'
    })
    id: number;

    @Column({
        nullable: false
    })
    fname: string;

    @Column({
        default: ''
    })
    lname: string;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        nullable: false,
        unique: true
    })
    mobileNo: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        default: false
    })
    verified: Boolean
}