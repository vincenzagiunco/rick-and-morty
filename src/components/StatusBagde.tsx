import { Badge } from "antd";
import { CharacterStatus } from "../api/models";
import { PresetStatusColorType } from "antd/es/_util/colors";

interface Props {
  status: CharacterStatus;
}

const characterStatusAntdStatusMap: {
  [k in CharacterStatus]: PresetStatusColorType;
} = { Alive: "success", Dead: "error", unknown: "default" };

const characterStatusLabelMap: { [k in CharacterStatus]: string } = {
  Alive: "Alive",
  Dead: "Dead",
  unknown: "Unknown",
};

export function StatusBadge({ status }: Props) {
  return (
    <Badge
      status={characterStatusAntdStatusMap[status]}
      text={characterStatusLabelMap[status]}
    />
  );
}
