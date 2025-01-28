import { Module } from '@nestjs/common';
import { NotificationGateway } from './gateways/notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/auth/models/auth.model';
import { Notification, NotificationSchema } from './models/notification.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class NotificationModule {}
