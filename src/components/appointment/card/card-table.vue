<template>
  <div class="CardTable">
    <div class="left-box">
      <div class="search">
        <div class="left">
          <div class="box">
            <span class="text">门店</span>
            <SelectShop v-model="searchData.sid" @on-select="search" />
          </div>
        </div>
        <div class="right">
          <div class="add-bt" @click="showModal('时间设置', 'CardTime')">
            时间设置
          </div>
          <div class="add-bt" @click="showModal('新增预约', 'Appointment')">
            新增预约
          </div>
        </div>
      </div>
      <div ref="content" class="content">
        <div ref="box1" class="box1">
          <div class="column1" :style="{ left: column1.left + 'px' }">
            <table class="new_tb2">
              <thead>
                <tr class="title1">
                  <th colspan="4">
                    <div
                      style="
                        position: fixed;
                        left: 0;
                        top: 62px;
                        z-index: 30;
                        width: 50px;
                        background: #fdf1f6;
                      "
                    >
                      <Icon :size="28" type="md-time" />
                    </div>
                  </th>
                </tr>
                <tr
                  v-for="(item, index) in timeList"
                  :key="index"
                  class="border3"
                >
                  <td
                    colspan="4"
                    :style="{
                      borderBottom: '1px solid #efefef',
                    }"
                  >
                    {{ item }}
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <ul class="box2">
            <li>
              <table class="new_tb2"></table>
            </li>
            <li
              v-for="(item, index) in personList"
              :key="index"
              style="width: 160px"
            >
              <div
                :style="{
                  top: column1.top + 'px',
                  position: 'relative',
                  marginBottom: '45px',
                  zIndex: 10,
                }"
              >
                <table class="new_tb">
                  <thead class="table-head">
                    <tr class="title1">
                      <th colspan="4">{{ item.name }}</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <table
                v-for="(val, key) in item.courseList"
                :key="key"
                class="new_tbx"
              >
                <thead>
                  <tr class="border3">
                    <td
                      class="cursor-s"
                      :style="{
                        height: height1(val) + 'px',
                        background: val.color,
                      }"
                      @mouseleave="mouseLeave"
                      @mouseup="mouseUp($event)"
                    >
                      <div
                        class="tr-info"
                        :style="{
                          borderTop: `14px solid ${val.color}`,
                          mixBlendMode: 'multiply',
                        }"
                      >
                        <div class="card-info">
                          {{ val.info.name }}
                          {{ val.info.tel }}
                          <br />
                          {{ val.info.card_name }}
                          <br />
                          {{ val.info.number }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
            </li>
          </ul>
        </div>
      </div>
      <div class="foot">
        <div class="foot-box" style="border-bottom: 6px solid #f75454">
          待接受(0人)
        </div>
        <div class="foot-box" style="border-bottom: 6px solid #ac54f7">
          待到店(0人)
        </div>
        <div class="foot-box" style="border-bottom: 6px solid #54a5f7">
          已到店(0人)
        </div>
        <div class="foot-box" style="border-bottom: 6px solid #71d28e">
          已完成(0人)
        </div>
        <div class="foot-box" style="border-bottom: 6px solid #f7e683">
          临时占位(0人)
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="box" style="margin-bottom: 10px">
        <Calendar @dayTime="dayTime" />
      </div>
      <div class="box">
        <div class="title">当前日期预约提醒</div>
        <div class="list">
          <table class="table">
            <thead>
              <tr>
                <th>客户</th>
                <th>项目</th>
                <th>
                  服务人员/
                  <br />
                  上次服务时间
                </th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  张三
                  <br />
                  13852451542
                </td>
                <td>骨盆修复</td>
                <td>
                  王五
                  <br />
                  2021/01/01
                </td>
                <td><span class="text">预约</span></td>
              </tr>
              <tr>
                <td>
                  张三
                  <br />
                  13852451542
                </td>
                <td>骨盆修复</td>
                <td>
                  王五
                  <br />
                  2021/01/01
                </td>
                <td><span class="text">预约</span></td>
              </tr>
            </tbody>
          </table>
          <div class="page">
            <Page
              :current="searchData.p"
              :page-size="searchData.page"
              size="small"
              :total="searchData.count"
              transfer
              @on-change="currentPage"
              @on-page-size-change="pageSizeChange"
            />
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :title="modal.title"
      :width="modal.width"
    >
      <CardTime v-if="modalShow('CardTime')" />
      <Appointment v-if="modalShow('Appointment')" />
      <CardInfo v-if="modalShow('CardInfo')" />
    </Modal>
  </div>
</template>

<script>
  import CardTime from '@/components/appointment/card/card-time'
  import Appointment from '@/components/appointment/card/appointment'
  import Calendar from '@/components/calendar'
  import CardInfo from '@/components/appointment/card/card-info'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'CardTable',
    components: { SelectShop, CardTime, Appointment, Calendar, CardInfo },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
        },
        list: [],
        searchData: { sid: '', search: '', month: '' },
        column1: {
          left: 0,
          top: 0,
        },
        timeList: [
          '0:00',
          '1:00',
          '2:00',
          '3:00',
          '4:00',
          '5:00',
          '6:00',
          '7:00',
          '8:00',
          '9:00',
          '10:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '23:00',
          '24:00',
        ],
        courseList: [
          {
            name: '王五',
            courseList: [
              {
                start: '8:00',
                end: '8:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
              {
                start: '19:00',
                end: '23:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '8:00',
                end: '8:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
              {
                start: '19:00',
                end: '21:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '0:00',
                end: '23:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '8:00',
                end: '8:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
              {
                start: '19:00',
                end: '23:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '8:00',
                end: '8:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
              {
                start: '19:00',
                end: '21:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '0:00',
                end: '23:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '8:00',
                end: '8:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
              {
                start: '19:00',
                end: '23:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [
              {
                start: '8:00',
                end: '8:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
              {
                start: '19:00',
                end: '21:00',
                info: {
                  name: '张三',
                  tel: '15820755241',
                  card_name: '骨盆修复/盆底肌修复',
                  number: '第1次/第2次',
                },
              },
            ],
          },
          {
            name: '王五',
            courseList: [],
          },
        ],
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },

      box1() {
        return this.$refs.box1
      },
      height1() {
        return (item) => {
          let height = 100
          let start = this.timeList.indexOf(item.start)
          let end = this.timeList.indexOf(item.end) + 1
          if (end - start > 1) {
            return height * (end - start)
          } else {
            return height * (end - start)
          }
        }
      },
      personList() {
        let personList = []
        this.courseList.forEach((person) => {
          let courseList = []
          let timeList = []
          for (let i = 0; i < this.timeList.length; i++) {
            let time = this.timeList[i]
            let flag = true
            if (timeList.indexOf(time) >= 0) {
              continue
            }
            for (let ii = 0; ii < person.courseList.length; ii++) {
              let _courseList = person.courseList[ii]
              if (_courseList.start === time || _courseList.end === time) {
                courseList.push({
                  start: _courseList.start,
                  end: _courseList.end,
                  info: _courseList.info,
                  color: '#e3d7f3',
                  use: 1,
                })
                let index = timeList.indexOf(_courseList.end)
                if (index === -1) {
                  let key = this.timeList.indexOf(_courseList.end)
                  if (key > 0) {
                    for (let iii = 0; iii <= key; iii++) {
                      let val = timeList.indexOf(this.timeList[iii])
                      if (val === -1) {
                        timeList.push(this.timeList[iii])
                      }
                    }
                  }
                }
                flag = false
                break
              }
            }
            if (flag) {
              courseList.push({
                start: time,
                end: time,
                info: {},
                color: '#ffffff',
                use: 0,
              })
            }
          }
          personList.push({
            name: person.name,
            courseList: courseList,
          })
        })

        return personList
      },
    },
    activated() {
      this.left = 0
      this.top = 0
      this.column1.left = 0
      this.column1.top = 0
    },
    created() {
      this.left = 0
      this.top = 0
      this.column1.left = 0
      this.column1.top = 0
    },
    mounted() {
      this.setHeight()

      this.$nextTick(() => {
        // //监听这个dom的scroll事件
        // this.box1.onscroll = () => {
        //   console.log('on scroll')
        //   this.handleScroll()
        // }
        this.box1.addEventListener('scroll', this.handleScroll)
      })
    },
    destroyed() {
      //离开该页面需要移除这个监听的事件
      this.box1.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },

      dayTime(dateTime) {
        console.log(dateTime)
        // alert(dateTime)
      },
      //鼠标点击
      mouseUp(e) {
        this.showModal('查看详情', 'CardInfo', 800)

        console.log(e)
      },
      // 移出
      mouseLeave() {},
      handleScroll() {
        this.column1.left = this.box1.scrollLeft
        this.column1.top = this.box1.scrollTop
      },
      search() {},
      save() {},
      setHeight() {
        let divHeight = window.innerHeight - 290
        this.$refs.content.style.minHeight = divHeight + 'px'
        this.$refs.box1.style.minHeight = divHeight + 'px'
      },
    },
  }
</script>

<style lang="less" scoped>
  .CardTable {
    position: relative;
    display: flex;
    justify-content: space-between;

    .left-box {
      width: 80%;

      .search {
        display: flex;
        padding: 10px;
        background: white;

        .left {
          flex: 1;
          display: flex;

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
        min-height: 500px;

        .new_tb {
          border-collapse: collapse;
          border-spacing: 0;
          color: #272822;
          position: absolute;
          width: 160px;
          float: left;

          .title1 {
            border-right: 1px solid #efefef;
            background: #fdf1f6;
            font-size: 12px;
            border-bottom: 1px solid #fff;
            height: 45px;
            line-height: 23px;
            text-align: center;
            font-weight: normal;
          }
        }

        .new_tb2 {
          border-collapse: collapse;
          border-spacing: 0;
          float: left;
          color: #272822;
          width: 50px;
          background: #fdf1f6;
        }

        .title1 {
          color: #000000;
          font-size: 14px;
          height: 45px;
          line-height: 45px;
          text-align: center;
        }

        .border3 {
          height: 100px;
          text-align: center;
          font-size: 14px;
          -moz-user-select: none;
          border-right: 1px solid #efefef;
        }

        .cursor-s {
          cursor: pointer;
          text-align: left;
          display: flex;
          justify-content: center;

          .tr-info {
            flex: 1;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #efefef;
            font-size: 12px;

            .card-info {
              padding: 10px;
            }
          }
        }

        .box1 {
          width: 100%;
          height: 600px;
          overflow-y: auto;
          overflow-x: scroll;
          z-index: 99;
          position: relative;

          ul {
            margin: 0;
            padding: 0;
          }

          .column1 {
            width: 50px;
            position: absolute;
            z-index: 99;
            background: rgb(255, 255, 255);
            left: 0;
          }

          .box2 {
            display: flex;

            .new_tbx {
              color: #272822;
              width: 160px;
              float: left;
              border-right: 1px solid #efefef;
              border-top: 0;
              border-collapse: collapse;
              border-spacing: 0;
            }

            li {
              list-style: none;

              float: left;
              margin-right: 0;
              background: #fff;
              height: 100px;
            }
          }
        }
      }

      .foot {
        padding: 10px;
        display: flex;
        background: white;

        .foot-box {
          padding: 8px;
          margin: 0 10px;
        }
      }
    }

    .right-box {
      margin-left: 10px;
      width: 320px;
      float: right;

      .box {
        border-radius: 8px;

        padding: 1px;

        .title {
          padding: 12px;
          font-weight: bold;
          font-size: 14px;
          color: black;
          background: white;
        }

        .list {
          .table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
            text-align: center;
            background: white;
            color: black;
            font-size: 12px;
          }

          tr {
            th {
              background: #fdf1f6;
            }

            td {
              border: 1px solid #eeeeee;
            }

            .text {
              color: #1298e6;
              cursor: pointer;
            }
          }

          .page {
            height: 40px;
            padding: 8px 0;
            text-align: center;
            background: white;
          }
        }
      }
    }

    .bt {
      color: #1298e6;
      margin-right: 20px;
      cursor: pointer;
    }

    .add-bt {
      margin-right: 10px;
      color: white;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
      margin-bottom: 1px;
    }
  }
</style>
