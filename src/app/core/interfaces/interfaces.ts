export interface Iuser{
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    title:string,
    profile_pic:string
}

export interface Iissue{
    id:number,
    created_at:string,
    updated_at:string,
    short_id:string,
    title:string,
    description:string,
    priority:string,
    status:string,
    created_by:string,
    assignee:number
}