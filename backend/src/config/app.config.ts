import { ConfigModule } from '@nestjs/config';

export default ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  envFilePath: '../.env',
  cache: true,
});
