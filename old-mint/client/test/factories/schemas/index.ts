import complexRequestObject2 from './2.0/complexRequestObject';
import complexResponseObject2 from './2.0/complexResponseObject';
import globalSecurity2 from './2.0/globalSecurity';
import localSecurity2 from './2.0/localSecurity';
import complexRequestObject3 from './3.0/complexRequestObject';
import complexResponseObject3 from './3.0/complexResponseObject';
import globalSecurity3 from './3.0/globalSecurity';
import localSecurity3 from './3.0/localSecurity';
import oneOf3 from './3.0/oneOf';
import complexRequestObject3_1 from './3.1/complexRequestObject';
import complexResponseObject3_1 from './3.1/complexResponseObject';
import globalSecurity3_1 from './3.1/globalSecurity';
import localSecurity3_1 from './3.1/localSecurity';

export const v2Specs = {
  complexRequestObject: complexRequestObject2,
  complexResponseObject: complexResponseObject2,
  globalSecurity: globalSecurity2,
  localSecurity: localSecurity2,
};

export const v3Specs = {
  complexRequestObject: complexRequestObject3,
  complexResponseObject: complexResponseObject3,
  globalSecurity: globalSecurity3,
  localSecurity: localSecurity3,
  oneOf: oneOf3,
};

export const v3_1Specs = {
  complexRequestObject: complexRequestObject3_1,
  complexResponseObject: complexResponseObject3_1,
  globalSecurity: globalSecurity3_1,
  localSecurity: localSecurity3_1,
};
