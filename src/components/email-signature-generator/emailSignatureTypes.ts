export interface EmailSignature {
  count: number;
  success: boolean;
  data: [];
}

export interface FormData {
  name: string;
  jobTitle: string;
  email: string;
}

export interface ApiResponse {
  count: number;
  success: boolean;
  data: [
    {
      employee_photo: string;
      employee_work_email: string;
    },
  ];
}
