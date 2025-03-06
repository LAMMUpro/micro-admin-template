import { DefaultTheme, UserConfig } from "vitepress";
import fse from "fs-extra";
import path from "path";

/**
 * /src/Docs/目录下的文件/文件夹
 * ps: 过滤掉非.md的文件 / 只是Docs目录下第一层
 */
const dirList = fse
  .readdirSync("./src/Docs")
  .filter(
    (name) =>
      /** 过滤掉_前缀的目录 */
      (!name.startsWith("_") &&
        (fse.statSync(path.resolve("./src/Docs", name)).isDirectory()) ||
        name.endsWith(".md"))
  );

/**
 * 动态生成目录
 */
const sidebar = dirList
  .map((name) => generateCatalog(path.resolve("./src/Docs"), `${name}`))
  .filter(Boolean);

/**
 * 生成目录
 */
function generateCatalog(
  /** md文件所在路径 */
  _path: string,
  /** 目录名 / 文件名 */
  name: string,
  /** 前缀（相对于_path后的） */
  _prefix: string = "/Docs"
) {
  
  if (name.startsWith('_')) return;
  const prefix = `${_prefix}/${name}`;
  /** name是文件名 */
  if (fse.statSync(path.resolve(_path, name)).isFile()) {
    return {
      text: name.slice(0, -3),
      items: [{ text: name, link: name }],
    };
    /** name是目录名 */
  } else if (fse.statSync(path.resolve(_path, name)).isDirectory()) {
    return {
      text: name,
      items: fse
        .readdirSync(path.resolve(_path, name))
        .map((_name) => {
          /** 过滤掉_前缀的目录 */
          if (_name.startsWith("_")) return;
          if (fse.statSync(path.resolve(_path, name, _name)).isFile()) {
            
            // 处理文件
            if (_name.endsWith(".md")) {
              const name_without_type = _name.slice(0, -3);
              return {
                text: name_without_type,
                link: `${prefix}/${_name}`,
              };
            }
          } else if (
            fse.statSync(path.resolve(_path, name, _name)).isDirectory()
          ) {
            // 处理目录
            return generateCatalog(path.resolve(_path, name), _name, prefix); // 循环处理
          }
        })
        .filter(Boolean),
    };
  }
}

/**
 * 取第一个有效路由
 */
function getFirstRoute(sidebar: DefaultTheme.SidebarItem[]) {
  for (let i = 0; i < sidebar.length; i++) {
    const item = sidebar[i];
    if (item.link) {
      return item.link;
    } else if (item.items) {
      const link = getFirstRoute(item.items);
      if (link) return link;
    }
  }
}

/** [docs](https://vitepress.dev/reference/default-theme-config) */
const themeConfig: UserConfig<DefaultTheme.Config>["themeConfig"] = {
  /** 启用本地搜索 */
  search: {
    provider: 'local',
  },
  /** 左上角图标 */
  logo: "/favicon.ico",
  nav: [
    { text: "首页", link: "/" },
    { text: "文档", activeMatch: `^/Docs/`, link: getFirstRoute(sidebar) },
    {
      text: "🔗在线预览",
      link: "https://micro-admin-template.lammu.cn/micromain/introduce",
    }, // 跳到介绍页
    {
      text: "关于",
      activeMatch: `^/About/`,
      items: [
        { text: "更新历史", link: "/About/history" },
        { text: "加入社区", link: "/About/discussion" },
      ],
    },
  ],
  /** sidebar用object指定前缀, 不要直接写array, 不然其它页面的上下页会有问题 */
  sidebar: {
    "/Docs/": sidebar,
  },
  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/LAMMUpro/micro-admin-template",
    },
  ],
};

export default themeConfig;
