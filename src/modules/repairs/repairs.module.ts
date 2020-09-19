import { Module } from '@nestjs/common';
import { RepairsService } from './repairs.service';
import { RepairsController } from './repairs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repair } from 'src/models/repair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repair])],
  providers: [RepairsService],
  controllers: [RepairsController],
  exports: [RepairsService]
})
export class RepairsModule {}
