import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './courses.students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
    }),
    CoursesModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
