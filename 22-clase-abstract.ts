abstract class Upload {
  abstract newFilename: string;
  abstract saveFile(file: File): void;

  constructor() {
    this.progress();
  }

  progress() {
    console.log("upload file");
  }
}

class UploadAWS extends Upload {
  newFilename: string = new Date().getTime().toString();

  saveFile(file: File) {
    console.log("upload file to AWS");
  }
}

const file = new File(["data"], "image.jpg", { type: "image/jpeg" });
const upload = new UploadAWS();
upload.saveFile(file);
