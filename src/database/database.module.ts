import { Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://spythere:IFiClmDJEblJOJqd@cluster0.ecluflj.mongodb.net/growthtop',
      ),
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
