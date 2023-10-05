import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType, private parse: boolean = false) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    const parsed = this.schema.safeParse(value);
    if (parsed.success === false) {
      throw new BadRequestException('Invalid input!');
    }
    return value;
  }
}
