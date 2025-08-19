export interface Token {
  userId: number;
  type: "access";
}

export interface RefreshToken {
  userEmail: string;
  type: "refresh";
}