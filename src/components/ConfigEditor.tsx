import React, { ChangeEvent } from 'react';
import { InlineField, Input, SecretInput } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
// import { MyDataSourceOptions, MySecureJsonData } from '../types';
import { MyDataSourceOptions } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> { }

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;

  const onAwsAccessKeyIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,
      awsAccessKeyId: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  const onAwsSecretAccessKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const jsonData = {
      ...options.jsonData,

      awsSecretAccessKey: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  const onResetAPIKey = () => {
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  const { jsonData, secureJsonFields } = options;
  // TODO: do we need secureJsonData?
  // const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

  return (
    <div className="gf-form-group">
      <InlineField label="API Access Key ID" labelWidth={20}>
        <Input
          onChange={onAwsAccessKeyIdChange}
          value={jsonData.awsAccessKeyId || ''}
          placeholder="ACCESS_KEY_ID"
          width={40}
        />
      </InlineField>
      <InlineField label="AWS Secret Access Key" labelWidth={20}>
        <SecretInput
          isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}
          value={jsonData.awsSecretAccessKey || ''}
          placeholder="SECRET_ACCESS_KEY"
          width={40}
          onReset={onResetAPIKey}
          onChange={onAwsSecretAccessKeyChange}
        />
      </InlineField>
    </div>
  );
}
