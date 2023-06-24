import { Message } from '@prisma/client';

type AppendMessageRequestDto = Omit<Message, 'id'>;

export default AppendMessageRequestDto;
