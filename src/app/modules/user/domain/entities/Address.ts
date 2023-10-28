export class Address {
  readonly street: string;
  readonly number: number;
  readonly city: string;
  readonly country: string;

  constructor(street: string, number: number, city: string, country: string) {
    this.street = street;
    this.number = number;
    this.city = city;
    this.country = country;
  }
}
