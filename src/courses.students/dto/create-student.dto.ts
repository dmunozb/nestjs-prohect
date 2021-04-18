import { IsNumber, IsString } from "class-validator";

export class CreateStudentDto {

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    email: string;

    @IsNumber()
    age: number;
}
