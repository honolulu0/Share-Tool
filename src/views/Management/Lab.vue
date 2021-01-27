<template>
    <div class="container">
        开发中~
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">lab</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="flexbox">
            <div class="cabinet">
                <div class="number"><span style="display: inline-block;font-size: 14px;margin-left: 20px;">number</span>/<span>OSC</span>
                </div>
                <div class="machine">
                    <el-tooltip class="item" style="width: 100%;height:35px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">1u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:80px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button></el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>UPS</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:35px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button></el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:35px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>KVM</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:60px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button></el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:35px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">1u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:35px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">1u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:35px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>switch</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:180px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button style="text-align: left;">9u</el-button>
                    </el-tooltip><br>
                    <el-button type="primary" plain class="creatbtn" @click="dialogFormVisible = true">+ create</el-button>
                </div>
            </div>
            <div class="cabinet">
                <div class="number"><span style="display: inline-block;font-size: 14px;margin-left: 20px;">number</span>/<span>OSC</span>
                </div>
                <div class="machine">
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:30px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>1u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:80px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>4u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:80px;" effect="dark" placement="left-start">
                        <div slot="content">name：<br />belonger：</div>
                        <el-button>4u</el-button>
                    </el-tooltip><br>
                    <el-button type="primary" plain class="creatbtn" @click="dialogFormVisible = true">+ create
                    </el-button>
                </div>
            </div>
            <div class="cabinet">
                <div class="number"><span style="display: inline-block;font-size: 14px;margin-left: 20px;">number</span>/<span>OSC</span>
                </div>
                <div class="machine">
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">名称：<br />归属人：</div>
                        <el-button>2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:40px;" effect="dark" placement="right-start">
                        <div slot="content">名称：<br />归属人：</div>
                        <el-button>2u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:30px;" effect="dark" placement="left-start">
                        <div slot="content">名称：<br />归属人：</div>
                        <el-button>1u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:80px;" effect="dark" placement="left-start">
                        <div slot="content">名称：<br />归属人：</div>
                        <el-button>4u</el-button>
                    </el-tooltip><br>
                    <el-tooltip class="item" style="width: 100%;height:80px;" effect="dark" placement="left-start">
                        <div slot="content">名称：<br />归属人：</div>
                        <el-button>4u</el-button>
                    </el-tooltip><br>
                    <el-button type="primary" plain class="creatbtn" @click="dialogFormVisible = true">+ create
                    </el-button>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    // import * as Api from '@/api/api'
    export default {
        data() {
            return {
            }
        }
        // created() {
        //     this.getshowsut()
        // },
        // methods: {
        //     getshowsut() {
        //     Api.getShowSut().then((res) => {
        //         if (res.success === true) {
        //             console.log(res.sut_data);
        //         }
        //     })
        // }
        // }
    }
</script>
<style lang="scss" scoped>
    // * {
    //     padding: 0;
    //     margin: 0;
    // }
    // .flexbox {
    //     width: 90%;
    //     height: 950px;
    //     margin: auto;
    //     display: flex;
    //     justify-content: space-around;
    // }
    // .cabinet {
    //     width: 300px;
    //     border: 1px darkgray solid;
    //     border-radius: 3%;
    //     box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    //     margin-top: 20px;
    //     margin-left: 20px;
    // }
    // .number {
    //     width: 100%;
    //     height: 10%;
    //     border-bottom: 1px darkgrey solid;
    //     background-color: #eee;
    // }
    // /* 机器 */
    // .machine {
    //     width: 100%;
    // }
    // .creatbtn {
    //     width: 100%;
    // }
    // .item:hover{
    //     background-color: #F2F6FC;
    // }
</style>
