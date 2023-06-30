<template>
  <div class="VipCardList">
    <vxe-table
      ref="xTable"
      :cell-style="{ textAlign: 'center' }"
      :column-config="{ resizable: true }"
      :data="tableData"
      header-align="center"
      :height="tableHeight"
      :loading="loading"
      :row-config="{ isHover: true }"
      size="small"
    >
      <vxe-column
        v-for="(item, index) in tableColumns"
        :key="index + item.key"
        :field="item.key"
        :fixed="item.fixed"
        :min-width="item.width"
        show-overflow="title"
        :title="item.title"
      />
      <vxe-column title="操作" width="120">
        <template>
          <span class="bt">立即消费</span>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
  export default {
    name: 'VipCardList',
    props: {
      cardVid: {
        type: Number,
        default: () => 0,
      },
    },
    data: function () {
      return {
        loading: false,
        tableHeight: 500,
        tableData: [],
        tableColumns: [
          {
            title: '项目名称',
            key: 'name',
          },
          {
            title: '类别',
            key: 'type_name',
          },
          {
            title: '余次',
            key: 'use_num',
          },
          {
            title: '单次耗卡金额',
            key: 'card_hkprice',
          },
        ],
        searchData: {},
      }
    },
    activated() {
      this.search()
    },
    created() {
      this.search()
    },
    methods: {
      search() {
        this.$set(this.searchData, 'card_vid', this.cardVid)
        this.getVipCardDetails()
      },
      async getVipCardDetails() {
        this.loading = true
        const { data } = { data: { list: [{ name: 11 }] } }
        this.loading = false
        this.tableData = data.list
      },
    },
  }
</script>

<style lang="less" scoped>
  .bt {
    color: #1298e6;
    margin-right: 20px;
    cursor: pointer;
  }
</style>
