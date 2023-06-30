<template>
  <div class="CourseTable">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
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
        <div class="add-bt" @click="showModal('时间设置', 'CourseTime')">
          时间设置
        </div>
        <div class="add-bt" @click="showModal('课室管理', 'ClassRoomList')">
          课室管理
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
                  <Icon :size="28" type="md-time" />
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
                    height: height1 + 'px',
                    borderBottom: '1px solid #efefef',
                  }"
                >
                  {{ item.time }}
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
            v-for="(item, index) in courseList"
            :key="index"
            style="width: 450px"
          >
            <div style="position: relative; margin-bottom: 45px">
              <table class="new_tb">
                <thead class="table-head">
                  <tr class="title1">
                    <th colspan="4">{{ item.week }}({{ item.day }})</th>
                  </tr>
                </thead>
              </table>
            </div>
            <table
              v-for="(val, key) in item.timeList"
              :key="key"
              class="new_tbx"
            >
              <thead>
                <tr v-for="(v, k) in val.list" :key="k" class="border3">
                  <td class="cursor-s" width="35%" @mouseup="add()">
                    {{ v.name }}
                  </td>
                  <td
                    class="cursor-s"
                    @mouseleave="mouseLeave"
                    @mouseup="mouseOver($event)"
                  >
                    {{ v.value }}
                  </td>
                </tr>
              </thead>
            </table>
          </li>
        </ul>
      </div>
      <div
        v-if="show"
        class="info"
        :style="{ top: `${top}px`, left: `${left}px` }"
      >
        <div class="row">
          <div class="left">课程：</div>
          <div class="right">空中瑜伽</div>
        </div>
        <div class="row">
          <div class="left">上课老师：</div>
          <div class="right">王五</div>
        </div>
        <div class="row">
          <div class="left">上课时间：</div>
          <div class="right"></div>
        </div>
        <div class="row">
          <div class="left">上课最多人数：</div>
          <div class="right"></div>
        </div>
        <div class="row">
          <div class="left">上课最少人数：</div>
          <div class="right"></div>
        </div>
        <div class="row">
          <div class="left">已预约人数：</div>
          <div class="right">
            <div class="p">
              <div class="l">张三：</div>
              <div class="r">(待到店)</div>
            </div>
            <div class="p">
              <div class="l">张三：</div>
              <div class="r">(待到店)</div>
            </div>
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
      <CourseTime v-if="modalShow('CourseTime')" />
      <ClassRoomList v-if="modalShow('ClassRoomList')" />
      <Course v-if="modalShow('Course')" />
    </Modal>
  </div>
</template>

<script>
  import CourseTime from '@/components/appointment/course/course-time'
  import ClassRoomList from '@/components/appointment/course/class-room-list'
  import Course from '@/components/appointment/course/course'
  import SelectShop from '@/components/form/select-shop'

  export default {
    name: 'CourseTable',
    components: { SelectShop, CourseTime, ClassRoomList, Course },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 800,
        },
        searchData: { sid: '', search: '', month: '' },
        column1: {
          left: 0,
        },
        timeList: [
          {
            time: '8:00-9:00',
          },
        ],
        courseList: [
          {
            day: '5.6',
            week: '周二',
            timeList: [
              {
                time: '8:00-9:00',
                list: [
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                ],
              },
            ],
          },
          {
            day: '5.6',
            week: '周二',
            timeList: [
              {
                time: '8:00-9:00',
                list: [
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                ],
              },
            ],
          },
          {
            day: '5.6',
            week: '周二',
            timeList: [
              {
                time: '8:00-9:00',
                list: [
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                ],
              },
            ],
          },
          {
            day: '5.6',
            week: '周二',
            timeList: [
              {
                time: '8:00-9:00',
                list: [
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                ],
              },
            ],
          },
          {
            day: '5.6',
            week: '周二',
            timeList: [
              {
                time: '8:00-9:00',
                list: [
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                ],
              },
            ],
          },
          {
            day: '5.6',
            week: '周二',
            timeList: [
              {
                time: '8:00-9:00',
                list: [
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                  {
                    name: '瑜伽室v1',
                    value: '12321',
                  },
                ],
              },
            ],
          },
        ],
        top: 0,
        left: 0,
        show: false,
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
        if (this.courseList.length > 0) {
          if (this.courseList[0].timeList.length > 0) {
            if (this.courseList[0].timeList[0].list.length > 0) {
              return this.courseList[0].timeList[0].list.length * 50
            } else {
              return 0
            }
          } else {
            return 0
          }
        } else {
          return 0
        }
      },
    },
    activated() {
      this.left = 0
      this.top = 0
      this.column1.left = 0
    },
    created() {
      this.left = 0
      this.top = 0
      this.column1.left = 0
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
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },

      // 移入
      mouseOver(e) {
        this.show = true
        this.top = e.layerY - 10
        this.left = e.layerX + 10
      },
      // 移出
      mouseLeave() {
        this.show = false
      },
      add() {
        this.showModal('课控安排', 'Course', 800)
      },
      handleScroll() {
        this.column1.left = this.box1.scrollLeft
      },
      changeMonth(yearMonth) {
        let date = yearMonth.split('-')
        console.log(date[0], date[1])
      },
      search() {},
      save() {},
      setHeight() {
        let divHeight = window.innerHeight - 230
        this.$refs.content.style.minHeight = divHeight + 'px'
        this.$refs.box1.style.minHeight = divHeight + 'px'
      },
    },
  }
</script>

<style lang="less" scoped>
  .CourseTable {
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

      .new_tb {
        border-collapse: collapse;
        border-spacing: 0;
        color: #272822;
        position: absolute;
        width: 450px;
        float: left;

        .title1 {
          border-right: 1px solid #efefef;
          background: #fdf1f6;
          font-size: 14px;
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
        width: 95px;

        tr:nth-of-type(even) {
          background: #f8fbff;
        }

        tr:nth-of-type(odd) {
          background: #fdf1f6;
        }
      }

      .title1 {
        color: #000000;
        font-size: 14px;
        height: 45px;
        line-height: 45px;
        text-align: center;
      }

      .border3 {
        height: 50px;
        text-align: center;
        font-size: 14px;
        -moz-user-select: none;
        border-right: 1px solid #efefef;
      }

      .cursor-s {
        border-right: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        cursor: pointer;
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
          width: 95px;
          position: absolute;
          z-index: 99;
          background: rgb(255, 255, 255);
          left: 0;
        }

        .box2 {
          table:nth-of-type(odd) {
            background: #f8fbff;
          }

          table:nth-of-type(even) {
            background: #fdf1f6;
          }

          display: flex;

          .new_tbx {
            color: #272822;
            width: 450px;
            float: left;
            border-bottom: 1px solid #efefef;
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
            height: 120px;
          }
        }
      }

      .info {
        background-color: #000000;
        border-radius: 10px;
        opacity: 0.6;
        min-height: 150px;
        border: 1px solid #ccc;
        position: absolute;
        text-align: center;
        top: 0;
        left: 0;
        z-index: 100;
        padding: 20px 30px;

        .row {
          color: white;
          display: flex;
          flex-flow: wrap;

          .left {
          }

          .right {
            .p {
              display: flex;
              flex-flow: wrap;

              .l {
              }

              .r {
              }
            }
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
