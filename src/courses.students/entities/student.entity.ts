import { ApiHideProperty } from "@nestjs/swagger";
import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('students')
export class Student {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column({
        name: 'course_id'
    })
    courseId: number
    
    @ApiHideProperty()
    @ManyToOne(() => Course, course => course.students, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'course_id'
    })
    course: Course;
}
