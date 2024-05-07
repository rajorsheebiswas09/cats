import { Ref, prop } from '@typegoose/typegoose';
import { User } from './user.model';

export class Task {
  @prop()
  name: string;

  @prop()
  description: string;

  @prop({ default: new Date() })
  createdAt: string;

  @prop({ default: new Date() })
  updatedAt: string;

  @prop({ ref: () => User }) // for one
  user: Ref<User>;
}
