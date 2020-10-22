<!-- 基础后台组件使用DEMO页 以供CV 公共事件名最好不要自行更改 直接CTRL C --以便维护 -->
<template>
  <div class="page">
    <!-- search bar -->
    <search-bar
      v-model="form.data"
      :config="form.config"
      :loading="form.loading"
      :form-btn="['query', 'reset', 'insert', 'delete']"
      @query="query"
      @reset="reset"
      @insert="insert"
      @delete="deleteList"
    >
      <!-- 使用slot传进的field初始值为undefined（除特殊控件非用不可 尽量不用 违背了封装本意） -->
      <template v-slot:form="{ data }">
        <a-form-model-item prop="idcard">
          <a-input v-model="data['idcard']" placeholder="身份证号"></a-input>
        </a-form-model-item>
      </template>
    </search-bar>

    <!-- table -->
    <a-table
      bordered
      rowKey="uid"
      size="small"
      :data-source="table.data"
      :pagination="table.pagination"
      :loading="table.loading"
      :row-selection="table.selection"
      @change="pageChange"
    >
      <a-table-column title="序号" data-index="uid" :width="60" align="center"></a-table-column>
      <a-table-column title="姓名" data-index="name"></a-table-column>
      <a-table-column title="性别" data-index="gender">
        <template v-slot="r">
          <a-tag :color="r === 0 ? 'purple' : 'cyan'">{{ r === 1 ? '男' : '女'}}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="年龄" data-index="age"></a-table-column>
      <a-table-column title="身份证" data-index="idCard"></a-table-column>
      <a-table-column title="住址" data-index="address"></a-table-column>
      <a-table-column title="性格" data-index="tags">
        <template v-slot="r">
          <a-tag v-for="tag in r" :key="tag" color="blue">{{ tag }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column title="操作" key="action">
        <template v-slot="r">
          <a-button
            size="small"
            type="primary"
            icon="edit"
            class="btn-warning m-r-3"
            @click="updateItem(r)"
            shape="round"
          >编辑</a-button>
          <a-popconfirm title="确定删除这条记录吗?" ok-text="是" cancel-text="否" @confirm="deleteItem(r)">
            <a-button size="small" type="danger" icon="delete" shape="round">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table-column>
    </a-table>

    <!-- modal insert or update -->
    <base-modal 
      v-model="modal.data"
      title="新增表单"
      :visible="modal.visible"
      :config="modal.config"
      :rules="modal.rules"
      :loading="form.loading"
      @cancel="cancel"
      @submit="submit"
    >
    </base-modal>
  </div>
</template>

<script>
import SearchBar from "@c/base/SearchBar";
import BaseModal from "@c/base/BaseModal";
import { baseList } from "@/api/listApi";
export default {
  components: {
    SearchBar,
    BaseModal
  },
  data() {
    return {
      form: {
        data: {
          idCard: ''
        },
        loading: false,
        config: [
          {
            tag: "input",
            field: "name",
            placeholder: "姓名",
          },
          {
            tag: "select",
            field: "gender",
            //设置初始值 解决antd select placeholder不显示问题
            value: undefined,
            placeholder: "性别",
            options: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 0,
              },
            ],
          },
          {
            tag: "input",
            field: "age",
            placeholder: "年龄",
          },
          {
            tag: "date-picker",
            field: "date",
            valueFormat: "YYYYMMDD",
            placeholder: "入职日期",
          },
        ],
      },
      table: {
        data: [],
        loading: false,
        selection: {
          //所有选中行数据
          selectedRows: [],
          //所有选中行的key(uid) 以供清空选中行使用
          selectedRowKeys: [],
          onChange: (keys, rows) => {
            this.table.selection.selectedRowKeys = keys
            this.table.selection.selectedRows = rows
          } 
        },
        pagination: {
          current: 1,
          total: 0,
          pageSize: 10,
          showTotal: (t) => `共 ${t} 条记录`,
          showQuickJumper: true,
          showSizeChanger: true,
        },
      },
      modal: {
        data: {},
        visible: false,
        loading: false,
        config: [
          {
            tag: "input",
            field: "name",
            label: "姓名",
          },
          {
            tag: "select",
            field: "gender",
            label: "性别",
            options: [
              {
                label: "男",
                value: 1,
              },
              {
                label: "女",
                value: 0,
              },
            ],
          },
          {
            tag: "input",
            field: "age",
            label: "年龄",
          },
          {
            tag: "date-picker",
            field: "date",
            valueFormat: "YYYYMMDD",
            label: "入职日期",
          },
        ],
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请输入姓名' },
            { trigger: 'blur', min: 2, max: 4, message: '姓名长度不合法' }
          ],
          gender: [
            { required: true, trigger: 'change', message: '请选择性别' }
          ],
          age: [
            { required: true, trigger: 'blur', message: '请输入年龄' },

          ]
        }
      }
    };
  },
  created(){
    this.setBaseList()
  },
  methods: {
    //custom events
    async setBaseList(
      current = this.table.pagination.current,
      pageSize = this.table.pagination.pageSize,
      formObj = {}
    ) {
      this.table.loading = true
      const { resultCode, data } = await baseList(current, pageSize, formObj);
      this.table.loading = false;
      this.form.loading = false;
      if (resultCode === 0) {
        const { records, total, size, current } = data;
        this.table.data = records.map((r, i) => ({
          uid: i + 1 + (current - 1) * size,
          ...r
        }));
        this.table.pagination = {
          ...this.table.pagination,
          current,
          total,
          pageSize: size,
        };
      } else {
        this.$message.error("服务器错误");
      }
    },
    //search bar + table events
    query(v) {
      console.log(v)
      this.form.loading = true
      this.setBaseList(1, 10, v);
    },
    //重置参数并请求
    reset() {
      this.setBaseList()
    },
    //插入数据
    insert() {
      this.modal.visible = true
    },
    //多选事件change
    onChange(e) {
      console.log(e)
    },
    //table编辑
    updateItem(r) {
      console.log(r)
      this.modal.data = r
      this.modal.visible = true
    },
    //多选删除
    deleteList() {
      //选中行个数
      const selectedRowCount = this.table.selection.selectedRows.length
      if(selectedRowCount === 0){
        this.$message.error('未选中任何记录项！')
        return;
      }
      this.$confirm({
        title: '确定删除选中记录项?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          //delete请求
          //多选删除成功后记得清空selectedRowKeys 为 []
        }
      })
    },
    //table删除（当行）
    deleteItem(r) {
      console.log(r)
    },
    //分页change
    pageChange({ current, pageSize }) {
      this.setBaseList(current, pageSize, this.form.data);
    },
    //modal 取消
    cancel() {
      this.modal.visible = false
    },
    //modal 提交
    submit() {}
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/page.less";
</style>
