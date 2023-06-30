<template>
  <div class="ServiceList">
    <div class="search">
      <div class="left">
        <div class="box">
          <span class="text">门店</span>
          <SelectShop />
        </div>
        <div class="box">
          <span class="text">职位</span>
          <SelectPosition />
        </div>
        <div class="box">
          <span class="text">员工</span>
          <SelectStaff />
        </div>
        <div class="box">
          <span class="text">项目类型</span>
          <SelectObjectType />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('批量设置提成', 'BatchSet')">
          批量设置
        </div>
        <div class="add-bt" @click="showModal('批量修改提成', 'BatchEdit')">
          批量修改
        </div>
        <div class="add-bt">批量清空</div>
      </div>
    </div>
    <div class="list">
      <vxe-table
        ref="xTable"
        border
        :cell-style="{ textAlign: 'center' }"
        :column-config="{ resizable: true }"
        :data="tableData"
        header-align="center"
        :height="tableHeight"
        :loading="loading"
        :row-config="{ isHover: true, height: 160 }"
        size="small"
      >
        <vxe-column
          field="0"
          fixed="left"
          show-overflow="title"
          title="项目名称"
          width="120"
        />
        <vxe-column
          field="0"
          fixed="left"
          show-overflow="title"
          title="会员提成"
        >
          <template>
            <div>
              <div>
                业绩提成：
                <span class="bt" @click="showModal('修改提成', 'Results')">
                  设置
                </span>
              </div>
              <div>
                耗卡提成：
                <span
                  class="bt"
                  @click="showModal('修改提成', 'ConsumptionCard')"
                >
                  设置
                </span>
              </div>
              <div>
                手工提成：
                <span class="bt" @click="showModal('修改提成', 'NominalFee')">
                  设置
                </span>
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="0"
          fixed="left"
          show-overflow="title"
          title="散客提成"
        >
          <template>
            <div>
              <div>
                业绩提成：
                <span class="bt" @click="showModal('修改提成', 'Results')">
                  设置
                </span>
              </div>
              <div>
                耗卡提成：
                <span
                  class="bt"
                  @click="showModal('修改提成', 'ConsumptionCard')"
                >
                  设置
                </span>
              </div>
              <div>
                手工提成：
                <span class="bt" @click="showModal('修改提成', 'NominalFee')">
                  设置
                </span>
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="0"
          fixed="left"
          show-overflow="title"
          title="赠送提成"
        >
          <template>
            <div>
              <div>
                会员业绩提成：
                <span class="bt" @click="showModal('修改提成', 'Results')">
                  设置
                </span>
              </div>
              <div>
                会员耗卡提成：
                <span
                  class="bt"
                  @click="showModal('修改提成', 'ConsumptionCard')"
                >
                  设置
                </span>
              </div>
              <div>
                会员手工提成：
                <span class="bt" @click="showModal('修改提成', 'NominalFee')">
                  设置
                </span>
              </div>
              <div>
                散户业绩提成：
                <span class="bt" @click="showModal('修改提成', 'Results')">
                  设置
                </span>
              </div>
              <div>
                散户耗卡提成：
                <span
                  class="bt"
                  @click="showModal('修改提成', 'ConsumptionCard')"
                >
                  设置
                </span>
              </div>
              <div>
                散户手工提成：
                <span class="bt" @click="showModal('修改提成', 'NominalFee')">
                  设置
                </span>
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          field="0"
          fixed="left"
          show-overflow="title"
          title="扣除成本"
        >
          <div>
            <div>
              扣除：
              <span class="bt" @click="showModal('扣除', 'Deduct')">设置</span>
            </div>
            <div>
              扣除（赠送）：
              <span class="bt" @click="showModal('扣除', 'Deduct')">设置</span>
            </div>
          </div>
        </vxe-column>
      </vxe-table>
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
      :title="modal.title"
      :width="modal.width"
    >
      <Results v-if="modalShow('Results')" />
      <ConsumptionCard v-if="modalShow('ConsumptionCard')" />
      <NominalFee v-if="modalShow('NominalFee')" />
      <Deduct v-if="modalShow('Deduct')" />
      <BatchSet v-if="modalShow('BatchSet')" />
      <BatchEdit v-if="modalShow('BatchEdit')" />
    </Modal>
  </div>
</template>

<script>
  import Results from '@/components/appointment/service-list/results'
  import ConsumptionCard from '@/components/appointment/service-list/consumption-card'
  import NominalFee from '@/components/appointment/service-list/nominal-fee'
  import Deduct from '@/components/appointment/service-list/deduct'
  import BatchSet from '@/components/appointment/service-list/batch-set'
  import BatchEdit from '@/components/appointment/service-list/batch-edit'
  import SelectShop from '@/components/form/select-shop'
  import SelectPosition from '@/components/form/select-position'
  import SelectStaff from '@/components/form/select-staff'
  import SelectObjectType from '@/components/form/select-object-type'

  export default {
    name: 'ServiceList',
    components: {
      SelectObjectType,
      SelectStaff,
      SelectPosition,
      SelectShop,
      Results,
      ConsumptionCard,
      NominalFee,
      Deduct,
      BatchSet,
      BatchEdit,
    },

    data: function () {
      return {
        loading: false,
        tableHeight: 0,
        tableData: [
          {
            0: '测试测试',
          },
        ],
        searchData: { search: '', p: 1, page: 10, count: 0 },
        modal: {
          show: false,
          title: '',
          type: false,
          width: 500,
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
    mounted() {
      this.setHeight()
      window.onresize = () => {
        this.setHeight()
      }
    },
    methods: {
      setHeight() {
        this.tableHeight = window.innerHeight - 266
      },
      handleSelect(row) {
        console.log(row)
      },
      showModal(title, type, data = {}) {
        console.log(data)
        switch (type) {
          case 'BatchSet':
            this.modal.width = 1200
            break
          case 'BatchEdit':
            this.modal.width = 1200
            break
          default:
            this.modal.width = 500
        }
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
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
  .ServiceList {
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
        flex-flow: wrap;

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

    .list {
      margin-top: 10px;

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
