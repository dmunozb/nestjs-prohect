import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto)
  }

  findAll() {
    return this.courseRepository.find()
  }

  findOne(id: number) {
    return this.courseRepository.findOne(id)
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    let course = await this.courseRepository.findOne(id);
    if(course) {
      return this.courseRepository.save({
        ...course,
        ...updateCourseDto
      })
    }
  }

  async remove(id: number) {
    await this.courseRepository.delete(id).then(res => {
      if(res.affected < 1) {
        throw new BadRequestException()
      }
    })
  }
}
