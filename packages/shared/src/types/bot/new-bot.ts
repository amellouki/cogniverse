import {Bot} from "@prisma/client";

type NewBot = Omit<Bot, 'id'>

export default NewBot;
