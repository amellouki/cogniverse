import {errors} from "../../constants";
import {AppException} from "./app-exception";

export class BotTypeNotSupportedException extends AppException {
  constructor() {
    super(errors.ERR_001.message);
    this.code = errors.ERR_001.code;
    this.source = 'server';
    this.name = 'BotTypeNotSupportedException';
  }
}

export class BotNotBoundException extends AppException {
  constructor() {
    super(errors.ERR_002.message);
    this.code = errors.ERR_002.code;
    this.source = 'user';
    this.name = 'BotNotBoundException';
  }
}

export class KeyNotSetException extends AppException {
  constructor(key: string) {
    super(`${key} is not set, please set it in your account settings`);
    this.message = `${key} is not set, please set it in your account settings`;
    this.code = errors.ERR_003.code;
    this.source = 'user';
    this.name = 'KeyNotSetException';
  }
}

export class ChainException extends AppException {
  constructor(error: string) {
    super(`Chain error :${error}`);
    this.code = errors.ERR_004.code;
    this.source = 'server';
    this.name = 'ChainException';
  }
}

export class MessageTypeNotSupportedException extends AppException {
  constructor() {
    super(errors.ERR_005.message);
    this.code = errors.ERR_005.code;
    this.source = 'server';
    this.name = 'MessageTypeNotSupportedException';
  }
}

export class LanguageModelNotSupportedException extends AppException {
  constructor() {
    super(errors.ERR_006.message);
    this.code = errors.ERR_006.code;
    this.source = 'server';
    this.name = 'LanguageModelNotSupportedException';
  }
}

export class BadDiscordRequestException extends AppException {
  constructor(details: string) {
    super(`Bad discord request: ${details}`);
    this.code = errors.ERR_007.code;
    this.source = 'user';
    this.name = 'BadDiscordRequestException';
  }
}

export class BadSlackRequestException extends AppException {
  constructor(details: string) {
    super(`Bad slack request: ${details}`);
    this.code = errors.ERR_008.code;
    this.source = 'user';
    this.name = 'BadSlackRequestException';
  }
}

export class EnvironmentVariableNotSetException extends AppException {
  constructor(message: string) {
    super(message);
    this.code = errors.ERR_009.code;
    this.source = 'server';
    this.name = 'EnvironmentVariableNotSetException';
  }
}

export class InvalidRequestException extends AppException {
  constructor(message: string) {
    super(message);
    this.code = errors.ERR_010.code;
    this.source = 'user';
    this.name = 'InvalidRequestException';
  }
}

export class InternalServerException extends AppException {
  constructor(message: string) {
    super(message);
    this.code = errors.ERR_011.code;
    this.source = 'server';
    this.name = 'InternalServerException';
  }
}

export class SomethingWentWrongException extends AppException {
  constructor(message: string) {
    super(message);
    this.code = errors.ERR_012.code;
    this.source = 'unknown';
    this.name = 'SomethingWentWrongException';
  }
}


