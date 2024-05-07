import { Prop, Schema } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import mongoose from 'mongoose';

export class User {
  @prop()
  _id: mongoose.Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  isLoggedIn: boolean;
}
