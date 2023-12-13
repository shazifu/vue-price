const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          "github",
          // {
          //   provider: "generic",
          //   url: "https://s.jiu-guo.com/upload/app/", // 放置安装包和latest.yml的服务器地址
          // },
        ],
        asar: true,
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // installerIcon: '', // 安装图标
          // uninstallerIcon: '', //卸载图标
          // installerHeaderIcon: '', // 安装时头部图标
          // shortcutName: '', // 图标名称
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
        },
        win: {
          icon: "./build/icons/icon.ico", // 打包后的应用图标 public 目录下的图标  注意图标最小255 * 255，否则打包会报错
          artifactName: "测试_${version}.${ext}", // 打包后的执行文件名称
          // artifactName: 'chain-desktop_setup_${version}.${ext}', // 打包后的安装包名称
          target: ["nsis", "zip"], // 打包成安装包和免安装版
        },
        productName: "测试应用", // 应用名称
      },
    },
  },
});
