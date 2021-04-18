import { ApiHideProperty } from "@nestjs/swagger";
import { Student } from "src/courses.students/entities/student.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('courses')
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description?: string;

    @ApiHideProperty()
    @OneToMany(() => Student, student => student.course, { onDelete: 'CASCADE' })
    @JoinColumn({
        referencedColumnName: 'id'
    })
    students: Student[];
}
