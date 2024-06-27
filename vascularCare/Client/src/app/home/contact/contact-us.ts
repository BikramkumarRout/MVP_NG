export class ContactUsDto {
    public name: string = "";
    public email: string = "";
    public subject: string;
    public phone:string;
    public message: string = "";
    public isTesting: boolean = false;
    public testEmailRecipents: string;
    public MailCampaignId: number;
  }
  