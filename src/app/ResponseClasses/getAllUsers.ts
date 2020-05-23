export class GetAllUsers {
    success:boolean;
    data:
        [
            {
                id:Number,
                name:string,
                gender:string,
                dob:Date,
                username:string,
                password:string,
                role:string,
                image:string
                availability:[
                    {
                        status:string,
                        time:string,
                        day:string,
                        type:string,
                        location:string,
                        rating:string
                    }
                ],
                booking : [
                    {
                        SeekerId : string,
                        Date : string,
                        AvailabilityId : string
                    }
                ]
            }
        ]
}