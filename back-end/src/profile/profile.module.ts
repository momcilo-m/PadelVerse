import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports:[UsersModule],
  exports:[ProfileService]
})
export class ProfileModule {}
