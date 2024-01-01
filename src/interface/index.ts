import { ReactNode } from "react";

export interface children {
  children: ReactNode;
}

export interface dataAuth {
  gmail: string;
  password: string;
}

export interface DataCredsProfile {
  email: string;
  fullname: string;
  createdAt: string;
  country: string;
  picture: {
    url: string;
    status: string;
  };
}

export interface Inventory {
  name: string;
  description?: string;
}
