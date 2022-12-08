import { Document } from 'mongoose';

export interface ICategory {
  readonly name: string;
  readonly url: string;
  readonly display_name: string;
  readonly credibility: number;
}

export interface ICategoryDoc extends Document, ICategory {}
