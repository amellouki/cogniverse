import { Body, Controller, Param, Patch, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdateAccountKeysDto } from '../../dto/update-account-keys.dto';
import { SecureRequest } from '../../types/secure-request';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Patch(':id/keys')
  async updateKeys(
    @Param('id') accountId,
    @Body() body: UpdateAccountKeysDto,
    @Request() request: SecureRequest,
  ) {
    return this.accountService.updateKeys(accountId, body);
  }
}
