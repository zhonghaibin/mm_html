<template>
  <div class="box">
    <div class="column">
      成本核算
      <Poptip placement="left-start" transfer trigger="hover">
        <Icon
          style="color: #ff0088; cursor: pointer; font-size: 18px"
          type="ios-help-circle-outline"
        />
        <div slot="content">
          <div class="fields-remark">
            <p class="text">1、库存商品成本计算采用“移动加权平均法计算：</p>
            <p class="text">2、成本核算因历史数据不可考,对历史数据不生效;</p>
            <p class="text">
              3、成本核算可能因数据初始化、成本未填写、填写错误导致计算结果有误;可使用库存盘点、成本调整功能校对库存成本;
            </p>
            <p class="text">
              4、存货的移动平均单位成本=
              (本次进货之前库存存货的实际成本+本次进货的实际成本)
              /(本次进货之前库存存货数量+本次进货的数量)
            </p>
            <p class="text">
              发出存货的成本=本次发出存货的数量x移动平均单位成本月末库存存货的成本=月末库存存货的数量x月末存货的移动平均单位成本。
            </p>
            <p class="text">举例：</p>
            <p class="text">甲门店2021年12月A商品有关收、发、存情况如下：</p>
            <p class="text">①12月1日,结存600件,成本为2万元</p>
            <p class="text">②12月8日,购入400件,成本为2.2万元</p>
            <p class="text">③12月10日,发出800件</p>
            <p class="text">④12月20日,购入600件,成本为2.3万元</p>
            <p class="text">
              ⑤12月28日,发出400件612月31日,购入400件,成本为2.5万元计算12月发货成本为2562万元,购货成本3155万
            </p>
          </div>
        </div>
      </Poptip>
    </div>
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">分类</span>
          <SelectProductType
            v-model="searchData.goods_type_id"
            @on-select="search"
          />
        </div>
        <div class="box">
          <DatePicker
            format="yyyy-MM-dd"
            placeholder="开始时间-结束时间"
            style="width: 200px"
            transfer
            type="datetimerange"
            value-format="yyyy-MM-dd"
            @on-change="changeDatePicker"
            @on-clear="clearDate"
            @on-open-change="changeDatePicker"
          />
        </div>
        <div class="box">
          <Input
            v-model="searchData.search"
            enter-button
            placeholder="商品名称/编号"
            search
            style="width: 250px"
            @on-search="search"
          />
        </div>
        <div class="box">
          <div class="add-bt">查询</div>
          <div class="add-bt">导出</div>
          <div class="add-bt" @click="showModal('成本调整', 'CostEdit')">
            成本调整
          </div>
          <div
            class="add-bt"
            @click="showModal('成本调整记录', 'CostEditList')"
          >
            成本调整记录
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="baseInfo">
      <div class="box color1">
        <div class="header"><span class="text">营业总数据</span></div>
        <div class="content">
          <div class="cell">￥2342342.22</div>
        </div>
      </div>
      <div class="box color2">
        <div class="header"><span class="text">收入金额明细</span></div>
        <div class="content">
          <div class="cell">￥2342342.22</div>
        </div>
      </div>
      <div class="box color3">
        <div class="header"><span class="text">收入来源统计</span></div>
        <div class="content">
          <div class="cell">￥2342342.22</div>
        </div>
      </div>
      <div class="box color4">
        <div class="header"><span class="text">客数客次统计</span></div>
        <div class="content">
          <div class="cell">￥2342342.22</div>
        </div>
      </div>
    </div>
    <div class="list">
      <table>
        <thead>
          <tr>
            <td class="color" rowspan="2">商品信息</td>
            <td class="color" rowspan="2">分类</td>
            <td class="color" rowspan="2">品牌</td>
            <td class="color" rowspan="2">仓库门店</td>
            <td class="color1" colspan="3">期初</td>
            <td class="color2" colspan="3">入库</td>
            <td class="color3" colspan="3">出库</td>
            <td class="color4" colspan="3">期末</td>
            <td class="color" rowspan="2">操作</td>
          </tr>
          <tr>
            <td class="color1">数量</td>
            <td class="color1">单个成本</td>
            <td class="color1">总成本</td>
            <td class="color2">数量</td>
            <td class="color2">单个成本</td>
            <td class="color2">总成本</td>
            <td class="color3">数量</td>
            <td class="color3">单个成本</td>
            <td class="color3">总成本</td>
            <td class="color4">数量</td>
            <td class="color4">单个成本</td>
            <td class="color4">总成本</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">
              茶树精油
              <br />
              编号: 20104
              <br />
              单位:瓶
            </td>
            <td rowspan="2">精油</td>
            <td rowspan="2">欧莱雅</td>
            <td rowspan="2">分店1</td>
            <td class="color1">0</td>
            <td class="color1">0</td>
            <td class="color1">0</td>
            <td class="color2">0</td>
            <td class="color2">0</td>
            <td class="color2">0</td>
            <td class="color3">0</td>
            <td class="color3">0</td>
            <td class="color3">0</td>
            <td class="color4">0</td>
            <td class="color4">0</td>
            <td class="color4">0</td>
            <td rowspan="2">
              <span class="text" @click="showModal('商品明细', 'CostDetail')">
                明细
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="page">
        <Page
          :current="searchData.p"
          :page-size="searchData.page"
          show-elevator
          show-sizer
          size="small"
          :total="searchData.count"
          transfer
          @on-change="currentPage"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <CostDetail v-if="modalShow('CostDetail')" />
      <CostEdit v-if="modalShow('CostEdit')" />
      <CostEditList v-if="modalShow('CostEditList')" />
    </Modal>
  </div>
