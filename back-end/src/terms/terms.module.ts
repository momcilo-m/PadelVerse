import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Term } from 'src/models/term.entity';
import { UsersModule } from 'src/users/users.module';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { ComplexModule } from 'src/complex/complex.module';
import { CourtsModule } from 'src/courts/courts.module';

@Module({
    imports: [TypeOrmModule.forFeature([Term]),UsersModule,AuthModule,forwardRef(() => ComplexModule),CourtsModule],
    exports: [TypeOrmModule,TermsService],
    providers: [TermsService],
    controllers: [TermsController],
})
export class TermsModule {}
