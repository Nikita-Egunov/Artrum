import { Token } from "@/shared";
import * as jwt from "jsonwebtoken";

export async function isVerified(token: string | undefined): Promise<boolean> {
  try {
    // 1. Проверка наличия токена и секрета
    if (!token || !process.env.JWT_SECRET) {
      return false;
    }

    // 2. Верификация токена
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) {
      return false;
    }

    // 3. Декодирование токена
    const decoded = jwt.decode(token) as Token;

    // 4. Проверка типа токена
    if (decoded.type !== "access") {
      return false;
    }

    // 5. Проверка наличия id в токене
    if (!decoded.userId) {
      return false;
    }

    // Если все проверки пройдены
    return true;
  } catch (error) {
    // Любая ошибка = пользователь не верифицирован
    return false;
  }
}
