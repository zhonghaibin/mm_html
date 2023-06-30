<template>
  <div class="VipSearch">
    <Row>
      <Col>
        <Row class="row">
          <Col class="label">选择分类:</Col>
          <Col v-for="row in search.data" :key="row.id">
            <div
              :class="['bt', current.one.id === row.id ? 'isActive' : 'bt']"
              @click="changeType1(row)"
            >
              {{ row.name }}
            </div>
          </Col>
        </Row>
        <Row v-if="search.select1.length > 0" class="row">
          <Col class="label">选择条件:</Col>
          <Col v-for="item in search.select1" :key="item.id" class="text">
            <span
              :class="['', current.tow.id === item.id ? 'isActive' : '']"
              @click="changeType2(item)"
            >
              {{ item.label }}
            </span>
          </Col>
        </Row>
        <Row v-if="search.select2.length > 0" class="row">
          <Col class="label">具体筛选:</Col>
          <div class="flex">
            <Col v-for="item in search.select2" :key="item.id" class="text">
              <template v-if="item.type === 'text'">
                <span
                  :class="[
                    '',
                    current.thirdly.id === item.id ? 'isActive' : '',
                  ]"
                  @click="changeType3(item)"
                >
                  {{ item.label }}
                </span>
              </template>

              <template v-if="item.type === 'daterange'">
                <span
                  v-if="item.label"
                  :class="[
                    '',
                    current.thirdly.id === item.id ? 'isActive' : '',
                  ]"
                  @click="changeType3(item)"
                >
                  {{ item.label }}
                </span>
                <DatePicker
                  v-model="item.value"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 180px; margin-left: 2px"
                  transfer
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  @on-change="item.value = $event"
                  @on-open-change="changeDatePicker(item)"
                />
              </template>
              <template v-if="item.type === 'select'">
                <Select
                  v-model="item.value"
                  clearable
                  :filterable="item.param.indexOf('filterable') !== -1"
                  :multiple="item.param.indexOf('multiple') !== -1"
                  :placeholder="item.label"
                  style="width: 260px; text-align: left"
                  transfer
                  @on-open-change="changeSelect(item)"
                >
                  <Option
                    v-for="option in item.list"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </Option>
                </Select>
              </template>
              <template v-if="item.type === 'between'">
                <div
                  style="display: flex; align-items: center"
                  @click="setBetWeen(item)"
                >
                  <Input
                    v-model="item.value.min"
                    :placeholder="`最小` + item.label"
                    style="width: 180px"
                    type="number"
                  />
                  -
                  <Input
                    v-model="item.value.max"
                    :placeholder="`最大` + item.label"
                    style="width: 180px"
                    type="number"
                  />

                  <Select
                    v-if="item.date && item.date.type === 'select'"
                    v-model="item.date.value"
                    clearable
                    :filterable="item.date.param.indexOf('filterable') !== -1"
                    :multiple="item.date.param.indexOf('multiple') !== -1"
                    :placeholder="item.date.label"
                    style="width: 180px; margin-left: 4px; text-align: left"
                    transfer
                    @on-open-change="changeSelect(item)"
                  >
                    <Option
                      v-for="option in item.date.list"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </Option>
                  </Select>
                  <DatePicker
                    v-if="item.date && item.date.value === '自定义时间'"
                    v-model="item.dateRange.value"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                    style="width: 180px; margin-left: 2px"
                    transfer
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    @on-change="item.dateRange.value = $event"
                    @on-open-change="changeDatePicker(item)"
                  />
                </div>
              </template>
              <template v-if="item.type === 'group'">
                <div style="display: flex; align-items: center">
                  <Select
                    v-if="item.card"
                    v-model="item.card.value"
                    clearable
                    :filterable="item.param.indexOf('filterable') !== -1"
                    :multiple="item.param.indexOf('multiple') !== -1"
                    :placeholder="item.card.label"
                    style="width: 180px; text-align: left"
                    transfer
                    @on-open-change="changeSelect(item)"
                  >
                    <Option
                      v-for="option in item.card.list"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </Option>
                  </Select>
                  <Select
                    v-model="item.term.value"
                    clearable
                    :filterable="item.param.indexOf('filterable') !== -1"
                    :multiple="item.param.indexOf('multiple') !== -1"
                    :placeholder="item.term.label"
                    style="width: 180px; margin-left: 4px; text-align: left"
                    transfer
                    @on-open-change="changeSelect(item)"
                  >
                    <Option
                      v-for="option in item.term.list"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </Option>
                  </Select>
                  <div
                    v-if="item.term.value === '区间'"
                    style="margin-left: 4px"
                  >
                    <Input
                      v-model="item.data.min"
                      style="width: 90px"
                      type="number"
                    />
                    -
                    <Input
                      v-model="item.data.max"
                      style="width: 90px"
                      type="number"
                    />
                  </div>
                  <div v-else style="margin-left: 4px">
                    <Input
                      v-model="item.data.val"
                      style="width: 180px"
                      type="number"
                    />
                  </div>
                  <Select
                    v-if="item.date && item.date.type === 'select'"
                    v-model="item.date.value"
                    clearable
                    :filterable="item.date.param.indexOf('filterable') !== -1"
                    :multiple="item.date.param.indexOf('multiple') !== -1"
                    :placeholder="item.date.label"
                    style="width: 180px; margin-left: 4px; text-align: left"
                    transfer
                    @on-open-change="changeSelect(item)"
                  >
                    <Option
                      v-for="option in item.date.list"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </Option>
                  </Select>
                  <div
                    v-if="
                      (item.dateRange && !item.date) ||
                      (item.date && item.date.value === '自定义时间')
                    "
                    style="margin-left: 4px"
                  >
                    <span
                      v-if="item.dateRange.label"
                      :class="[
                        '',
                        current.thirdly.dateRange &&
                        current.thirdly.dateRange.id === item.dateRange.id
                          ? 'isActive'
                          : '',
                      ]"
                      @click="changeType3(item)"
                    >
                      {{ item.dateRange.label }}
                    </span>
                    <DatePicker
                      v-model="item.dateRange.value"
                      format="yyyy-MM-dd"
                      placeholder="选择日期"
                      style="width: 180px; margin-left: 2px"
                      transfer
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      @on-change="item.dateRange.value = $event"
                      @on-open-change="changeDatePicker(item)"
                    />
                  </div>
                </div>
              </template>
              <template v-if="item.type === 'input'">
                <span
                  v-if="item.label"
                  :class="[
                    '',
                    current.thirdly.id === item.id ? 'isActive' : '',
                  ]"
                  @click="changeType3(item)"
                >
                  {{ item.label }}
                </span>
                <Input
                  v-model="item.value"
                  style="width: 100px"
                  @on-change="changeInput(item)"
                  @on-focus="changeInput(item)"
                />
                天
              </template>
            </Col>
          </div>
          <Col class="text">
            <Button type="primary" @click="addSearch">添加筛选</Button>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row class="terms">
      <Col>
        <Row class="row">
          <Col class="label">筛选条件:</Col>
          <Col v-for="(item, index) in search_list" :key="index">
            <Tag closable :name="index" @on-close="handleClose">
              {{ item.title }}:{{ item.value }}
            </Tag>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'VipSearch',
    data: function () {
      return {
        search: {
          data: [
            {
              name: '基本信息',
              id: 1,
              children: [
                {
                  id: 1,
                  label: '性别',
                  name: 'sex',
                  children: [
                    {
                      id: 1,
                      label: '女',
                      value: '女',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '男',
                      value: '男',
                      type: 'text',
                    },
                  ],
                },
                {
                  id: 2,
                  label: '来源渠道',
                  name: 'source',
                  children: [
                    {
                      id: 1,
                      label: '自然进店',
                      value: '自然进店',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '美团',
                      value: '美团',
                      type: 'text',
                    },
                  ],
                },
                {
                  id: 3,
                  label: '近期生日',
                  name: 'birthday',
                  children: [
                    {
                      id: 1,
                      label: '近3天',
                      value: '近3天',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '近7天',
                      value: '近7天',
                      type: 'text',
                    },
                    {
                      id: 3,
                      label: '近半天',
                      value: '近半天',
                      type: 'text',
                    },
                    {
                      id: 4,
                      label: '自定义',
                      value: [],
                      type: 'daterange',
                    },
                  ],
                },
                {
                  id: 4,
                  label: '所属门店',
                  name: 'store',
                  children: [
                    {
                      id: 1,
                      label: '分店1',
                      value: '分店1',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: '高级信息',
              id: 2,
              children: [
                {
                  id: 1,
                  label: '会员等级',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择会员等级',
                      value: '',
                      type: 'select',
                      param: ['multiple'],
                      list: [
                        {
                          id: 1,
                          label: '铂金',
                          value: '铂金',
                        },
                        {
                          id: 2,
                          label: '黄金',
                          value: '黄金',
                        },
                        {
                          id: 3,
                          label: '黑钻',
                          value: '黑钻',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 2,
                  label: '生命周期',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '新客户',
                      value: '新客户',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '活跃客户',
                      value: '活跃客户',
                      type: 'text',
                    },
                    {
                      id: 3,
                      label: '沉睡客户',
                      value: '沉睡客户',
                      type: 'text',
                    },
                    {
                      id: 4,
                      label: '流失客户',
                      value: '流失客户',
                      type: 'text',
                    },
                    {
                      id: 5,
                      label: '结束客户',
                      value: '结束客户',
                      type: 'text',
                    },
                  ],
                },
                {
                  id: 3,
                  label: '个性标签',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择',
                      value: '',
                      type: 'select',
                      param: ['multiple', 'filterable'],
                      list: [
                        {
                          id: 1,
                          label: '有钱人',
                          value: '有钱人',
                        },
                        {
                          id: 2,
                          label: '喜欢奢侈品',
                          value: '喜欢奢侈品',
                        },
                        {
                          id: 3,
                          label: 'A类客户',
                          value: 'A类客户',
                        },
                        {
                          id: 4,
                          label: '超A类客户',
                          value: '超A类客户',
                        },
                        {
                          id: 5,
                          label: '消费能力强',
                          value: '消费能力强',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 4,
                  label: '专属顾问',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择',
                      value: '',
                      type: 'select',
                      param: ['multiple'],
                      list: [
                        {
                          id: 1,
                          label: '顾问1',
                          value: '顾问1',
                        },
                        {
                          id: 2,
                          label: '顾问2',
                          value: '顾问2',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 5,
                  label: '建档日期',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '',
                      value: [],
                      type: 'daterange',
                    },
                  ],
                },
                {
                  id: 6,
                  label: '有转介绍的会员',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '有转介绍的会员',
                      value: '有转介绍的会员',
                      type: 'text',
                    },
                  ],
                },
                {
                  id: 7,
                  label: '首次到店时间',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '',
                      value: [],
                      type: 'daterange',
                    },
                  ],
                },
                {
                  id: 8,
                  label: '绑定公众号',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '已绑定',
                      value: '已绑定',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '未绑定',
                      value: '未绑定',
                      type: 'text',
                    },
                  ],
                },
                {
                  id: 9,
                  label: '绑定企业微信',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '已绑定',
                      value: '已绑定',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '未绑定',
                      value: '未绑定',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: '资产信息',
              id: 3,
              children: [
                {
                  id: 1,
                  label: '卡筛选',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '未持卡',
                      value: '未持卡',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '持卡',
                      value: '持卡',
                      type: 'text',
                    },
                    {
                      id: 3,
                      label: '卡状态',
                      value: '',
                      type: 'select',
                      param: [],
                      list: [
                        {
                          id: 1,
                          label: '使用中',
                          value: '使用中',
                        },
                        {
                          id: 2,
                          label: '未使用',
                          value: '未使用',
                        },
                        {
                          id: 3,
                          label: '已过期',
                          value: '已过期',
                        },
                        {
                          id: 4,
                          label: '已结束',
                          value: '已结束',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 2,
                  label: '剩余积分',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '积分',
                      value: {
                        min: '',
                        max: '',
                      },
                      type: 'between',
                    },
                  ],
                },
                {
                  id: 3,
                  label: '储值卡余额',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  id: 4,
                  label: '次卡余额',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      card: {
                        id: 1,
                        label: '请选择次卡',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '次卡1',
                            value: '次卡1',
                          },
                          {
                            id: 1,
                            label: '次卡2',
                            value: '次卡2',
                          },
                        ],
                      },
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  id: 5,
                  label: '欠款',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '欠款',
                      value: {
                        min: '',
                        max: '',
                      },
                      type: 'between',
                    },
                  ],
                },
                {
                  id: 6,
                  label: '次卡有效期',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '已到期',
                      value: '已到期',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '未到期',
                      value: '未到期',
                      type: 'text',
                    },
                    {
                      id: 3,
                      label: '半月内到期',
                      value: '半月内到期',
                      type: 'text',
                    },
                    {
                      id: 4,
                      label: '1个月内到期',
                      value: '1个月内到期',
                      type: 'text',
                    },
                    {
                      id: 5,
                      label: '2个月内到期',
                      value: '2个月内到期',
                      type: 'text',
                    },
                    {
                      id: 6,
                      label: '自定义',
                      value: '',
                      type: 'input',
                    },
                  ],
                },
              ],
            },
            {
              name: '消费能力',
              id: 4,
              children: [
                {
                  id: 1,
                  label: '多久未消费 ',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '超过1个月 ',
                      value: '超过1个月',
                      type: 'text',
                    },
                    {
                      id: 2,
                      label: '超过2个月',
                      value: '超过2个月',
                      type: 'text',
                    },
                    {
                      id: 3,
                      label: '超过半年',
                      value: '超过半年',
                      type: 'text',
                    },
                  ],
                },
                {
                  id: 2,
                  label: '单次充值',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
                {
                  id: 3,
                  label: '累计充值',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '充值金额',
                      value: {
                        min: '',
                        max: '',
                      },
                      type: 'between',
                      date: {
                        value: [],
                        type: 'select',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '近一周',
                            value: '近一周',
                          },
                          {
                            id: 2,
                            label: '近一个月',
                            value: '近一个月',
                          },
                          {
                            id: 3,
                            label: '近三个月',
                            value: '近三个月',
                          },
                          {
                            id: 4,
                            label: '近半年',
                            value: '近半年',
                          },
                          {
                            id: 5,
                            label: '近一年',
                            value: '近一年',
                          },
                          {
                            id: 0,
                            label: '自定义时间',
                            value: '自定义时间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
                {
                  id: 4,
                  label: '单次消费',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
                {
                  id: 5,
                  label: '累计消费',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
                {
                  id: 6,
                  label: '会员到店',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      date: {
                        value: [],
                        type: 'select',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '近一周',
                            value: '近一周',
                          },
                          {
                            id: 2,
                            label: '近一个月',
                            value: '近一个月',
                          },
                          {
                            id: 3,
                            label: '近三个月',
                            value: '近三个月',
                          },
                          {
                            id: 4,
                            label: '近半年',
                            value: '近半年',
                          },
                          {
                            id: 5,
                            label: '近一年',
                            value: '近一年',
                          },
                          {
                            id: 0,
                            label: '自定义时间',
                            value: '自定义时间',
                          },
                        ],
                      },
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
                {
                  id: 7,
                  label: '会员耗卡',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      date: {
                        value: [],
                        type: 'select',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '近一周',
                            value: '近一周',
                          },
                          {
                            id: 2,
                            label: '近一个月',
                            value: '近一个月',
                          },
                          {
                            id: 3,
                            label: '近三个月',
                            value: '近三个月',
                          },
                          {
                            id: 4,
                            label: '近半年',
                            value: '近半年',
                          },
                          {
                            id: 5,
                            label: '近一年',
                            value: '近一年',
                          },
                          {
                            id: 0,
                            label: '自定义时间',
                            value: '自定义时间',
                          },
                        ],
                      },
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
                {
                  id: 8,
                  label: '消费频率',
                  name: '',
                  children: [
                    {
                      id: 1,
                      label: '请选择条件',
                      value: [],
                      data: {
                        val: '',
                        max: '',
                        min: '',
                      },
                      param: [],
                      type: 'group',
                      date: {
                        value: [],
                        type: 'select',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '近一周',
                            value: '近一周',
                          },
                          {
                            id: 2,
                            label: '近一个月',
                            value: '近一个月',
                          },
                          {
                            id: 3,
                            label: '近三个月',
                            value: '近三个月',
                          },
                          {
                            id: 4,
                            label: '近半年',
                            value: '近半年',
                          },
                          {
                            id: 5,
                            label: '近一年',
                            value: '近一年',
                          },
                          {
                            id: 0,
                            label: '自定义时间',
                            value: '自定义时间',
                          },
                        ],
                      },
                      term: {
                        id: 1,
                        label: '请选择条件',
                        value: '',
                        param: [],
                        list: [
                          {
                            id: 1,
                            label: '大于',
                            value: '大于',
                          },
                          {
                            id: 2,
                            label: '小于',
                            value: '小于',
                          },
                          {
                            id: 3,
                            label: '等于',
                            value: '等于',
                          },
                          {
                            id: 4,
                            label: '区间',
                            value: '区间',
                          },
                        ],
                      },
                      dateRange: {
                        id: 1,
                        label: '',
                        value: [],
                        type: 'daterange',
                      },
                    },
                  ],
                },
              ],
            },
          ],
          select1: [],
          select2: [],
        },
        search_list: [],
        current: {
          one: [],
          tow: [],
          thirdly: [],
        },
      }
    },
    created() {},
    methods: {
      changeSelect: function (item) {
        this.changeType3(item)
      },
      changeDatePicker: function (item) {
        this.changeType3(item)
      },
      changeInput: function (item) {
        this.changeType3(item)
      },
      setBetWeen(item) {
        this.changeType3(item)
      },
      checkBetWeen(item) {
        let arr = []

        if (!item.date || !item.date.value || item.date.value.length < 1) {
          if (item.value.min === '') {
            this.$Message.warning('请输入最小值')
            return false
          }
          if (item.value.max === '') {
            this.$Message.warning('请输入最大值')
            return false
          }
        }
        if (item.value.max && item.value.min) {
          arr.push({
            max: item.value.max,
            min: item.value.min,
          })
        }

        if (item.date && item.date.value) {
          if (item.date.value === '自定义时间') {
            item.dateRange.value.forEach(function (val) {
              if (!val) {
                item.dateRange.value = []
              }
            })
            if (item.dateRange.value.length > 0) {
              arr.push({ date: item.dateRange.value })
            }
          } else {
            arr.push({
              date: [item.date.value],
            })
          }
        }

        item.value = arr

        return true
      },
      checkSelectInput(item) {
        item.value = []
        let arr = []
        if (item.card) {
          if (item.card.value === '') {
            this.$Message.warning('请选择次卡')
            return false
          }
          arr.push(item.card.value)
        }
        if (item.date) {
          if (item.date.value !== '自定义时间') {
            item.dateRange.value = [item.date.value]
          }
        } else {
          if (
            item.dateRange &&
            (!item.dateRange ||
              !item.dateRange.value ||
              item.dateRange.value.length < 1)
          ) {
            if (!item.term.value) {
              this.$Message.warning('请选择条件')
              return false
            }
          }
        }
        if (item.dateRange) {
          item.dateRange.value.forEach(function (val) {
            if (!val) {
              item.dateRange.value = []
            }
          })
        }
        if (item.term.value) {
          arr.push(item.term.value)
          if (item.term.value === '区间') {
            if (item.data.min === '') {
              this.$Message.warning('请输入最小值')
              return false
            }
            if (item.data.max === '') {
              this.$Message.warning('请输入最大值')
              return false
            }
            arr.push({
              min: item.data.min,
              max: item.data.max,
            })
          } else {
            if (item.data.val === '') {
              this.$Message.warning('请输入值')
              return false
            }
            arr.push(item.data.val)
          }
        }

        if (item.dateRange && item.dateRange.value.length > 0) {
          arr.push({ date: item.dateRange.value })
        }
        item.value = arr
        return true
      },
      changeType1: function (item) {
        this.search.select1 = item.children
        this.current.one = item
        this.current.tow = []
        this.current.thirdly = []
      },
      changeType2: function (item) {
        console.log(item)
        this.search.select2 = item.children
        this.current.tow = item
        this.current.thirdly = []
      },
      changeType3: function (item) {
        if (this.current.tow.length < 1) {
          return false
        }
        this.current.thirdly = item
      },
      addSearch: function () {
        if (this.current.tow.length < 1) {
          this.$Message.warning('请选择筛选条件')
          return false
        }
        if (this.current.thirdly.length < 1) {
          this.$Message.warning('请选择具体筛选条件')
          return false
        }

        if (this.current.thirdly.type === 'between') {
          if (!this.checkBetWeen(this.current.thirdly)) {
            return false
          }
        }
        if (this.current.thirdly.type === 'group') {
          if (!this.checkSelectInput(this.current.thirdly)) {
            return false
          }
        }
        let id = this.current.one.id + '_' + this.current.tow.id

        for (let i = 0; i < this.search_list.length; i++) {
          if (this.search_list[i].id === id) {
            this.search_list.splice(i, 1)
          }
        }
        if (!this.current.thirdly.value) {
          return false
        }
        if (
          this.current.thirdly.value instanceof Array &&
          this.current.thirdly.value.length === 0
        ) {
          return false
        }
        this.search_list.push({
          id: id,
          title: this.current.tow.label,
          name: this.current.tow.name,
          value: this.current.thirdly.value,
        })
        console.log('search_list', this.search_list)
      },
      handleClose(event, index) {
        this.search_list.splice(index, 1)
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipSearch {
    .isActive {
      color: #ff7db6;
      border: 1px solid #f19ec2;
    }

    .terms {
      border-top: 1px dashed #ccc;
      margin-top: 10px;
    }

    .row {
      padding: 4px 4px 1px 4px;
      display: flex;
      align-items: center;
      flex-flow: wrap;
    }

    .bt {
      width: 80px;
      text-align: center;
      padding: 2px;
      border: 1px solid #ccc;
      margin-right: 10px;
      border-radius: 5px;
      cursor: pointer;
    }

    .bt:hover {
      border: 1px solid #f19ec2;
      color: #f19ec2;
    }

    .flex {
      display: flex;
      align-items: center;
    }

    .text {
      display: block;
      cursor: pointer;
      padding: 4px 10px;
      margin-right: 10px;
    }

    .text:hover {
      text-align: center;
      cursor: pointer;
      color: #f19ec2;
    }

    .label {
      font-weight: bold;
      padding: 4px 10px;
    }
  }
</style>
