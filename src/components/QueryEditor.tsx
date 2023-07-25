import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { DEFAULT_QUERY, MyDataSourceOptions, MyQuery } from '../types';


type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery }: Props) {
  const onS3BucketChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, s3Bucket: event.target.value });
  };

  const onS3KeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...query, s3Key: event.target.value });

    // executes the query
    onRunQuery();
  };

  const { s3Key, s3Bucket } = query;

  return (
    <div
      style={{
        flexDirection: 'column',
      }}
      className="gf-form">

      <InlineField required={true} labelWidth={20} label="S3 Bucket" tooltip="The name of an s3 bucket.">
        <Input
          onChange={onS3BucketChange}
          value={s3Bucket}
          width={40}
          placeholder={DEFAULT_QUERY.s3Bucket}
        />
      </InlineField>

      <InlineField required={true} labelWidth={20} label="S3 Object Key"
        tooltip="The path to an object in a given bucket. Regex patterns are supported.">
        <Input
          onChange={onS3KeyChange}
          value={s3Key}
          width={80}
          placeholder={DEFAULT_QUERY.s3Key}
        />
      </InlineField>
    </div>
  );
}
