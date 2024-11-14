import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { SamAssistantModule } from './sam-assistant/sam-assistant.module';

@Module({
  imports: [
    GptModule, 
    ConfigModule.forRoot(),
    SamAssistantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
