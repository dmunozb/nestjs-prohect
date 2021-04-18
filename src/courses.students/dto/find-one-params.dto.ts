import { IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  
  @IsNumberString()
  courseId: number;
  
  @IsString()
  studentId: string;
}
