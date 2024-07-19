interface ModelError {
    type: string;
    message: string;
}

interface ModelErrorCode {
  code: number;
  message: string;
}

export const errorModel : ModelError[] = [
    { type: 'required', message: 'This field is required' },
    {
      type: 'minlength',
      message: `This field required minimum characters`,
    },
    {
      type: 'maxlength',
      message: `This field has reach maximum characters`,
    },
    {
      type: 'email',
      message: `Wrong Email format`,
    },
    {
      type: 'missmatch',
      message: `This field doesn't match`,
    },
]

const errorCode : ModelErrorCode[] = [
  {
    code: 401,
    message: 'Email or Password wrong!',
  }
]

export const messageErrorCode = (code:any) => {
  const result = errorCode.find((item) => item.code === code);
  return result ? result.message : '';
}

