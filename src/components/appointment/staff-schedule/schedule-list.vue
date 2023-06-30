<template>
  <div class="ScheduleList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            enter-button
            placeholder="搜索员工"
            search
            style="width: 250px"
          />
        </div>

        <div class="box">
          <span class="text"></span>
          <SelectPosition
            v-model="searchData.position_id"
            @on-select="search"
          />
        </div>
        <div class="box">
          <DatePicker
            v-model="searchData.month"
            format="yyyy-MM"
            placeholder="选择日期"
            style="width: 200px"
            transfer
            type="month"
            value-format="yyyy-MM"
            @on-change="changeMonth"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="save">保存</div>
      </div>
    </div>

    <div ref="content" class="content">
      <table class="table">
        <tbody>
          <tr class="title">
            <th>员工姓名</th>
            <th v-for="(item, index) in dateList" :key="index">
              {{ item.days }}
              <div>周 {{ item.week }}</div>
            </th>
          </tr>
          <tr
            v-for="(staff, key1) in staffList"
            :key="key1"
            class="staff-arrange"
          >
            <td
              style="
                color: black;
                border-bottom: 1px solid #eeeeee;
                border-left: 1px solid #eeeeee;
              "
            >
              {{ staff.name }}
            </td>
            <td
              v-for="(val, key2) in staff.list"
              :key="key2"
              :ref="`${key1}_${key2}`"
              :end="val.end"
              :start="val.start"
              :style="{ background: val.color }"
              :work_day="val.work_day"
              @click="arrange($event, key1, key2)"
              @mousemove="setData(key1, key2)"
            >
              {{ val.name }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="timeSet.show"
        ref="timeSet"
        class="timeSet"
        :style="{ top: `${top}px`, left: `${left}px` }"
      >
        <p
          v-for="(item, index) in arrangeList"
          :key="index"
          class="word-time"
          :end="item.end"
          :start="item.start"
          :style="{ background: item.color }"
          @click="choose(item)"
        >
          {{ item.name }}
        </p>
        <p style="" @click="timeSet.show = false">
          <button
            style="background: none; cursor: pointer; border: none; color: red"
          >
            关闭
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectShop from '@/components/form/select-shop'
  import SelectPosition from '@/components/form/select-position'
  export default {
    name: 'ScheduleList',
    components: { SelectPosition, SelectShop },

    data: function () {
      return {
        searchData: {
          sid: '',
          position_id: '',
          search: '',
          start: '',
          end: '',
          month: '',
        },
        dateList: [],
        dateCount: 0,
        arrangeList: [
          {
            end: '0',
            start: '0',
            color: '#d90303',
            name: '放假',
          },
          {
            end: '0',
            start: '0',
            color: '#e720c6',
            name: '休息',
          },
        ],
        staffList: [
          {
            name: '张三',
            list: [],
          },
          {
            name: '李四',
            list: [],
          },
        ],
        timeSet: {
          show: false,
        },
        top: 0,
        left: 0,
        current: [],
        currentArrange: {},
        batch: false,
        y: '',
        m: '',
      }
    },
    activated() {
      this.batch = false
    },
    destroyed() {
      this.batch = false
    },
    created() {
      let date = new Date()
      this.y = date.getFullYear()
      this.m = date.getMonth()
      this.searchData.month = this.y + '-' + this.m
      this.getMonthDate()
    },
    mounted() {
      this.setHeight()
      document.onkeydown = () => {
        if (event.keyCode === 17) {
          this.batch = true
        }
      }
      document.onkeyup = () => {
        if (event.keyCode === 17) {
          this.batch = false
        }
      }
    },
    methods: {
      getMonthDate() {
        this.getMonthList(this.y, this.m)
        let dateCount = this.dateList.length
        this.staffList.forEach((item) => {
          if (item.list.length === 0) {
            for (let i = 1; i <= dateCount; i++) {
              item.list.push({
                work_day: i,
                start: '',
                end: '',
                color: '#dcf8a8',
                name: '',
              })
            }
          }
        })
      },

      changeMonth(yearMonth) {
        let date = yearMonth.split('-')
        console.log(date[0], date[1])

        this.staffList.forEach((item) => {
          item.list = []
        })

        this.y = Number(date[0])
        this.m = Number(date[1]) - 1
        this.getMonthDate()
      },
      choose(item) {
        this.timeSet.show = false
        this.staffList[this.current[0]].list[this.current[1]] = item
        this.currentArrange = item
      },
      setData(key1, key2) {
        if (!this.batch) {
          return false
        }
        let data = this.staffList[key1].list[key2]
        if (data.name === '' || data.name === null) {
          this.staffList[key1].list[key2] = this.currentArrange
        }
        this.$forceUpdate()
      },
      arrange(e, key1, key2) {
        this.current = [key1, key2]
        this.timeSet.show = true
        this.top = this.$refs[`${key1}_${key2}`][0].offsetTop + 40
        this.left = this.$refs[`${key1}_${key2}`][0].offsetLeft
      },
      save() {},
      // 获取月份数据
      mGetDate(y, m) {
        let date = new Date(y, m)
        let year = date.getFullYear()
        let month = date.getMonth()
        let d = new Date(year, month, 0)
        return d.getDate()
      },
      // 获取星期
      getWeek(date, dateString) {
        let dateArray = dateString.split('-')
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
        // return "周" + "日一二三四五六".charAt(date.getDay());
        return '日一二三四五六'.charAt(date.getDay())
      },
      // 获取月份内的数据
      getMonthList(y, m) {
        let date = new Date()
        let MonthDayNum = 0
        let m_zf = Number(m + 1) < 10 ? '0' + Number(m + 1) : '' + Number(m + 1)
        MonthDayNum = this.mGetDate(y, m_zf)
        let menu = []
        for (let i = 1; i <= MonthDayNum; i++) {
          let i_zf = i < 10 ? '0' + i : '' + i
          let info = {
            year: y,
            month: m_zf,
            days: i_zf,
            week: this.getWeek(date, y + '-' + m_zf + '-' + i_zf),
          }
          menu.push(info)
        }
        this.dateList = menu
      },
      setHeight() {
        let divHeight = window.innerHeight - 226
        this.$refs.content.style.minHeight = divHeight + 'px'
      },
      search() {},
    },
  }
</script>

<style lang="less" scoped>
  .ScheduleList {
    position: relative;

    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          margin-right: 20px;

          .text {
            font-weight: bold;
            margin: 0 5px;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        .bt {
          border: 1px solid #c1c1c1;
          color: #000;
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          white-space: nowrap;
          line-height: 1.5;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 5px 15px 6px;
          font-size: 12px;
          border-radius: 4px;
          transition: color 0.2s linear, background-color 0.2s linear,
            border 0.2s linear, box-shadow 0.2s linear;
        }
      }
    }

    .content {
      margin-top: 10px;
      background: white;
      min-height: 600px;

      .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        text-align: center;

        td {
          border: 1px solid #ffffff;
          cursor: pointer;
        }

        th {
          border: none;
          font-weight: 500;
          padding: 10px 0;
        }

        tr {
          border: none;
        }
      }

      .title {
        background: #fdf1f6;
        border: 0;
      }

      .timeSet {
        border: 1px solid #ccc;
        position: absolute;
        text-align: center;
        background: white;
      }

      .word-time {
        padding: 3px 20px;
        cursor: pointer;
      }

      .staff-arrange {
        height: 40px;
        color: white;
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .add-bt {
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
