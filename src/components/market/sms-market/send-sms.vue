<template>
  <div class="SendSms">
    <div class="box">
      <div class="header">第一步:编辑短信内容</div>
      <div class="content">
        <div class="top">
          提示:短信内容请勿涉及政治、宗教信仰、个人隐私、人身攻击、微信等敏感内容;同时避免使用“回车”
          “【】”等特殊符号。另使用模板内如存在(本店名称)等,还请按照内容手动修改哦~
        </div>
        <div class="center">
          <div class="left">
            <Input placeholder="" :rows="3" type="textarea" />
          </div>
          <div class="right">
            <div class="row">
              <div class="add-bt">送券给客户</div>
            </div>
            <div class="row">
              <div class="add-bt">常用短信模板</div>
            </div>
          </div>
        </div>

        <div class="bottom">当前已输入0个字=0条短信</div>
      </div>
    </div>
    <div class="box">
      <div class="header">第二步:筛选发送名单</div>
      <div class="content">
        <div class="tab">
          <div class="left">
            <div class="cell">全部客户</div>
            <div class="cell">高级筛选</div>
            <div class="cell">精准筛选</div>
          </div>
          <div class="right"><div class="add-bt">导入号码</div></div>
        </div>
        <div class="list">
          <vxe-table
            ref="xTable"
            :cell-style="{ textAlign: 'center' }"
            :column-config="{ resizable: true }"
            :data="tableData"
            header-align="center"
            :height="tableHeight"
            :loading="loading"
            :row-config="{ isHover: true }"
            size="small"
          >
            <vxe-column
              v-for="(item, index) in tableColumns"
              :key="index + item.key"
              :field="item.key"
              :fixed="item.fixed"
              :min-width="item.width"
              show-overflow="title"
              :title="item.title"
            />
          </vxe-table>
          <div class="page">
            <Page
              :current="searchData.p"
              :page-size="searchData.page"
              show-elevator
              show-sizer
              size="small"
              :total="searchData.count"
              @on-change="currentPage"
              @on-page-size-change="pageSizeChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="header">第三步:确认发送短信</div>
      <div class="content">
        <div class="sms-info">
          <div class="left">
            <p>
              接收人数：
              <span class="color">0</span>
              人
            </p>
          </div>
          <div class="right">
            <div class="text">
              当前短信剩余条数:
              <span class="color">0</span>
              条
            </div>
            <div class="text">
              本次消耗条数:
              <span class="color">0</span>
              条
            </div>
            <div class="text">
              发送后剩余条数:
              <span class="color">0</span>
              条
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="add-bt">确认群发</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SendSms',
    components: {},
    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        tableColumns: [
          {
            title: '姓名',
            key: '0',
          },
          {
            title: '手机号',
            key: '1',
          },
          {
            title: '门店名称',
            key: '2',
          },
          {
            title: '来源渠道',
            key: '3',
          },
        ],
        searchData: {
          p: 1,
          page: 10,
          count: 0,
        },
      }
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
    },
  }
</script>

<style lang="less" scoped>
  .SendSms {
    .box {
      .header {
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
      }

      .content {
        border: 1px solid #eeeeee;

        .top {
          color: #c85754;
          padding: 10px;
        }

        .tab {
          display: flex;
          align-items: center;
          .left {
            display: flex;
            flex: 1;
            .cell {
              cursor: pointer;
              padding: 10px;
              border-right: 1px solid #eeeeee;
            }
          }
          .right {
          }
        }

        .list {
          .page {
            height: 40px;
            padding: 8px 0;
            text-align: center;
            background: white;
          }
        }

        .center {
          display: flex;

          .left {
            flex: 1;
            padding: 10px;
          }

          .right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            width: 300px;
            .row {
              padding: 6px;
            }
          }
        }

        .color {
          color: #93105d;
        }

        .sms-info {
          padding: 10px;
          display: flex;
          justify-content: space-between;

          .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 16px;
          }

          .right {
            text-align: right;
            padding: 0 10px;
            width: 300px;

            .text {
              font-size: 14px;
              padding: 4px;
            }
          }
        }

        .bottom {
          padding: 10px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
    }

    .add-bt {
      text-align: center;
      color: white;
      margin-right: 20px;
      cursor: pointer;
      background: #f19ec2;
      padding: 6px 14px;
      border-radius: 4px;
    }
  }
</style>
