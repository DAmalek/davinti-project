import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ContactsModule } from './contacts/contacts.module';
import { TelephonesModule } from './telephones/telephones.module';

@Module({
  imports: [PrismaModule, ContactsModule, TelephonesModule],
})
export class AppModule {}
