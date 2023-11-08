export interface AllUser {
    user_id: number;
    name: string;
    firstname: string;
    lastname: string;
    is_present:boolean;
    date:Date;
    attendence:boolean;
  }
  

export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    department: string;
    type: string;
    gender: string;
    technologies_familiar_with: string[];
    tech_list: [];
    phone_number: string;
    address: string;
    city: string;
  }

export interface Technology{
  id: number;
  name: string
}