export class User {
  public id: number;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;
  public profileImageUrl: string;
  public role: string;
  public authorities: [];
  public isActive: boolean;
  public isNotLocked: boolean;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.isActive = false;
    this.isNotLocked = false;
    this.role = '';
    this.authorities = [];
  }

}
