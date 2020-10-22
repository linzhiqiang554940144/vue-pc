<template>
  <div class="tags-container">
    <a-tag 
    closable 
    v-for="(r, i) in visitedViews" 
    :key="i" 
    :color="isActive(r) ? '#1890ff' : ''"
    @click="$route.path !== r.path && $router.push(r.path)"
    @close="deleteTags(r, $event)">
      <a-badge :status="isActive(r) ? 'success' : 'default'" />
      {{ r.title }}
    </a-tag>
  </div>
</template>

<script>

import { 
  mapGetters,
  mapActions 
} from 'vuex'

export default {
  name: "TagsView",
  computed: {
    ...mapGetters([
      'visitedViews'
    ])
  },
  watch: {
    $route(){
      this.addTags()
    }
  },
  mounted(){
    this.addTags()
  },
  methods: {
    ...mapActions('app', [
      'addVisitedView',
      'delVisitedView'
    ]),
    isActive(tag){
      return tag.path === this.$route.path
    },
    addTags(){
      const { name, path, meta } = this.$route
      const hasTitleRoute = this.$route.matched.filter(v => Object.prototype.hasOwnProperty.call(v.meta, 'title'))
      this.addVisitedView({name, path, title: meta.title || hasTitleRoute[0].meta.title})
    },
    deleteTags(r, e){
      e.preventDefault();
      //最后一个tag不给删
      if(this.visitedViews.length > 1){
        this.delVisitedView(r)
        const { path } = this.$route
        if(r.path === path){
          this.$router.push(this.visitedViews.slice(-1)[0].path)
        }
      }else{
        this.$message.warning({content: '至少留有一个页签！', key: 'warn'})
      }
    }
  }
};
</script>

<style scoped lang="less">
.tags-container {
  display: flex;
  align-items: center;
  margin-top: 8px;
  width: 100%;
  padding: 0 10px;
  overflow-x: auto;
  overflow-y: hidden;
}

/deep/ .ant-tag {
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border: solid 1px #dfe6e9;
  border-radius: 0;
  border-bottom: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/deep/ .ant-badge-status-text{
  margin-left: 5px;
}

::-webkit-scrollbar {
  display: none;
}
</style>