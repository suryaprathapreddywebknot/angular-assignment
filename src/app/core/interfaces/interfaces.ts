export interface Iuser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  title: string;
  profile_pic: string;
}

export interface Iissue {
  id: number;
  created_at: string;
  updated_at: string;
  short_id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  created_by: string;
  assignee: number;
}

export class issueData {
  constructor(
    public id:any,
    public created_at: any,
    public updated_at: any,
    public short_id: any,
    public title: any,
    public description: any,
    public priority: any,
    public status: any,
    public created_by: any,
    public assignee: any,
    public type:any,
    public sprint  :any,
    public storyPoints:any
  ) {}
}
