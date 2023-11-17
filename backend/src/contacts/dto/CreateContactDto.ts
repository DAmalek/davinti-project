import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  NOME: string;

  @IsInt()
  @IsNotEmpty()
  IDADE: number;
}
