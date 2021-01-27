<template>
  <div class="contents">
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm news">
          <el-form-item :label="$t('Lang.Views.ShareEverything.Title')" prop="title">
            <el-input v-model="ruleForm.title" :placeholder="$t('Lang.public.Log.Please_title')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('Lang.Views.Cms.CreateNews.Poster')">
              <el-upload
                class="upload-demo"
                drag
                :action="GLOBAL.HOME + '/cms/upload/'"
                :data={bizType:10}
                :limit='1'
                multiple
                :on-remove="removeFile"
                :on-success="uploadOK"
                :on-progress='file'
                :before-upload="beforeUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <div v-html="$t('Lang.Views.Cms.CreateNews.up_size')" style="line-height: 20px;"></div>
                </div>
              </el-upload>
              <transition name="el-zoom-in-top">
                  <div v-show="ruleForm.image" class="Poster transition-box">
                    <el-image :src="ruleForm.image" alt="">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                </div>
              </transition>
          </el-form-item>
          <div class="editor">
            <div style="font-size:17px;">{{$t('Lang.Views.Cms.CreateNews.Edit_Article')}}</div>
            <div id="Editor"></div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('Lang.public.SubBtn')}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import * as Api from '@/api/api'
import WangEditor from 'wangeditor'
import GLOBAL from '../../common/global'
export default {
    name: 'NormName',
    components: {
    },
    props: {},
    data() {
        return {
          ruleForm: {
            title: '',
            comments: '',
            image: ''
          },
          rules: {
              title: [
                { required: true, message: this.$t('Lang.public.Log.Please_title'), trigger: 'blur' },
                { min: 5, max: 99999999999, message: this.$t('Lang.public.Log.rules.r_t_s'), trigger: 'blur' }
              ]
            },
            editor: null,
            dialogVisible: false,
            disabled: false,
            form: {
              adType: null
            }
        }
    },
    computed: {
      ...mapGetters([
        'itcode'
      ])
    },
    mounted() {
      const editor = new WangEditor(`#Editor`)
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.ruleForm.comments = newHtml
      }
      // 创建编辑器
      this.editor = editor
      // editor.config.lang = WangEditor.langs['en']
      editor.config.debug = true;
      editor.config.uploadFileName = 'file';
      editor.config.uploadImgServer = `${GLOBAL.HOME}/cms/upload/`
      editor.config.uploadImgMaxSize = 2 * 1024 * 1024
      editor.config.uploadImgMaxLength = 5
      editor.config.uploadImgHooks = {
          // before: function (xhr, editor, files) {
          // },
          // success: function (xhr, editor, result) {
          // },
          // fail: function (xhr, editor, result) {
          // },
          // error: function (xhr, editor) {
          // },
          customInsert: function (insertImg, result, editor) {
              // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
              // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
              // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
              var url = result.data[0];
              insertImg(`${GLOBAL.HOME + url}`);
              // result 必须是一个 JSON 格式字符串！！！否则报错
          }
      }
      editor.create()
    },
    methods: {
      getEditorData() {
          // 通过代码获取编辑器内容
          let data = this.editor.txt.html()
          alert(data)
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  Api.CreateCms({...this.ruleForm, type: 'commit'}).then((res) => {
                      this.$message({
                        message: res.result === 1 ? this.$t('Lang.Views.Cms.CreateNews.Article_created_successfully') : res.errMsg,
                        type: res.result === 1 ? 'success' : 'error',
                        offset: 350
                      });
                      res.result === 1 && this.$router.push('/AllNews')
                  })
              }
          });
      },
      // file(file) {
      // },
      uploadOK(file) {
        this.ruleForm.image = `${GLOBAL.HOME + file.data}`
      },
      removeFile(file) {
        this.ruleForm.image = ''
      },
      handlePictureCardPreview(file) {
        this.dialogVisible = true;
      },
      // handleDownload(file) {
      // },
      beforeUpload(file) {
        const fileTypeName = (file.name).substring(file.name.lastIndexOf('.') + 1); // 获取后缀名
        this.form.adType = ['jpg', 'png', 'jpeg'].includes(fileTypeName) ? 0 : -1
        let index = ['jpg', 'png', 'jpeg'].indexOf(fileTypeName);
          if (index === -1) { // 说明核实不符合
              this.$message({
                message: this.$t('Lang.Views.Cms.CreateNews.format'),
                type: 'warning',
                offset: 350
              });
            return false;
          } else {
            // 图片文件大小限制，限制宽高分别为1280px和800px
              if (this.form.adType === 0) {
                  let _this = this;
                  let imgWidth = '';
                  let imgHight = '';
                  const isSize = new Promise((resolve, reject) => {
                    let width = 1920;
                    let height = 1080;
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                      img.onload = function () {
                        imgWidth = img.width;
                        imgHight = img.height;
                        let valid = img.width === width && img.height === height;
                        valid ? resolve() : reject(new Error());
                      }
                    img.src = _URL.createObjectURL(file);
                  }).then(() => {
                    return file;
                  }, () => {
                      _this.$message({
                          message: this.$t('Lang.Views.Cms.CreateNews.warning') + imgWidth + 'px' + this.$t('Lang.Views.Cms.CreateNews.and') + imgHight + 'px',
                          type: 'warning',
                          offset: 350
                        });
                    return Promise.reject(new Error('errorMsg'));
                  });
                return isSize;
              } else {
                return true;
            }
        }
    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>
<style lang="scss" scoped>
body .el-card{
  width: 95%;
  margin: auto;
}
.myQuillEditor{
  width: 92%;
  height: 300px;
  margin-left: 100px;
  margin-bottom: 70px;
}
.newSub{
  float: right;
  margin-top: 50px;
}
.Detail{
  margin-bottom:10px;
  float:left;
  margin-left:37px;
  font-weight: 600;
}
.editor{
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 20px;
  >div:first-child{
    width: 100px;
    text-indent: .3em;
  }
  #Editor{
    width: 92.5%;
    z-index: 10;
  }
}
.Poster{
  width: 320px;
  height: 180px;
  float: left;
  img{
    width: 100%;
    height: 100%;
  }
}
.upload-demo{
  width: 40%;
  float: left;
}
</style>
