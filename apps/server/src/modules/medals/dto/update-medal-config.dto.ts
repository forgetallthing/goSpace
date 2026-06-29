import { PartialType } from '@nestjs/mapped-types';
import { CreateMedalConfigDto } from './create-medal-config.dto';

export class UpdateMedalConfigDto extends PartialType(CreateMedalConfigDto) {}