<template>
  <div class="VipSearch">
    <div class="topic-nav">
      <div class="left">
        <Input
          v-model="formData.search"
          clearable
          enter-button
          placeholder="输入姓名/手机号/卡号"
          search
          @on-clear="search"
          @on-search="search"
        />
      </div>
      <div class="right">
        <div class="cell">
          <Button
            icon="md-person-add"
            type="primary"
            @click="showModal('新增会员', 'VipInfoDetails')"
          >
            新增会员
          </Button>
        </div>
        <div class="cell">
          <Button icon="ios-cloud-upload" type="primary">导入会员</Button>
        </div>
        <div class="cell">
          <Button icon="ios-cloud-download" type="primary">导出会员</Button>
        </div>
        <div class="cell">
          <Button icon="md-mail" type="primary">批量群发</Button>
        </div>
      </div>
    </div>
    <SearchVipMultipleConditions @search="select" />
    <Modal
      v-model="modal.show"
      :footer-hide="true"
      :scrollable="modal.scrollable"
      :styles="modal.styles"
      :title="modal.title"
      :width="modal.width"
    >
      <VipInfoDetails v-if="modalShow('VipInfoDetails')" @change="change" />
    </Modal>
  </div>
</template>

<script>
  import VipInfoDetails from '@/components/vip-details/vip-info/vip-info-details'
  import SearchVipMultipleConditions from '@/components/form/search-vip-multiple-conditions'

  export default {
    name: 'VipSearch',
    components: {
      SearchVipMultipleConditions,
      VipInfoDetails,
    },
    data: function () {
      return {
        modal: {
          show: false,
          title: '',
          type: false,
          width: 600,
          scrollable: true,
          styles: { top: '50px' },
        },
        formData: { search: '' },
      }
    },

    computed: {
      modalShow() {
        return (name) => {
          return this.modal.type === name && this.modal.show
        }
      },
    },
    created() {},
    methods: {
      change() {
        this.modal.show = false
        this.$emit('change')
      },
      showModal(title, type, data = {}) {
        console.log(data)
        this.modal.show = true
        this.modal.title = title
        this.modal.type = type
      },
      select(formData) {
        formData.search = this.formData.search
        this.formData = formData
        this.search()
      },
      search() {
        this.$emit('search', this.formData)
      },
    },
  }
</script>

<style lang="less" scoped>
  .VipSearch {
    padding: 10px 0;
    background: white;

    .topic-nav {
      display: flex;
      align-items: center;
      padding: 0 10px;
      .left {
      }
      .right {
        display: flex;
        align-items: center;

        .cell {
          margin-left: 10px;
        }
      }
    }
  }
</style>
