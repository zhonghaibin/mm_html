<template>
  <div class="ProjectList">
    <div class="search">
      <div class="left">
        <div class="box">
          <Input
            clearable
            enter-button
            placeholder="输入项目分类/项目名称"
            search
            style="width: 250px"
            @on-clear="search"
            @on-search="search"
          />
        </div>
        <div class="box">
          <span class="text">项目分类</span>
          <SelectProductType
            v-model="searchData.goods_type_id"
            @on-select="search"
          />
        </div>
        <div class="box">
          <span class="text">适用门店</span>
          <SelectShop v-model="searchData.sid" @on-select="search" />
        </div>
        <div class="box">
          <span class="text">状态</span>
          <SelectProjectStatus
            v-model="searchData.status"
            @on-select="search"
          />
        </div>
      </div>
      <div class="right">
        <div class="add-bt" @click="showModal('新增项目', 'Project')">
          新增项目
        </div>
        <div class="add-bt">导入项目</div>
        <div class="add-bt" @click="exportDataEvent">导出项目</div>
      </div>
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
        <vxe-column title="操作" width="120">
          <template>
            <span class="bt">编辑</span>
            <span class="bt">下架</span>
          </template>
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
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <Project v-if="modalShow('Project')" />
    </Modal>
  </div>
</template>

<script>
  import Project from '@/components/setting/project/project'
  import SelectShop from '@/components/form/select-shop'
  import SelectProductType from '@/components/form/select-product-type'
  import SelectProjectStatus from '@/components/form/select-project-status'

  export default {
    name: 'ProjectList',
    components: { SelectProjectStatus, SelectProductType, SelectShop, Project },

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
            title: '项目分类',
            key: '0',
          },
          {
            title: '项目名称',
            key: '1',
          },
          {
            title: '所属部门',
            key: '2',
          },
          {
            title: '销售价',
            key: '3',
          },
          {
            title: '项目时长',
            key: '4',
          },
          {
            title: '项目状态',
            key: '5',
          },
        ],
        searchData: {
          sid: '',
          goods_type_id: '',
          status: '',
          search: '',
          start_time: '',
          end_time: '',
          p: 1,
          page: 10,
          count: 0,
        },
        date: [],
        modal: {
          show: false,
          title: '',
          type: false,
          width: 1000,
          scrollable: true,
          styles: { top: '50px' },
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
        this.tableHeight = window.innerHeight - 264
      },
      clearDate() {
        this.searchData.start = ''
        this.searchData.end = ''
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
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.modal.width = window.innerWidth - 200
      },
      exportDataEvent() {
        setTimeout(() => {
          const list = []
          this.$refs.xTable.exportData({
            filename: '',
            type: 'csv',
            isHeader: true,
            isFooter: true,
            data: list,
          })
        }, 100)
      },
    },
  }
</script>

<style lang="less" scoped>
  .ProjectList {
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

    .right {
      display: flex;
      flex-flow: wrap;

      .add-bt {
        color: white;
        cursor: pointer;
        background: #f19ec2;
        padding: 0 14px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 12px;
      }
    }
  }
</style>
