import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  NOME: string;

  @IsInt()
  @IsNotEmpty()
  IDADE: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  NUMERO: string;
}
