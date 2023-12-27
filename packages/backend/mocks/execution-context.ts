import { mockDeep } from 'jest-mock-extended';
import { ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';

export const httpArgumentsHostMock = mockDeep<HttpArgumentsHost>();
export const wsArgumentsHostMock = mockDeep<WsArgumentsHost>();
export const executionContextMock = mockDeep<ExecutionContext>();
executionContextMock.switchToHttp.mockReturnValue(httpArgumentsHostMock);
executionContextMock.switchToWs.mockReturnValue(wsArgumentsHostMock);
