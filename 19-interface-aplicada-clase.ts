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

const uploadRepository: IUpload = new UploadAzure();
const uploadFile = new UploadFile(uploadRepository);

const file = new File(["data"], "image.png", { type: "image/png" });
uploadFile.execute(file);
