class Upload {
  uploadFile(file: File) {
    //this.validate(file)
    this.progress(file);
  }

  /*validate(file: File){
        if(file.size>5000000) throw new Error("File must be less than 5MB")
        console.log("file validated")
    }*/

  progress(file: File) {
    console.log("file is uploading");
  }
}

class UploadAWS extends Upload {
  override validate(file: File) {
    if (!file.type.startsWith("image/"))
      throw new Error("File must be an image");
    console.log("my validation has been executed");
  }
}

const file = new File(["data"], "data.csv", { type: "text/plain" });
const upload = new UploadAWS();
upload.uploadFile(file);
