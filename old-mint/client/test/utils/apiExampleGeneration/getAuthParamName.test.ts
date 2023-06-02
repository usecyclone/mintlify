import { getAuthParamName } from '@/openapi/apiExampleGeneration/getAuthParamName';

describe('getAuthParamName', () => {
  test('capitalizes method when missing name', () => {
    expect(getAuthParamName(undefined, 'key')).toEqual('Key');
    expect(getAuthParamName('', 'bearer')).toEqual('Bearer');
  });
});
