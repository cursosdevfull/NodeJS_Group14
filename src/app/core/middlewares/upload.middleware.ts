import { RequestHandler } from "express";
import multer from "multer";

export class UploadBuilder {
  private _fieldname: string;
  private _maxSize: number;
  private _allowedExtensions: string[];
  private _destination: string;
  private _isPublic: boolean;

  addFieldname(value: string): UploadBuilder {
    this._fieldname = value;
    return this;
  }

  addMaxSize(value: number): UploadBuilder {
    this._maxSize = value;
    return this;
  }

  addAllowedExtensions(value: string[]): UploadBuilder {
    this._allowedExtensions = value;
    return this;
  }

  addDestination(value: string): UploadBuilder {
    this._destination = value;
    return this;
  }

  addIsPublic(value: boolean): UploadBuilder {
    this._isPublic = value;
    return this;
  }

  get fieldname(): string {
    return this._fieldname;
  }

  get maxSize(): number {
    return this._maxSize;
  }

  get allowedExtensions(): string[] {
    return this._allowedExtensions;
  }

  get destination(): string {
    return this._destination;
  }

  get isPublic(): boolean {
    return this._isPublic;
  }

  build(): UploadOptions {
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fieldname: string;
  readonly maxSize: number;
  readonly allowedExtensions: string[];
  readonly destination: string;
  readonly isPublic: boolean;

  constructor(instance: UploadBuilder) {
    this.fieldname = instance.fieldname;
    this.maxSize = instance.maxSize;
    this.allowedExtensions = instance.allowedExtensions;
    this.destination = instance.destination;
    this.isPublic = instance.isPublic;
  }
}

/*const options: UploadOptions = new UploadBuilder()
    .addFieldname("file")
    .addAllowedExtensions(["png", "jpg", "jpeg"])
    .addDestination("public")
    .addIsPublic(true)
    .addMaxSize(5000000)
    .build();*/

export interface IUpload {
  save(options: UploadOptions): RequestHandler;
}

export class UploadLocal implements IUpload {
  save(options: UploadOptions): RequestHandler {
    return multer({
      dest: "./public/photos/",
      limits: { fileSize: options.maxSize },
      fileFilter: (req, file, cb) => {
        const allowedMimes = options.allowedExtensions;
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type."));
        }
      },
    }).single(options.fieldname);
  }
}
