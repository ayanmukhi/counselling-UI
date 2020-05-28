export interface GetCounselor {
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
        availability:[
            {
                Id : string,
                Status:string,
                Time:string,
                Day:[string],
                Type:string,
                Location:string,
                Rating:string
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