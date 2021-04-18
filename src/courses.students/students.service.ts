import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ){}

  async create(courseId: number, createStudentDto: CreateStudentDto) {
    const course = await this.courseRepository.findOne(courseId, {
      relations: ['students']
    });
    if(!course) {
      throw new NotFoundException('Course Not Found')
    }

    return this.studentRepository.save({
      courseId,
      ...createStudentDto
    })
  }

  async findAll(courseId: number) {
    const course = await this.courseRepository.findOne(courseId, {
      relations: ['students']
    });
    if(!course) {
      throw new NotFoundException('Course Not Found')
    }

    return course.students
  }

  findOne(courseId: number, studentId: string) {
    return this.studentRepository.findOne({
      where:{
        id: studentId,
        courseId: courseId
      }
    })
    
  }
  
  async update(courseId: number, studentId: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne({
      where: {
        id: studentId,
        courseId: courseId
      }
    })

    if(student){
      return this.studentRepository.save({
        ...student,
        ...updateStudentDto
      })
    }

  }

  async remove(courseId: number, studentId: string) {
    console.log(courseId);
    console.log(studentId);
    
    await this.studentRepository.delete({
      id: studentId,
      courseId
    }).then(res => {
      if(res.affected < 1) {
        throw new BadRequestException()
      }
    })
  }
}
