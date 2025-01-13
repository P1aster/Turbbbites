import { FileInterceptor } from '@nestjs/platform-express';
import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

export class Multer {
  private static readonly basePath: string = 'files';

  constructor() {}

  public static dishImageInterceptor() {
    return FileInterceptor('image', {
      dest: `${this.basePath}/dishes`,
    });
  }
  public static dishImageFilePipe() {
    return new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    });
  }
}
