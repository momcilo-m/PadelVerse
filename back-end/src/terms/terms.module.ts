import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Term } from 'src/models/terms.entity';
import { UsersModule } from 'src/users/users.module';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { CourtsModule } from 'src/courts/courts.module';

@Module({
    imports: [TypeOrmModule.forFeature([Term]),UsersModule,AuthModule,CourtsModule],
    exports: [TypeOrmModule],
    providers: [TermsService],
    controllers: [TermsController],
})
export class TermsModule {}
