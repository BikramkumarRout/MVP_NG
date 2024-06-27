export class  RoleDto {
  public id: number = 0;
  public name: string = '';
  public displayName: string = '';
  public roleDescription: string = '';
  public permission: any[];
  public deletePermission: any[] = [];
  public userId: number = 0;
  public permissionDetail: any[] = [];


  }
