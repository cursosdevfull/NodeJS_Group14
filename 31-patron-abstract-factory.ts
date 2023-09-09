type TYPE_FACTORY = "CLOUD" | "ONPREMISE";
type TYPE_DESTINATION =
  | "aws"
  | "azure"
  | "gcp"
  | "docean"
  | "openshift01"
  | "openshift02";

interface IUpload {
  save(file: File): void;
}

class FactoryUploadAWS implements IUpload {
  save(file: File) {
    console.log("upload to aws");
  }
}

class FactoryUploadAzure implements IUpload {
  save(file: File) {
    console.log("upload to azure");
  }
}

class FactoryUploadGCP implements IUpload {
  save(file: File) {
    console.log("upload to gcp");
  }
}

class FactoryUploadDO implements IUpload {
  save(file: File) {
    console.log("upload to digitalocean");
  }
}

class FactoryUploadOpenshit01 implements IUpload {
  save(file: File) {
    console.log("upload to openshift01");
  }
}

class FactoryUploadOpenshit02 implements IUpload {
  save(file: File) {
    console.log("upload to openshift02");
  }
}

const abstractFactories: Record<TYPE_FACTORY, Record<string, IUpload>> = {
  CLOUD: {
    aws: new FactoryUploadAWS(),
    azure: new FactoryUploadAzure(),
    gcp: new FactoryUploadGCP(),
    docean: new FactoryUploadDO(),
  },

  ONPREMISE: {
    openshift01: new FactoryUploadOpenshit01(),
    openshift02: new FactoryUploadOpenshit02(),
  },
};

function selectFactory(
  cloudOrOnPremise: TYPE_FACTORY,
  destination: TYPE_DESTINATION
): IUpload | string {
  return abstractFactories[cloudOrOnPremise][destination] ?? "not found";
}

const upload: IUpload | string = selectFactory("ONPREMISE", "openshift02");
if (typeof upload === "string") throw new Error("Error selecting");

const file: File = new File(["data"], "content.csv", { type: "text/plain" });
upload.save(file);
