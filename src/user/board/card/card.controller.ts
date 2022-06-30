import { Controller } from '@nestjs/common';
import {
    ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import { CardService } from './card.service';

@ApiBearerAuth()
@ApiTags('cards')
@Controller('cards')
export class CardController {

    constructor(private readonly cardService: CardService) {}

}