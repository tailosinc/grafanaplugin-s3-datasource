# Grafana Plugin: S3 Data Source

Provide S3 resources as presigned URLs.

## Getting Started

```
cd grafanaplugin-s3-datasource
npm i
npm run server
npm run dev
```

## Push a version tag

To trigger the workflow we need to push a version tag to github. This can be achieved with the following steps:

1. Run `npm version <major|minor|patch>`
2. Run `git push origin main --follow-tags`
