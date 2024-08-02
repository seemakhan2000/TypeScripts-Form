// types.ts
export interface UserData {
    _id: string;
    username: string;
    email: string;
    phone: string;
  }
  

  interface FormValue {
    username: string;
    email: string;
    phone: string;
    password: string;
  }
  
  export default FormValue;