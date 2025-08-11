import { NotFoundException, Logger } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {
    console.log(
      'đây là abtract ----------------------------------------- initialized',
    );
  }

  /**
   * Create a new document
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  /**
   * Find one document by filter
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  /**
   * Find multiple documents by filter
   */
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  /**
   * Find one document and update it
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean<TDocument>(true);

    if (!updatedDocument) {
      this.logger.warn('Document to update not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return updatedDocument;
  }

  /**
   * Find one document and delete it
   */
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!deletedDocument) {
      this.logger.warn('Document to delete not found', filterQuery);
      throw new NotFoundException('Document not found');
    }

    return deletedDocument;
  }
}
