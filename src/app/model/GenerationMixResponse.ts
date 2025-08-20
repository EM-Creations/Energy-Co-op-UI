import {GenerationMix} from './GenerationMix';

export interface GenerationMixResponse {
  data?: {
    from: Date,
    to: Date,
    generationmix: GenerationMix[]
    },
  error?: {
    code: string,
    message: string
  }
}
