import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './CreateContactDto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
