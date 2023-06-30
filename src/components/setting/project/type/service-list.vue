<template>
  <div class="ServiceList">
    <div class="search">
      <div class="left"></div>
      <div class="right">
        <div class="add-bt" @click="showModal('新增一级类别', 'Service')">
          新增一级类别
        </div>
      </div>
    </div>
    <div class="list">
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
    <Modal v-model="modal.show" :footer-hide="true" :title="modal.title">
      <Service v-if="modalShow('Service')" />
    </Modal>
  </div>
</template>

<script>
  import Service from '@/components/setting/project/type/service'

  export default {
    name: 'ServiceList',
    components: { Service },

    data: function () {
      return {
        loading: false,
        modal: {
          show: false,
          title: '',
          type: false,
        },
        columns: [
          {
            title: '项目一级类别',
            key: 'first_name',
          },
          {
            title: '二级分类',
            key: 'second_name',
          },
          {
            title: '操作',
            width: '300px',
            type: 'template',
            template: 'action',
          },
        ],
        list: [
          {
            first_name: '产后修复',
            second_name: '',
            children: [
              {
                first_name: '',
                second_name: '体验项目',
                children: [],
              },
            ],
          },
        ],
        date: [],
        searchData: {
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
      },
      handle(scope) {
        console.log(scope)
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
