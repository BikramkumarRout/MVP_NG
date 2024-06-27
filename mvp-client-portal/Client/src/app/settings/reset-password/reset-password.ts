export class ResetPasswordDto {
  public password: string = "";
  public confirmPassword: string = "";
  public userId: number;
  public currentPassword: string = "";
}
