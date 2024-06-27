export class JobDetailDto {
    public applName: string;
    public emailId: string;
    public phoneNumber: string;
    public userId: number;
    public jobId: number;
    public isTesting: boolean = true;
    public testEmailRecipents: string;
    public MailCampaignId: number;
}