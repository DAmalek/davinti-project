import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/CreateContactDto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contato, telefone } from '@prisma/client';
import path from 'path';
import * as fs from 'fs';
import { time } from 'console';
import { timestamp } from 'rxjs';

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
    const contato: contato[] = await this.prisma.contato.findMany({
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
    try {
      const contatoParaExcluir = await this.prisma.contato.findUnique({
        where: { ID: id },
      });

      await this.prisma.contato.delete({
        where: { ID: id },
      });

      // Registrar o log em um arquivo texto
      const logMessage = `Contato excluído: ${JSON.stringify(
        contatoParaExcluir,
      )} - ${new Date().toLocaleString()}\n`;
      fs.appendFileSync('./src/contacts/contatos.txt', logMessage);

      console.log('Contato e telefones excluídos com sucesso');
    } catch (error) {
      console.error('Erro ao excluir contato e telefones:', error);
    }
  }
}
// async function excluirContatoETelefones(contatoId) {
//   try {
//     // Buscar informações do contato antes de excluí-lo (para registro de log)
//     const contatoParaExcluir = await prisma.contato.findUnique({
//       where: { id: contatoId },
//     });

//     // Excluir o contato
//     await prisma.contato.delete({
//       where: { id: contatoId },
//     });

//     // Registrar o log em um arquivo texto
//     const logMessage = `Contato excluído: ${JSON.stringify(
//       contatoParaExcluir,
//     )} - ${new Date().toLocaleString()}\n`;
//     fs.appendFileSync('logs.txt', logMessage);

//     console.log('Contato e telefones excluídos com sucesso');
//   } catch (error) {
//     console.error('Erro ao excluir contato e telefones:', error);
//   } finally {
//     await prisma.$disconnect(); // Fecha a conexão com o banco de dados
//   }
// }
