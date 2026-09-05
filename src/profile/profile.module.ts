import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProfileResolver, ProfileService],
  imports: [PrismaModule],
})
export class ProfileModule {}
