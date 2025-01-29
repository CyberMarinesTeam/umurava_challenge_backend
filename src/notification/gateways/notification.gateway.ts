import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../models/notification.model';
import { Model } from 'mongoose';
@WebSocketGateway({ cors: '*' })
export class NotificationGateway {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
  ) {}
  @WebSocketServer()
  server: Server;
  async sendNotification(
    userId: string,
    message: string,
    @ConnectedSocket() client?: Socket,
  ) {
    await this.notificationModel.create({
      user: userId,
      message,
      isRead: false,
    });
    if (client) {
      console.log(message, ' message');
      return await client.emit('notification', message);
    }
  }
  @SubscribeMessage('read')
  async notificationRead(@ConnectedSocket() client?: Socket) {
    const updated = await this.notificationModel.updateMany(
      {},
      { $set: { isRead: true } },
    );
    if (updated && client) {
      console.log('notification updated successfully message');
      return client.emit('notification-read', {
        message: 'notification updated successfully',
      });
    }
  }
  @SubscribeMessage('broadcast')
  async BroadCastMessage(message: string) {
    const broadcastNotification = await this.notificationModel.create({
      message,
      isRead: false,
    });
    if (broadcastNotification) {
      return this.server.emit('broadcast-message', message);
    }
  }
}
