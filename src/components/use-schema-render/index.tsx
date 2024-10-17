import React, { useEffect, useState } from 'react';
import {
  buildComponents,
  assetBundle,
  AssetLevel,
  AssetLoader,
} from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { findPageSchemaByNodeId } from '@/api/pageSchema';
import { appHelper } from './config';
import { generateRemoteHandleMap } from './lowcode-utils/index.esm';

/** 只赋值一次上下文! */
let isSeted = false;

const UseSchemaRender = (props: { nodeId: number }) => {
  useEffect(() => {
    init();
  }, []);

  const [schema, setSchema] = useState({} as any);
  const [components, setComponents] = useState({} as any);

  /** 初始化函数 */
  async function init() {
    const res = await findPageSchemaByNodeId({ nodeId: props.nodeId });
    const packages = res.data.package;

    /** 处理路径兼容性问题 */
    packages.forEach((item) => {
      if (item.package.startsWith('@lammu/')) {
        item.urls = item.urls.map((url) => `/micromain/${url}`);
      }
    });

    const projectSchema = res.data.schema;
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];
    const libraryMap = {};
    const libraryAsset: Array<any> = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }: any) => {
      (libraryMap as any)[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });
    assetBundle(libraryAsset, AssetLevel.Library);

    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    //@ts-ignore
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));
    setSchema(schema);
    setComponents(components);
  }

  function onCompGetCtx(schema: any, ctx: any) {
    if (!isSeted && schema.componentName == 'Page') {
      ctx.remoteHandleMap = generateRemoteHandleMap.call(
        ctx,
        schema?.remoteHandle?.list || []
      );
      isSeted = true;
    }
  }

  return (
    <ReactRenderer
      schema={schema}
      components={components}
      onCompGetCtx={onCompGetCtx}
      appHelper={appHelper}
    />
  );
};

export default UseSchemaRender;
