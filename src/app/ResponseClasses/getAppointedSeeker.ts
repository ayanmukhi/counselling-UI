export interface GetAppointedSeeker {
    success : boolean;
    data : {
        clientName : string;
        clientImage : string;
        clientGender : string;
        clientPhone : string;
    }
}