<template>
  <content>
    <Select
      v-model="valueData"
      clearable
      filterable
      size="small"
      :style="{ width: width + 'px' }"
      transfer
      @on-clear="clearValue"
      @on-select="selectValue"
    >
      <div slot="empty">未找到数据</div>
      <Option v-for="item in list" :key="item.value" :value="item.value">
        {{ item.label }}
      </Option>
    </Select>
  </content>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number, Array],
        default: '1',
      },
      width: {
        type: Number,
        default: 60,
      },
    },
    data: function () {
      return {
        list: [
          {
            label: '月',
            value: '1',
          },
          {
            label: '日',
            value: '2',
          },
          {
            label: '年',
            value: '3',
          },
        ],
        valueData: '',
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
