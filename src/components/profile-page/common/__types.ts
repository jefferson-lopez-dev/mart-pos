export interface TypesInputDataEdit {
  label: string;
  data: string;
  sudmitData?: (data: object) => void;
  registerInput?: string;
  editData?: boolean;
  dialogDescription?: string;
  dialogTitle?: string;
}
