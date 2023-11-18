import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [PrismaModule, ContactsModule],
})
export class AppModule {}
