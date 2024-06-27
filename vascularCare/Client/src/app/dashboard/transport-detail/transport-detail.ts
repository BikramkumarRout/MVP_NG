export class  TransportDetailDto {
    public isConfirmed: boolean;
    public levelOfService: number;
    public arrivalTime: string;
    public name: string;
    public phone: number;
    public phoneExt: string;
    public floor: string;
    public note: string;
    public id: number = 0;
    public userId: number = 0;
    public time: string;
    public arrivalDate: string;
    public facilityId: number;
    public patientId: number;
    public scheduledTime: string;
    public escortService: number;
  }

  export class GetTransportDetailDto {
    public facilityId: number;
    public patientId: number;
    public scheduledTime: string;
  }
  