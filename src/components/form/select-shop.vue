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
      search: {
        type: Object,
        default: () => {
          return {
            p: 1,
            page: 1000,
            search: '',
          }
        },
      },
      width: {
        type: Number,
        default: 100,
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
    watch: {},
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
        this.loading = true

        this.loading = false
        this.list = []
      },
    },
  }
</script>

<style scoped></style>
