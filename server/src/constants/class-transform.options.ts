import { ClassTransformOptions } from 'class-transformer/ClassTransformOptions';

export const DEFAULT_TRANSFORM_OPTIONS: ClassTransformOptions = {
  excludeExtraneousValues: true,
  strategy: 'excludeAll',
};
