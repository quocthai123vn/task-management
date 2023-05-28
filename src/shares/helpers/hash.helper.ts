import * as bcrypt from 'bcryptjs';

export async function hashString(plainData: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(plainData, salt);
}

export async function isHashEqual(
  plainData: string,
  hashedData: string,
): Promise<boolean> {
  return bcrypt.compare(plainData, hashedData);
}
