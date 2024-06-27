export class PrepareBatchDto {
  public id: number;
  public name: string;
  public email: string = null;
  public isChecked:boolean = true;
  public userId: number;
  public mailCampaingId: number;
  public toMail: string = null;
  public phoneNumber: string;
}
export enum PrepareBatcType {
  facesheet = "New Face Sheet",
  resume = "Resume",
}

export class ListingData {
  public id: number;
  public name: string;
  public jobId: number
}