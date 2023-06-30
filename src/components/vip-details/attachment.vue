<template>
  <div class="Attachment">
    <div class="list">
      <div v-for="item in list" :key="item.id" class="card">
        <div class="img">
          <img
            class="ui"
            :src="item.file"
            @click="showModal('查看', 'Look', item)"
          />
          <div class="content">
            <div class="title">{{ item.name }}</div>
            <div class="date">{{ item.add_time }}</div>
          </div>
          <div class="footer">
            <div class="row">
              <div
                class="edit"
                @click="showModal('编辑客户附件', 'UploadFile', item)"
              >
                <Icon type="ios-create" />
                编辑
              </div>
              <div class="delete" @click="delFile(item.id)">
                <Icon type="ios-trash" />
                删除
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-card" @click="showModal('添加客户附件', 'UploadFile')">
        <div class="text">
          <Icon type="md-add" />
          添加附件
        </div>
      </div>
    </div>
    <div class="page">
      <Page
        :current="searchData.p"
        :page-size="searchData.page"
        show-elevator
        size="small"
        :total="searchData.count"
        transfer
        @on-change="currentPage"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <Modal v-model="modal.show" :footer-hide="true" :title="modal.title">
      <UploadFile
        v-if="modalShow('UploadFile')"
        :data="data"
        :member-info="memberInfo"
        @change="change"
      />
      <img v-if="modalShow('Look')" :src="file" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
  import UploadFile from '@/components/vip-details/attachment/upload-file'

  export default {
    name: 'Attachment',
    components: {
      UploadFile,
    },
    props: {
      memberInfo: {
        type: Object,
        default: () => {},
      },
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
        },
        searchData: {
          vid: this.memberInfo.id,
          p: 1,
          page: 10,
          count: 0,
        },

        list: [],
        data: {},
        file: '',
      }
    },
    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    activated() {
      this.search()
    },
    created() {
      this.search()
    },
    methods: {
      showModal(title, type, data = {}) {
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
        this.data = data
        this.file = data.file
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
      async getList() {
        this.list = []
        this.searchData.count = Number(0)
        this.searchData.p = Number(1)
      },
      delFile(file_id) {
        this.delFiles(file_id)
      },
      async delFiles(file_id) {
        console.log(file_id)
        const { status, msg } = { status: 0, msg: '请求失败' }
        if (status !== 1) {
          this.$Message.error(msg)
        } else {
          this.$Message.success(msg)
          this.search()
        }
      },
      change() {
        this.modal.show = false
        this.search()
      },
    },
  }
</script>

<style lang="less" scoped>
  .Attachment {
    .list {
      display: flex;
      flex-flow: wrap;

      .card {
        margin: 10px;
        border-radius: 10px;
        border: 1px solid #e8e7e7;
        height: 300px;
        width: 180px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .img {
          .ui {
            height: 230px;
            width: 180px;
          }

          .content {
            text-align: center;

            .title {
            }

            .date {
            }
          }

          .footer {
            .row {
              display: flex;
              justify-content: center;
              text-align: center;

              .edit {
                width: 60px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
              }

              .edit:hover {
                color: #cc749a;
              }

              .delete {
                width: 60px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
              }

              .delete:hover {
                color: #cc749a;
              }
            }
          }
        }
      }

      .add-card {
        margin: 10px;
        border-radius: 10px;
        border: 1px dashed #e8e7e7;
        height: 300px;
        width: 180px;
        display: flex;
        align-items: center;

        .text {
          margin: 0 auto;
          cursor: pointer;
        }
      }
    }

    .page {
      clear: both;
      height: 40px;
      padding: 8px 0;
      text-align: center;
      background: white;
    }
  }
</style>
