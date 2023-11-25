import { Conversation, NewMessage } from '@my-monorepo/shared';
import { Subject } from 'rxjs';

export abstract class BaseChainStream {
  getCompletion$(question: string, conversation: Conversation) {
    const subject = new Subject<NewMessage>();
    this.getCompletion(question, conversation, subject)
      .then(() => subject.complete())
      .catch((e) => {
        subject.error(e);
      });

    return subject;
  }

  protected abstract getCompletion(
    question: string,
    conversation: Conversation,
    subject: Subject<NewMessage>,
  ): Promise<void>;
}
