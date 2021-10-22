import mongoose, { Schema } from 'mongoose';

interface IHello {
  username: string;
  dateOfBirth: string;
}

interface HelloDoc extends mongoose.Document {
  username: string;
  dateOfBirth: string;
}

interface helloModelInterface extends mongoose.Model<HelloDoc> {
  build(attr: IHello): HelloDoc;
}

const HelloSchema = new Schema({
  username: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
});

HelloSchema.statics.build = (attr: IHello) => {
  return new Hello(attr);
};

const Hello = mongoose.model<HelloDoc, helloModelInterface>('Hello', HelloSchema);

export { Hello };
