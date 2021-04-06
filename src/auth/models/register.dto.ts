import { IsEmail, IsNotEmpty } from "class-validator";

//body is a data transfer object.
export class RegisterDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    passwordConfirm: string;




}
