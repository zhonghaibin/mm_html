<template>
  <content>
    <Select
      v-model="valueData"
      clearable
      filterable
      :loading="loading"
      :style="{ width: width + 'px' }"
      transfer
      @on-clear="clearValue"
      @on-select="selectValue"
    >
      <div slot="empty">未找到数据</div>
      <Option v-for="(item, index) in list" :key="index" :value="item.id">
        {{ item.name }}
      </Option>
    </Select>
  </content>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number, Array],
        default: '',
      },
      shopId: {
        type: [String, Number, Array],
        default: '',
      },
      search: {
        type: Object,
        default: () => {
          return {
            sid: '',
            p: 1,
            page: 1000,
            search: '',
          }
        },
      },
      width: {
        type: Number,
        default: 200,
      },
    },
    data: function () {
      return {
        loading: false,
        list: [],
        valueData: '',
        searchData: {},
      }
    },
    watch: {
      shopId(value) {
        if (!value) {
          this.valueData = ''
          this.list = []
          this.$emit('input', '')
        }
        this.getList()
      },
    },
    created() {
      this.valueData = this.value
      this.getList()
    },
    methods: {
      selectValue(item) {
        this.$emit('input', item.value)
        this.$emit('on-select', item.value)
      },
      clearValue() {
        this.$emit('input', '')
        this.$emit('on-select', '')
      },
      async getList() {
        if (!this.shopId) {
          return
        }
        this.searchData = this.search
        this.searchData.sid = this.shopId
        this.loading = true
        const { data } = { data: { list: [{ name: 11 }] } }
        this.loading = false
        this.list = data.list
      },
    },
  }
</script>

<style scoped></style>
