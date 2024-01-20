<template>
  <div class="container">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="auto">
          <Aside :navData="list" />
        </el-aside>
          <el-main>
          <trendsRouterTabs style="position: sticky; top: 0; left: 0;z-index: 10;"/>
            <router-view v-slot="{ Component }">
              <transition>
                <component :is="Component" style="min-height: 84vh;" />
              </transition>
            </router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from '../components/layout/aside.vue';
import Header from '../components/layout/header.vue';
import trendsRouterTabs from '../components/layout/trendsRouterTabs/index.vue'
import { useRouter } from 'vue-router'
let list = useRouter().getRoutes().filter((item) => item.meta.type === 'first');

</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;

  .el-header {
    height: 7vh;
    background-color: #f5f5f5;
  }

  .el-aside {
    height: 93vh;
    overflow: hidden;
  }

  .el-main {
    background-color: #f5f5f5;
    padding: 0;
    height: 93vh;
  }
}

.v-enter-from {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 0.5s ease-in;
}

.v-enter-to {
  opacity: 1;
}
</style>