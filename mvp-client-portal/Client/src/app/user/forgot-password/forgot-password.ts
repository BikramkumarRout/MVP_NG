export class  PasswordDto {
  public email: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public password: string = "";
  public userId?: number = null;
  }
export class ForgotPasswordDto extends  PasswordDto {
  public confirmPassword: string = "";
  }
