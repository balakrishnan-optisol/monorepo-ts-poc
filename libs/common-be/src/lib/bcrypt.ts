import { hashSync, compareSync } from 'bcrypt';

import { constants } from '@monorepo-ts/common';

export class Hash {
  hashString(data: string): string {
    return hashSync(data, constants.SALT_DATA);
  }

  validateString(data: string, encryptedString: string): boolean {
    return compareSync(data, encryptedString);
  }
}
