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
      width: {
        type: Number,
        default: 100,
      },
    },
    data: function () {
      return {
        loading: false,
        list: [
          {
            id: 1,
            name: '今天',
          },
          {
            id: 2,
            name: '昨天',
          },
          {
            id: 3,
            name: '上周',
          },
          {
            id: 4,
            name: '上月',
          },
          {
            id: 5,
            name: '本月',
          },
        ],
        valueData: '',
        searchData: {},
      }
    },
    watch: {},
    created() {
      this.valueData = this.value
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
    },
  }
</script>

<style scoped></style>
