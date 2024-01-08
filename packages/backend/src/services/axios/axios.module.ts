import { Module } from '@nestjs/common';
import { AxiosService } from 'src/services/axios/axios.service';
import axios from 'axios';

@Module({
  providers: [
    {
      provide: AxiosService,
      useValue: axios,
    },
  ],
  exports: [AxiosService],
})
export class AxiosModule {}
