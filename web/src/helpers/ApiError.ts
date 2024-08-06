class API_ERROR extends Error {
  statusCode: number
  data: null | any
  success: boolean
  errors: any[]

  constructor(
    statusCode: number = 500,
    message: string = 'Something went wrong',
    errors: any[] = [],
    stack: string = '',
  ) {
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.success = false
    this.errors = errors

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class BadRequestError extends API_ERROR {
  constructor(message: string, errors: any[] = []) {
    super(400, message, errors)
  }
}

export class NotFoundError extends API_ERROR {
  constructor(message: string, errors: any[] = []) {
    super(404, message, errors)
  }
}

export class InvalidCredentialsError extends API_ERROR {
  constructor(message: string, errors: any[] = []) {
    super(401, message, errors)
  }
}

export class InternalServerError extends API_ERROR {
  constructor(message: string = 'Internal Server Error', errors: any[] = []) {
    super(500, message, errors)
  }
}

export default API_ERROR
