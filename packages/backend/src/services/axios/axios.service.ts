import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export abstract class AxiosService extends Axios {}
