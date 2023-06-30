<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
        <li class="arrow" @click="pickPre(currentYear, currentMonth)">&lt;</li>
        <li class="year-month">
          <span class="choose-year">{{ currentYear }}年</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear, currentMonth)">&gt;</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>天</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li v-for="(day, i) in days" :key="i">
        <div class="calendar-item" @click="getDayTime(day.day)">
          <span :class="current(day.day)">
            {{ day.day.getDate() }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'Calendar',
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 2021,
        currentWeek: 1,
        days: [],
        currentTime: '',
      }
    },
    computed: {
      current() {
        return (item) => {
          let date = new Date()
          if (item.getMonth() + 1 !== this.currentMonth) {
            return 'other-month'
          } else if (
            item.getFullYear() === date.getFullYear() &&
            item.getMonth() === date.getMonth() &&
            item.getDate() === date.getDate() &&
            item === this.currentTime
          ) {
            return 'active current'
          } else if (
            item.getFullYear() === date.getFullYear() &&
            item.getMonth() === date.getMonth() &&
            item.getDate() === date.getDate()
          ) {
            return 'active'
          } else if (this.currentTime === item) {
            return 'current'
          } else {
            return ''
          }
        }
      },
    },
    created: function () {
      // 在vue初始化时调用
      this.initData(null)
    },
    methods: {
      initData: function (cur) {
        let date
        if (cur) {
          date = new Date(cur)
        } else {
          let now = new Date()
          let d = new Date(
            this.formatDate(now.getFullYear(), now.getMonth(), 1)
          )
          d.setDate(35)
          date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        }
        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1
        this.currentWeek = date.getDay() // 1...6,0
        if (this.currentWeek === 0) {
          this.currentWeek = 7
        }
        let str = this.formatDate(
          this.currentYear,
          this.currentMonth,
          this.currentDay
        )
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        // 初始化本周
        for (let i = this.currentWeek; i >= 0; i--) {
          let d2 = new Date(str)
          d2.setDate(d2.getDate() - i)
          let dayobjectSelf = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobjectSelf.day = d2
          this.days.push(dayobjectSelf) // 将日期放入data 中的days数组 供页面渲染使用
        }
        // 其他周
        for (let j = 1; j <= 35 - this.currentWeek; j++) {
          let d3 = new Date(str)
          d3.setDate(d3.getDate() + j)
          let dayobjectOther = {}
          dayobjectOther.day = d3
          this.days.push(dayobjectOther)
        }
      },
      getDayTime(el) {
        if (el.getMonth() + 1 === this.currentMonth) {
          this.$emit('dayTime', el)
        }

        this.currentTime = el
      },
      pickPre: function (year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        let d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      pickNext: function (year, month) {
        let d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function (year, month, day) {
        let y = year
        let m = month
        if (m < 10) m = '0' + m
        let d = day
        if (d < 10) d = '0' + d
        return y + '-' + m + '-' + d
      },
    },
  }
</script>
<style lang="less" scoped>
  #calendar {
    font-size: 12px;
    width: 100%;
    margin: 0 auto;
    background: white;
  }

  .month {
    width: 100%;
    color: #333333;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    height: 35px;
  }

  .year-month {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
  }

  .choose-month {
    text-align: center;
    font-size: 12px;
  }

  .arrow {
    padding: 15px;
    color: #999999;
  }

  .month ul li {
    list-style: none;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    cursor: pointer;
  }

  .weekdays {
    margin: 0;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    color: #3a3a3a;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 10px;

    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .days li {
    list-style-type: none;
    width: 14.2%;
    justify-content: center;
    display: flex;
    text-align: center;
    padding-bottom: 4px;
    font-size: 12px;
    color: #000;
    cursor: pointer;

    .calendar-item {
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  }

  .days li .active {
    color: #ff0071;
    display: block;
    text-align: center;
  }

  .days li .current {
    color: #fff;
    display: block;
    text-align: center;
    background: #00b8ec;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }
</style>
