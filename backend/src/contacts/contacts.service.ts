import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/CreateContactDto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contato } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    return await this.prisma.contato.create({
      data: createContactDto,
    });
  }

  async findAll() {
    return await this.prisma.contato.findMany({});
  }

  async findOne(NOME: string) {
    return await this.prisma.contato.findUnique({ where: NOME });
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
