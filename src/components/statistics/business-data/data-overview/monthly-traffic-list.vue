<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <div class="h-cel title">月客流量到店情况分析</div>
        <div class="h-cel title">
          <RadioGroup v-model="type" size="small" type="button">
            <Radio
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
            />
          </RadioGroup>
        </div>
      </div>
      <div class="right">
        <Poptip placement="left-start" transfer trigger="hover">
          <div class="explain">?字段说明</div>
          <div slot="content">
            <div class="fields-remark">
              <p class="text">
                <span style="font-weight: bold">预约人数:</span>
                在统计时间内,门店已确认到店的预约人数。
              </p>
              <p class="text">
                <span style="font-weight: bold">到店消费人次:</span>
                在统计时间内,门店到店消费的人次,如果一个会员一天多次到店消费去重按1统计。
              </p>
            </div>
          </div>
        </Poptip>
        <div class="add-bt">导出</div>
      </div>
    </div>
    <div ref="content" class="content">
      <table class="table">
        <tbody>
          <tr class="title">
            <th>门店</th>
            <th v-for="(item, index) in dateList" :key="index">
              {{ item.days }}
              <div>周 {{ item.week }}</div>
            </th>
          </tr>
          <tr
            v-for="(shop, key1) in shopList"
            :key="key1"
            class="staff-arrange"
          >
            <td>
              {{ shop.name }}
            </td>
            <td v-for="(val, key2) in shop.list" :key="key2">
              {{ val.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MonthlyTrafficList',
    components: {},
    data: function () {
      return {
        list: [],
        dateList: [],
        dateCount: 0,
        type: '1',
        typeList: [
          {
            label: '预约人数',
            value: '1',
          },
          {
            label: '到店消费人次',
            value: '2',
          },
        ],
        shopList: [
          {
            name: '分店1',
            list: [],
          },
          {
            name: '总店',
            list: [],
          },
        ],
        y: '',
        m: '',
        searchData: { search: '', start: '', end: '', month: '' },
      }
    },
    created() {
      let date = new Date()
      this.y = date.getFullYear()
      this.m = date.getMonth()
      this.searchData.month = this.y + '-' + this.m
      this.getMonthDate()
    },
    methods: {
      getMonthDate() {
        this.getMonthList(this.y, this.m)
        let dateCount = this.dateList.length
        this.shopList.forEach((item) => {
          if (item.list.length === 0) {
            for (let i = 1; i <= dateCount; i++) {
              item.list.push({
                work_day: i,
                value: '',
              })
            }
          }
        })
      },

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
        let divHeight = window.innerHeight - 296
        this.$refs.content.style.minHeight = divHeight + 'px'
      },
    },
  }
</script>
<style lang="less" scoped>
  .box {
    width: 100%;
    border-radius: 6px;

    .header {
      display: flex;
      height: 40px;
      padding: 0 10px;
      background: white;

      .left {
        display: flex;
        align-items: center;
        flex: 1;

        .title {
          font-weight: bold;
        }

        .h-cel {
          padding: 0 4px;
          float: left;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .bt {
          padding: 5px;
          color: #1298e6;
          cursor: pointer;
        }
      }
    }

    .content {
      padding-bottom: 10px;

      .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        text-align: center;
        background: white;

        tr {
          color: black;

          th {
            background: #ffe1ef;
            padding: 6px 2px;
          }

          td {
            border-bottom: 1px solid #eeeeee;
            border-left: 1px solid #eeeeee;
            padding: 4px 2px;
          }

          .text {
            color: #1298e6;
            cursor: pointer;
          }
        }
      }
    }

    .explain {
      border: 1px solid #e1e1e1;
      padding: 0 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      height: 32px;
      line-height: 32px;
    }

    .add-bt {
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 0 14px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
</style>
