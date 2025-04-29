import {VensysEnergyYield} from './VensysEnergyYield';

export interface VensysDataResponse {
  code: string,
  success: boolean,
  from: Date,
  to: Date,
  processTime: TimeRanges,
  message: string,
  data: object | VensysEnergyYield,
}
