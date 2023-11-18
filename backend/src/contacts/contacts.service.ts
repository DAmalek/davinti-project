import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/CreateContactDto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contato } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ NOME, IDADE, NUMERO }: CreateContactDto) {
    const contato = await this.prisma.contato.create({
      data: { NOME, IDADE },
    });
    const telefone = await this.prisma.telefone.create({
      data: { IDCONTATO: contato.ID, NUMERO },
    });

    return { contato, telefone };
  }

  async findAll() {
    return await this.prisma.contato.findMany({
      include: {
        telefone: true,
      },
    });
  }

  async findOne(NOME: string) {
    const contato: contato = await this.prisma.contato.findFirst({
      where: { NOME },
      include: { telefone: true },
    });
    if (!contato)
      throw new HttpException('contact not found', HttpStatus.NOT_FOUND);
    return contato;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    await this.prisma.contato.update({
      where: { ID: id },
      data: { NOME: updateContactDto.NOME, IDADE: updateContactDto.IDADE },
    });
    const telefoneExist = await this.prisma.telefone.findFirst({
      where: { IDCONTATO: id },
    });
    await this.prisma.telefone.update({
      where: { ID: telefoneExist.ID },
      data: { NUMERO: updateContactDto.NUMERO },
    });

    return await this.prisma.contato.findFirst({
      where: { ID: id },
      include: { telefone: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.contato.delete({
      where: { ID: id },
    });
  }
}
