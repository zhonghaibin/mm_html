<template>
  <content>
    <Select
      v-model="valueData"
      clearable
      filterable
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
        default: '',
      },
      width: {
        type: Number,
        default: 200,
      },
    },
    data: function () {
      return {
        list: [
          {
            label: '10天内',
            value: '10',
          },
          {
            label: '15天内',
            value: '15',
          },
          {
            label: '20天内',
            value: '20',
          },
          {
            label: '25天内',
            value: '25',
          },
          {
            label: '30天内',
            value: '30',
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
