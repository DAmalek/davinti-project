import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/CreateContactDto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contato, telefone } from '@prisma/client';
import * as fs from 'fs';

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

  async findByName(NOME: string) {
    const contato: contato[] = await this.prisma.contato.findMany({
      where: { NOME },
      include: { telefone: true },
    });
    if (contato.length === 0)
      throw new HttpException('contact not found', HttpStatus.NOT_FOUND);
    return contato;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const telefoneExist = await this.prisma.telefone.findFirst({
      where: { IDCONTATO: id },
    });
    if (!telefoneExist)
      throw new HttpException('contact not found', HttpStatus.NOT_FOUND);

    await this.prisma.contato.update({
      where: { ID: id },
      data: { NOME: updateContactDto.NOME, IDADE: updateContactDto.IDADE },
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
    const contatoParaExcluir = await this.prisma.contato.findUnique({
      where: { ID: id },
    });

    if (!contatoParaExcluir)
      throw new HttpException('contact not found', HttpStatus.NOT_FOUND);

    await this.prisma.contato.delete({
      where: { ID: id },
    });

    const logMessage = `Contato excluído: ${JSON.stringify(
      contatoParaExcluir,
    )} - ${new Date().toLocaleString()}\n`;
    fs.appendFileSync('./src/contacts/contatos.txt', logMessage);

    console.log('Contato e telefones excluídos com sucesso');
  }
}
