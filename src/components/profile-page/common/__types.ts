export interface DialogEditCardProps {
  data: string;
  dialogTitle?: string;
  dialogDescription?: string;
  sudmitData?: (data: any) => {}; // Ajusta el tipo de acuerdo a la forma de tus datos
  label?: string;
  registerInput: string;
}
export interface TypesInputDataEdit extends DialogEditCardProps {
  editData?: boolean;
}
