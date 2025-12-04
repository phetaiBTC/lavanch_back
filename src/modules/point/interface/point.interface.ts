import { PointNameCode } from 'src/shared/enum/point-name-code';
import {
  ShardInterfaceProps,
  ShardInterfaceResponse,
} from 'src/shared/BaseModule/interface/Base.interface';

export interface PointProps extends ShardInterfaceProps {
  name: string;
  points_multiplier?: number;
  name_code: PointNameCode;
}
export interface PointResponse extends ShardInterfaceResponse {
  name: string;
  points_multiplier?: number;
  name_code: PointNameCode;
}
