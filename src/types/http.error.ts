/* eslint-disable capitalized-comments */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export class HttpError extends Error {
  constructor(
    public status: number,
    public statusMessage: string,
    message?: string | undefined,
    options?: ErrorOptions | undefined
  ) {
    super(message, options);
  }
}

/* definimos una class HttpError que se extiende de Error
da inf adicional de los errores */
