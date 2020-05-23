export interface GetSeeker {
    success:boolean;
    data:{
        id:Number,
        name:string,
        gender:string,
        dob:Date,
        username:string,
        password:string,
        role:string,
        image:string,
        bookings:[
            {
                SeekerId : string,
                Date : Date,
                AvailabilityId : string
            }
        ],
        contact : {
            district : string,
            phone : string,
            pin : string,
            state : string,
            streetName : string
        }
    };    
}