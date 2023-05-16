import common from './common.constants';
import repository from './repository.constants';
import validationMessage from './validation-message.constant';
import responseMessage from './response-message.constants';

export const constants = {
  ...common,
  ...repository,
  ...validationMessage,
  ...responseMessage
};
