<template>
    <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
                :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in sidebarRouters"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}
export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
        sidebarRouters: {
      get() {
        const a=[
          {"name":"System","path":"/system","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"系统管理","icon":"system","noCache":false,"link":null},
          "children":[{"name":"User","path":"user","hidden":false,"component":"system/user/index","meta":{"title":"用户管理","icon":"user","noCache":false,"link":null}},
          {"name":"Post","path":"post","hidden":false,"component":"system/post/index","meta":{"title":"岗位管理","icon":"post","noCache":false,"link":null}},
          {"name":"Config","path":"config","hidden":false,"component":"system/config/index","meta":{"title":"配矿设置","icon":"edit","noCache":false,"link":null}},
          ]},
          {
            "name":"Monitor","path":"/monitor","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"系统监控","icon":"monitor","noCache":false,"link":null},
            "children":[{"name":"Job","path":"job","hidden":false,"component":"monitor/job/index","meta":{"title":"放卸矿任务","icon":"job","noCache":false,"link":null}},{"name":"Server","path":"server","hidden":false,"component":"monitor/server/index","meta":{"title":"矿场监控","icon":"server","noCache":false,"link":null}}]
          },
          {
            "name":"Monitor","path":"/map","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"地图展示","icon":"druid","noCache":false,"link":null},
            "children":[
            {"name":"Job","path":"","hidden":false,"component":"monitor/job/index","meta":{"title":"查看地图","icon":"job","noCache":false,"link":null}}
            ]
          },
          {
            "name":"Monitor","path":"/bigScreen","hidden":false,"redirect":"noRedirect","component":"Layout","alwaysShow":true,"meta":{"title":"大屏展示","icon":"druid","noCache":false,"link":null},
            "children":[
            {"name":"Job","path":"","hidden":false,"component":"monitor/job/index","meta":{"title":"查看大屏","icon":"job","noCache":false,"link":null}}
            ]
          }
         ]
        let updated= (JSON.parse(JSON.stringify(a)))
        return updated;
      },
    //   set(value) {
    //     const updatedRouters = [...value]; // 创建一个副本
    //     updatedRouters.forEach((router, index) => {
    //       // 修改副本中的值
    //       updatedRouters[index] = { ...router, title: "New Title" };
    //     });
    //     this.$store.commit("updateSidebarRouters", value);
    //   }

    }
}
};
</script>
