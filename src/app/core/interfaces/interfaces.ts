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
    public id:string,
    public created_at: string,
    public updated_at: string,
    public short_id: string,
    public title: string,
    public description: string,
    public priority: string,
    public status: string,
    public created_by: string,
    public assignee: string,
    public type:string,
    public sprint  :string,
    public storyPoints:string
  ) {}
}
