import { credsData, TypesInputDataEdit } from "../common";
import { DialogEditCard } from ".";

export function DataEditCard(props: TypesInputDataEdit) {
  const { label, data, editData = true } = props;

  return (
    <div className="w-full sm:w-[500px] h-[50px] flex justify-between px-3 py-1 items-center rounded-lg">
      <div>
        <p className="opacity-50 text-[12px]">{label}</p>
        <p className="opacity-90 overflow-hidden text-ellipsis break-keep">
          {credsData(data)}
        </p>
      </div>
      {editData && <DialogEditCard {...props} />}
    </div>
  );
}
