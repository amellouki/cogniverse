import {Message} from "@prisma/client";

type NewMessage = Omit<Message, "id">;

export default NewMessage;
