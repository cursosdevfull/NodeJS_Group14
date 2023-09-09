interface IUpload {
  save(file: File): void;
}

class UploadFile {
  constructor(private readonly repository: IUpload) {}

  execute(file: File) {
    if (!file.type.startsWith("image/"))
      throw new Error("File must be an image");
    this.repository.save(file);
  }
}

class UploadAWS implements IUpload {
  save(file: File): void {
    this.progress(file);
    console.log("File uploaded");
  }

  private progress(file: File) {
    console.log("File is uploading");
  }
}

class UploadGCP implements IUpload {
  save(file: File) {
    this.status(file);
    this.sentNotificationSlack();
  }

  status(file: File) {
    console.log("Status of file");
  }

  sentNotificationSlack() {
    console.log("Notification: file uploaded");
  }
}

class UploadAzure implements IUpload {
  save(file: File) {
    console.log("File is uploading Azure");
  }
}

class UploadFactory {
  select(type: number) {
    if (type === 1) {
      return new UploadAWS();
    } else if (type === 2) {
      return new UploadGCP();
    } else {
      return new UploadAzure();
    }
  }
}

const upload: IUpload = new UploadFactory().select(3);
const uploadFile = new UploadFile(upload);

const file = new File(["binario"], "logo.png", { type: "image/png" });
uploadFile.execute(file);
