import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from 'src/not-found.interceptor';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Course has been successfully created.',
    type: Course
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  
  @Get()
  @ApiOkResponse({
    description: 'Array of Courses.',
    type: [Course],
  })
  findAll() {
    return this.coursesService.findAll();
  }


  @Get(':id')
  @ApiOkResponse({
    description: 'Return Course instance.',
    type: Course
  })
  @ApiNotFoundResponse({
    description: 'Course not found.'
  })
  @UseInterceptors(new NotFoundInterceptor('Course not found'))
  findOne(@Param() params: FindOneParams) {
    return this.coursesService.findOne(params.id);
  }


  @Patch(':id')
  @ApiOkResponse({
    description: 'Updated Course Instance',
    type: Course
  })
  @ApiBadRequestResponse({
    description: 'Course not updated.'
  })
  @ApiNotFoundResponse({
    description: 'Course not found.'
  })
  @UseInterceptors(new NotFoundInterceptor('Course not found'))
  async update(@Param() params: FindOneParams, @Body() updateCourseDto: UpdateCourseDto) {
    return await this.coursesService.update(params.id, updateCourseDto);
  }
  
  
  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Course deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Course not found.'
  })
  async remove(@Param() params: FindOneParams) {
    await this.coursesService.remove(params.id);
  }
}
