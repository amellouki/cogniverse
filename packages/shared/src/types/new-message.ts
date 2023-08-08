import {Message} from "@prisma/client";

export type NewMessage = Omit<Message, "id">;
