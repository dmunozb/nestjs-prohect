import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpCode } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from 'src/not-found.interceptor';
import { Student } from './entities/student.entity';
import { FindOneParams } from './dto/find-one-params.dto';
import { FindParams } from './dto/find-params.dto';

@ApiTags('courses.students')
@Controller('courses/:courseId/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'Student has been successfully created.',
    type: Student
  })
  create(
    @Param() params: FindParams,
    @Body() createStudentDto: CreateStudentDto
  ) {
    return this.studentsService.create(params.courseId, createStudentDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Array of Students.',
    type: [Student],
  })
  findAll(@Param() params: FindParams) {
    return this.studentsService.findAll(params.courseId);
  }

  @Get(':studentId')
  @ApiOkResponse({
    description: 'Return Student instance.',
    type: Student
  })
  @ApiNotFoundResponse({
    description: 'Student not found.'
  })
  @UseInterceptors(new NotFoundInterceptor('Student not found'))
  findOne(
    @Param() params: FindOneParams
  ) {
    return this.studentsService.findOne(params.courseId, params.studentId);
  }

  @Patch(':studentId')
  @ApiOkResponse({
    description: 'Updated Student Instance',
    type: Student
  })
  @ApiBadRequestResponse({
    description: 'Student not updated.'
  })
  @ApiNotFoundResponse({
    description: 'Student not found.'
  })
  @UseInterceptors(new NotFoundInterceptor('Student not found'))
  update(
    @Param() params: FindOneParams,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.update(params.courseId, params.studentId, updateStudentDto);
  }

  @Delete(':studentId')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Student deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Student not found.'
  })
  async remove(@Param() params: FindOneParams) {
    await this.studentsService.remove(params.courseId, params.studentId);
  }
}
