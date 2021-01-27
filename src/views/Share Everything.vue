<template>
    <div class="container">
        <div id="bm_content" class="bm_content" ref="box" @mouseenter="clearscroll" @mouseleave="createscroll">
            <table class="table table-condensed ">
                <tbody id="tb1" ref="tb1"></tbody>
                <tbody id="tb2" ref="tb2"></tbody>
            </table>
        </div>
        <div class="contents">
            <el-card class="box-card smallCard" shadow="hover">
                <div slot="header" class="clearfix">
                    <span class="titleText">{{$t('Lang.Views.ShareEverything.TitleText')}}</span>
                </div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item :label="$t('Lang.Views.ShareEverything.Title')" prop="title">
                        <el-input type="text" v-model="ruleForm.title" :placeholder="$t('Lang.Views.ShareEverything.PlaceholderTitle')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('Lang.Views.ShareEverything.Commits')">
                        <el-input :rows='9' type="textarea" v-model="ruleForm.details" :placeholder="$t('Lang.Views.ShareEverything.Placeholdercommits')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('Lang.public.SubBtn')}}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
import * as Api from '@/api/api'
export default {
    data() {
        return {
            prizeList: [],
            ruleForm: {
                title: '',
                details: ''
            },
            scrollMove: null,
            // dialogVisible: false,
            timeType: null,
            rules: {
               title: [
                   { required: true, message: this.$t('Lang.Views.ShareEverything.rules_Title'), trigger: 'blur' }
               ]
            }
        }
    },
    created() {
        this.GetShareEvery()
    },
    methods: {
        GetShareEvery() {
            Api.getEveryList().then((res) => {
                this.prizeList = res.data_list
                this.autoScroll()
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Api.PostEvery({...this.ruleForm}).then((res) => {
                        if (res.result === 1) {
                            this.ruleForm = {
                                title: '',
                                details: ''
                            }
                            this.$message({
                                message: this.$t('Lang.vies.ShareEverything.Addsuccess'),
                                type: 'success',
                                offset: 350,
                                showClose: true,
                                duration: 5000
                            })
                        }
                    })
                }
            });
        },
        autoScroll() {
            var product = this.RenderList();
            var l1 = this.$refs.tb1
            var l2 = this.$refs.tb2
            var box = this.$refs.box
            l1.innerHTML = product;
            if (l1.offsetHeight > box.offsetHeight) {
                l2.innerHTML = l1.innerHTML;// 克隆list1的数据，使得list2和list1的数据一样
                this.scrollMove = setInterval(this.scrollup, 30);// 数值越大，滚动速度越慢
            }
        },
        scrollup() {
            // 滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
             this.$refs.box.scrollTop >= this.$refs.tb1.offsetHeight ? this.$refs.box.scrollTop = 0 : this.$refs.box.scrollTop++
        },
        RenderList() {
            var str = '';
            this.prizeList.map((item, index) => {
                str += `<p style="line-height:30px"><span style='font-size: 18px'>${item.details}</span></p>`
            })
            return str
        },
        handleClose(done) {
        this.$confirm(this.$t('Lang.Views.ShareEverything.CloseConfirm'))
            .then(_ => {
                done();
                this.dialogVisible = false
                clearInterval(this.timeType)
            })
            .catch(_ => {});
        },
        Close() {
            this.dialogVisible = false;
            clearTimeout(this.timeType)
        },
        clearscroll() {
            clearInterval(this.scrollMove)
        },
        createscroll() {
            this.scrollMove = setInterval(this.scrollup, 30);// 数值越大，滚动速度越慢
        }
    },
    destroyed() {
        this.dialogVisible = false
        clearInterval(this.timeType)
        clearInterval(this.scrollMove)
    }
}
</script>
<style lang="scss" scoped>
.bm_content {
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 3px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
}

table {
  table-layout: fixed;
  font-size: 17px;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table {
  table-layout: fixed;
}

.center {
  vertical-align: middle;
}

.contents{
    width: 100%;
}
.inputText{
    width: 100%;
    height: 300px;
    >div{
        >span{
            width: 70px;
            display: inline-block;
            text-align:right;
            font-size: 17px;
        }
    }
}
.int1,.int2{
    width: 90% !important;
    margin: 10px 5px;
}
.titleText{
    font-size: 18px;
    font-weight: 600;
}
.SubBtn{
    width: 100%;
    text-align: right;
}
.img{
    width: 384px;
    height: 216px;
    margin: 20px auto;
    >img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
