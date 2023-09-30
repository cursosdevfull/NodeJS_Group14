import { BaseVO } from "./base-vo";

export class AgeVO extends BaseVO<number> {
  private constructor(age: number) {
    super(age);
  }

  static create(age: number | undefined): AgeVO {
    if (age && (age < 19 || age > 140))
      throw new Error("La edad debe estar entre 19 y 140 años");

    return new AgeVO(age as number);
  }
}
