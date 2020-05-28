interface AllMediaResponse {
    success : boolean;
    data : [
        {
            media_id : string;
            fileRef : string;
            fileTitle : string
        }
    ]
}