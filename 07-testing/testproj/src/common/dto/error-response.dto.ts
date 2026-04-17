// src/common/dto/error-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {

    @ApiProperty({ example: false })
    success!: boolean;

    @ApiProperty({ example: 'Unauthorized' })
    message!: string;

    @ApiProperty({ example: '2026-04-08T10:00:00.000Z' })
    timestamp!: string;

    @ApiProperty({ example: '/users/1' })
    path!: string;
}