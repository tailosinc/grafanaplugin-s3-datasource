import { AwsCredentialIdentity } from '@aws-sdk/types';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';

import defaults from 'lodash/defaults';

import { getPresignedUrl } from 's3';


import { DEFAULT_QUERY, MyDataSourceOptions, MyQuery } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  private credentials: AwsCredentialIdentity;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.credentials = {
      accessKeyId: instanceSettings.jsonData.awsAccessKeyId,
      secretAccessKey: instanceSettings.jsonData.awsSecretAccessKey,
    };
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const data = await Promise.all(
      options.targets.map(async (target) => {
        const query = defaults(target, DEFAULT_QUERY);
        const templater = getTemplateSrv();

        const bucket = templater.replace(query.s3Bucket, options.scopedVars);
        const key = templater.replace(query.s3Key, options.scopedVars);

        // TODO: allow regex patterns as keys and provide a new MutableDataFrame for each match
        const url = await getPresignedUrl({
          credentials: this.credentials,
          region: 'us-east-1',
          bucket,
          key,
        });

        return new MutableDataFrame({
          refId: query.refId,
          fields: [{ name: 'Value', values: [url], type: FieldType.string }],
        });
      }),
    );

    return { data };
  }

  async testDatasource() {
    // TODO: Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
