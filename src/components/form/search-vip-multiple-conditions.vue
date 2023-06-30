<template>
  <div class="SearchVipMultipleConditions">
    <div :class="['search', type === 1 ? 'search-type' : '']">
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">消费金额:</div>
        <div class="all" @click="clearValue(['money_start', 'money_end'])">
          全部
        </div>
        <div>
          <Input
            v-model="formData.money_start"
            placeholder="输入金额"
            size="small"
            style="width: 100px"
          />
        </div>
        <div style="text-align: center">-</div>
        <div>
          <Input
            v-model="formData.money_end"
            clearable
            enter-button="确定"
            placeholder="输入金额"
            search
            size="small"
            style="width: 150px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">未到店:</div>
        <div class="all" @click="clearValue(['day'])">全部</div>
        <div
          v-for="item in beforeShopList"
          :key="item.value"
          :class="['text', formData.day === item.value ? 'active' : '']"
          @click="beforeShop(item)"
        >
          {{ item.label }}
        </div>
        <div class="search-bt">
          <Input
            v-model="formData.day"
            clearable
            enter-button="确定"
            placeholder="自定义天"
            search
            size="small"
            style="width: 120px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">到店频次:</div>
        <div class="all" @click="clearValue(['frequency'])">全部</div>
        <div
          v-for="item in shopFrequencyList"
          :key="item.value"
          :class="['text', formData.frequency === item.value ? 'active' : '']"
          @click="shopFrequency(item)"
        >
          {{ item.label }}
        </div>
        <div>
          <Input
            v-model="formData.frequency"
            clearable
            enter-button="确定"
            placeholder="自定义天"
            search
            size="small"
            style="width: 120px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">宝宝生日:</div>
        <div class="all" @click="clearValue(['bb_birth'])">全部</div>
        <div
          v-for="item in babyBirthdayList"
          :key="item.value"
          :class="['text', formData.bb_birth === item.value ? 'active' : '']"
          @click="babyBirthday(item)"
        >
          {{ item.label }}
        </div>
        <div>
          <Input
            v-model="formData.bb_birth"
            clearable
            enter-button="确定"
            placeholder="自定义天"
            search
            size="small"
            style="width: 120px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">近期生日:</div>
        <div class="all" @click="clearValue(['birth'])">全部</div>
        <div
          v-for="item in recentBirthdayList"
          :key="item.value"
          :class="['text', formData.birth === item.value ? 'active' : '']"
          @click="recentBirthday(item)"
        >
          {{ item.label }}
        </div>
        <div>
          <Input
            v-model="formData.birth"
            clearable
            enter-button="确定"
            placeholder="自定义天"
            search
            size="small"
            style="width: 120px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">经期时间:</div>
        <div class="all" @click="clearValue(['period'])">全部</div>
        <div
          v-for="item in periodList"
          :key="item.value"
          :class="['text', formData.period === item.value ? 'active' : '']"
          @click="period(item)"
        >
          {{ item.label }}
        </div>
        <div>
          <Input
            v-model="formData.period"
            clearable
            enter-button="确定"
            placeholder="自定义天"
            search
            size="small"
            style="width: 120px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">会员等级:</div>
        <div class="all" @click="clearValue(['tid'])">全部</div>
        <div
          v-for="item in gradeList"
          :key="item.id"
          :class="['text', formData.tid === item.id ? 'active' : '']"
          @click="memberGrade(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">来源渠道:</div>
        <div class="all" @click="clearValue(['source_id'])">全部</div>
        <div
          v-for="item in sourceList"
          :key="item.id"
          :class="['text', formData.source_id === item.id ? 'active' : '']"
          @click="memberSource(item)"
        >
          {{ item.name }}
        </div>
        <div
          :class="['text', formData.source_id === -1 ? 'active' : '']"
          @click="
            memberSource({
              id: -1,
              name: '未设置',
            })
          "
        >
          未设置
        </div>
      </div>
      <div :class="['row', type === 1 ? 'row-width' : '']">
        <div class="label">所属门店:</div>
        <div class="all" @click="clearValue(['sid'])">全部</div>
        <div
          v-for="item in shopList"
          :key="item.id"
          :class="['text', formData.sid === item.id ? 'active' : '']"
          @click="shop(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchVipMultipleConditions',
    props: {
      type: {
        type: Number,
        default: 1,
      },
    },
    data: function () {
      return {
        formData: {
          money_start: '',
          money_end: '',
          start: '',
          end: '',
          tid: '',
          source_id: '',
          search: '',
          birth: '',
          bb_birth: '',
          period: '',
          day: '',
          frequency: '',
          sid: '',
        },
        beforeShopList: [
          {
            label: '超过一个月未到店',
            value: '30',
          },
          {
            label: '超过两个月未到店',
            value: '60',
          },
          {
            label: '超过三个月未到店',
            value: '90',
          },
          {
            label: '超过半年未到店',
            value: '180',
          },
        ],
        shopFrequencyList: [
          {
            label: '1次以内/月',
            value: '1',
          },
          {
            label: '2次以内/月',
            value: '2',
          },
          {
            label: '3次以内/月',
            value: '3',
          },
        ],
        babyBirthdayList: [
          {
            label: '近三天过生日',
            value: '3',
          },
          {
            label: '近一周过生日',
            value: '7',
          },
          {
            label: '近三周过生日',
            value: '21',
          },
        ],
        recentBirthdayList: [
          {
            label: '近三天过生日',
            value: '3',
          },
          {
            label: '近一周过生日',
            value: '7',
          },
          {
            label: '近三周过生日',
            value: '21',
          },
        ],
        periodList: [
          {
            label: '近三天过',
            value: '3',
          },
          {
            label: '近一周过',
            value: '7',
          },
        ],
        gradeList: [],
        sourceList: [],
        shopList: [],
      }
    },
    created() {
      this.getGradeList()
      this.getSourceList()
      this.getShopList()
    },
    methods: {
      search() {
        this.$emit('search', this.formData)
      },
      beforeShop(item) {
        this.formData.day = item.value
        this.search()
      },
      shopFrequency(item) {
        this.formData.frequency = item.value
        this.search()
      },
      babyBirthday(item) {
        this.formData.bb_birth = item.value
        this.search()
      },
      recentBirthday(item) {
        this.formData.birth = item.value
        this.search()
      },
      memberGrade(item) {
        this.formData.tid = item.id
        this.search()
      },
      memberSource(item) {
        this.formData.source_id = item.id
        this.search()
      },
      shop(item) {
        this.formData.sid = item.id
        this.search()
      },
      period(item) {
        this.formData.period = item.value
        this.search()
      },
      clearValue(params) {
        params.forEach((param) => {
          this.formData[param] = ''
        })
        this.search()
      },
      async getGradeList() {
        const { data } = { data: { list: [{ name: '普通会员', id: '1' }] } }

        this.gradeList = data.list
      },
      async getSourceList() {
        const { data } = { data: { list: [{ name: '微信', id: '1' }] } }
        this.sourceList = data.list
      },
      async getShopList() {
        this.loading = true
        const { data } = { data: { list: [{ name: '总店', id: '1' }] } }
        this.shopList = data.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .SearchVipMultipleConditions {
    .search-type {
      flex-flow: wrap;
      display: -webkit-flex;
    }
    .row-width {
      width: 50%;
    }

    .search {
      padding: 4px 0;
      background: white;

      .row {
        align-items: center;
        display: flex;
        flex-flow: wrap;
        padding: 0 4px;
      }

      .all {
        background: #ffecef;
        color: #f19ec2;
        text-align: center;
        height: 20px;
        line-height: 20px;
        width: 50px;
        padding: 1px 2px;
        margin: 4px;
        cursor: pointer;
      }

      .text {
        text-align: center;
        cursor: pointer;
        padding: 2px 10px;
      }

      .active {
        color: #f19ec2;
      }

      .text:hover {
        text-align: center;
        cursor: pointer;
        color: #f19ec2;
      }

      .search-bt {
        margin: 6px;
      }

      .label {
        font-weight: bold;
        padding: 4px 6px;
        min-width: 80px;
      }
    }
  }
</style>
