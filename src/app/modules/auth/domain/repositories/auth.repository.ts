export interface AuthRepository {
  findUserByEmail(email: string): Promise<any>;
}
