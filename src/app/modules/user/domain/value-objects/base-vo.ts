export abstract class BaseVO<DataType> {
  private readonly value: DataType;

  constructor(value: DataType) {
    this.value = value;
  }

  getValue(): DataType {
    return this.value;
  }
}
