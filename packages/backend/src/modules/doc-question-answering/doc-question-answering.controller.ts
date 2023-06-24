import {
  Body,
  Controller,
  Get,
  Logger,
  MessageEvent,
  Sse,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { END_COMPLETION } from '../../constants';
import { DocQuestionAnsweringService } from './doc-question-answering.service';
import { DocQaRequestDto } from '../../dto/doc-qa-request.dto';

function getData(type: string, content: unknown) {
  return JSON.stringify({
    type,
    content,
  });
}

@Controller('question-answering')
export class DocQuestionAnsweringController {
  constructor(private readonly service: DocQuestionAnsweringService) {}

  private readonly logger = new Logger(DocQuestionAnsweringController.name);

  @Sse()
  @Get()
  getCompletion(@Body() request: DocQaRequestDto): Observable<MessageEvent> {
    return new Observable<MessageEvent>((subscriber) => {
      const { query } = request;
      const sendCompletion = async (token: string) => {
        subscriber.next({ data: getData('token', token) });
      };
      this.service
        .generateCompletion(query || '', sendCompletion)
        .then(({ text, sourceDocuments }) => {
          subscriber.next({
            data: getData('response', text),
          });
          subscriber.next({
            data: getData('debug', sourceDocuments),
          });
          subscriber.next({ data: END_COMPLETION });
          subscriber.complete();
        })
        .catch((error) => {
          this.logger.error('Completion api error', error);
          subscriber.error(error);
        });
    });
  }
}
