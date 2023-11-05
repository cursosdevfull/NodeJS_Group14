import { S3Client } from '@aws-sdk/client-s3';
import { Request, RequestHandler } from 'express';
import multer from 'multer';
import multer_s3 from 'multer-s3';

export class UploadBuilder {
  private _fieldname: string;
  private _maxSize: number;
  private _allowedExtensions: string[];
  private _destination: string;
  private _isPublic: boolean;
  private _nameOfBucket: string;

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

  addNameOfBucket(value: string): UploadBuilder {
    this._nameOfBucket = value;
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

  get nameOfBucket(): string {
    return this._nameOfBucket;
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
  readonly nameOfBucket: string;

  constructor(instance: UploadBuilder) {
    this.fieldname = instance.fieldname;
    this.maxSize = instance.maxSize;
    this.allowedExtensions = instance.allowedExtensions;
    this.destination = instance.destination;
    this.isPublic = instance.isPublic;
    this.nameOfBucket = instance.nameOfBucket;
  }
}

export interface IUpload {
  save(options: UploadOptions): RequestHandler;
}

export class UploadLocal implements IUpload {
  save(options: UploadOptions): RequestHandler {
    return multer({
      storage: multer_s3({
        s3: new S3Client({}),
        bucket: options.nameOfBucket,
        acl: options.isPublic ? "public-read" : "private",
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, file, cb) {
          const allowedMimes = options.allowedExtensions;
          if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error("Invalid file type."));
          }

          const partsFileName = file.originalname.split(".");
          const extension = partsFileName[partsFileName.length - 1];
          const name = Date.now();

          const newFileName = `${name}.${extension}`;

          req.body[options.fieldname] = newFileName;
          cb(null, newFileName);
        },
      }),
      //dest: "./public/photos/",
      /*storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./public/photos/");
        },
        filename: function (req, file, cb) {
          const partsFileName = file.originalname.split(".");
          const extension = partsFileName[partsFileName.length - 1];
          const name = Date.now();

          const newFileName = `${name}.${extension}`;

          req.body[options.fieldname] = newFileName;

          cb(null, newFileName);
        },
      }),*/
      /*limits: { fileSize: options.maxSize },
      fileFilter: (req, file, cb) => {
        const allowedMimes = options.allowedExtensions;
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type."));
        }
      },*/
    }).single(options.fieldname);
  }
}