</template>

<script>
  import CostDetail from '@/components/inventory/cost/cost-detail'
  import CostEdit from '@/components/inventory/cost/cost-edit'
  import CostEditList from '@/components/inventory/cost/cost-edit-list'
  import SelectShop from '@/components/form/select-shop'
  import SelectProductType from '@/components/form/select-product-type'

  export default {
    name: 'Cost',
    components: {
      SelectProductType,
      SelectShop,
      CostDetail,
      CostEdit,
      CostEditList,
    },

    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
        },
        list: [
          {
            info: 1,
          },
        ],
        searchData: {
          sid: '',
          goods_type_id: '',
          search: '',
          start: '',
          end: '',
          p: 1,
          page: 10,
          count: 0,
        },
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {},
    created() {},
    methods: {
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.modal.width = window.innerWidth - 200
      },

      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
        this.search()
      },
      changeDatePicker: function (date) {
        if (date) {
          this.searchData.start = date[0]
          this.searchData.end = date[1]
        }
        this.search()
      },
      currentPage(current) {
        this.searchData.p = current
        this.getList()
      },
      pageSizeChange(pageSize) {
        this.searchData.page = pageSize
        this.search()
      },
      search() {
        this.searchData.p = 1
        this.getList()
      },
    },
  }
</script>

<style lang="less" scoped>
  .box {
    .search {
      display: flex;
      padding: 10px;
      background: white;

      .left {
        flex: 1;
        display: flex;
        align-items: center;

        .box {
          display: flex;
          align-items: center;
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

    .baseInfo {
      background: white;
      padding: 10px 14px;
      display: flex;

      .box {
        flex: 1;
        margin-right: 24px;
        border-radius: 12px;
        padding: 14px;
        cursor: pointer;
        text-align: center;

        .header {
          .text {
            padding: 18px 0 0 0;
            font-size: 12px;
          }
        }

        .content {
          justify-content: center;
          margin-top: 2px;
          display: flex;

          .cell {
            font-size: 22px;
            padding: 10px 0;
          }
        }
      }
    }

    .color {
      background: #fdeff5;
    }

    .color1 {
      background: #e6e7fb;
    }

    .color2 {
      background: #e0efef;
    }

    .color3 {
      background: #fceae8;
    }

    .color4 {
      background: #efe9e0;
    }

    .list {
      margin-top: 10px;
      border-top: 1px solid #eeeeee;
      background: white;

      table {
        text-align: center;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        tr {
          td {
            height: 40px;
            border: 1px solid #f8f8f8;

            .text {
              color: #1298e6;
              cursor: pointer;
            }
          }
        }
      }

      .page {
        height: 40px;
        padding: 8px 0;
        text-align: center;
        background: white;
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
      padding: 0 14px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
</style>
