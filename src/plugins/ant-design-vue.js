import Vue from 'vue'

import {
    ConfigProvider,
    Row,
    Col,
    Button,
    Icon,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Checkbox,
    message,
    notification,
    Layout,
    Menu,
    Avatar,
    Dropdown,
    Breadcrumb,
    Tabs,
    Radio,
    Tag,
    Badge,
    Divider,
    FormModel,
    Table,
    Modal,
    Tooltip,
    Popconfirm
} from 'ant-design-vue'

Vue.use(ConfigProvider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Breadcrumb)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Badge)
Vue.use(Divider)
Vue.use(FormModel)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Popconfirm)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm