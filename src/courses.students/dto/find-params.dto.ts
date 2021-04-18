import { PickType } from "@nestjs/swagger";
import { FindOneParams } from "./find-one-params.dto";

export class FindParams extends PickType(FindOneParams, ['courseId'] as const) {

}