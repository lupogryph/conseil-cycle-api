import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateMeetingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    location: string;
}
