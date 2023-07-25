import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface MyQuery extends DataQuery {
  s3Bucket: string;
  s3Key: string;
}

export const DEFAULT_QUERY: Partial<MyQuery> = {
  s3Bucket: 'my-s3-bucket',
  s3Key: 'path/to/file',
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData { }
