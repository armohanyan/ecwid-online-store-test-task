import { Response, NextFunction } from 'express'; // Import types
import ErrorsUtil from './errors.util';
import HttpStatusCodesUtil from './http-status-codes.util';

const { ResourceNotFoundError } = ErrorsUtil;

export default class SuccessHandlerUtil {
  /**
   * @description Send a response.
   * @param response The Express response object.
   * @param status The HTTP status code.
   * @param data The data to include in the response body.
   */
  private static _sendResponse(
    response: Response,
    status: number,
    data?: unknown,
  ): void {
    response.status(status).json(data);
  }

  static handleAdd(
    response: Response,
    next: NextFunction,
    data?: unknown,
  ): void {
    if (!data) {
      return this._sendResponse(response, HttpStatusCodesUtil.NO_CONTENT);
    }
    return this._sendResponse(response, HttpStatusCodesUtil.CREATED, data);
  }

  static handleGet(
    response: Response,
    next: NextFunction,
    data?: unknown,
  ): void {
    if (!data) {
      return next(
        new ResourceNotFoundError(
          'The specified resource is not found.',
          HttpStatusCodesUtil.OK,
        ),
      );
    }
    return this._sendResponse(response, HttpStatusCodesUtil.OK, data);
  }
  static handleExport(
      response: Response,
      next: NextFunction,
      data?: unknown,
  ): void {
    return this._sendResponse(response, HttpStatusCodesUtil.OK, data);
  }

}
