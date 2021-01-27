<template>
    <div>
        <!-- <h3 style="margin:20px;color:gary;font-weight:800">Dashboard – 真实预定/原始预定对比</h3> -->
        <el-tabs style="margin-left:20px;height: 50px" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="真实预定/原始预定对比" name="first">
            <h3 style="margin:20px;color:gary;font-weight:800">利用率：{{a}}</h3>
                <div style="width: 700px;height: 520px;margin-top:25px" id="echartss"></div>
            </el-tab-pane>
            <el-tab-pane label="dashboard1" name="second">dashboard2</el-tab-pane>
            <el-tab-pane label="dashboard2" name="third">dashboard3</el-tab-pane>
        </el-tabs>
        <!-- <div style="width: 70%;height: 600px;margin-left:30px;border:1px dashed gray" id="echartss"></div> -->
    </div>
</template>
<script>
import * as Api from '@/api/api'
import echarts from 'echarts';
// import 'echarts-gl';
export default {
//    mounted() {
//       let myChart = echarts.init(document.getElementById('echartss'));
//       myChart.setOption(this.echarts1Option, true);
//     },
  data () {
    return {
        a: '',
        original: [],
        real: [],
        activeName: 'first'
        }
    },
    created() {
        this.getDays()
    },
  methods: {
      getDays() {
            Api.getDaysData().then((res) => {
                // this.$set(this, 'original', res.original_days)
                // this.$set(this, 'real', res.real_days)
                this.original = res.original_days
                this.real = res.real_days
                this.a = res.use_ratio
                this.drawLine(res)
            })
        },
     drawLine(data) {
        let myChart = echarts.init(document.getElementById('echartss'));
        // myChart.setOption(this.echarts1Option);
        let echarts1Option = {
            title: {
                    text: '真实预定/原始预定(平均) 对比'
                    // subtext: '利用率'
                    },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['原始预定', '真实预定']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['预定'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '预定天数',
                    min: 0,
                    max: 10000,
                    interval: 1000,
                    axisLabel: {
                        formatter: '{value} '
                    }
                }
            ],
            series: [
                {
                    name: '原始预定',
                    type: 'bar',
                    data: this.original
                },
                {
                    name: '真实预定',
                    type: 'bar',
                    data: this.real
                }
                ]
            }
        myChart.setOption(echarts1Option, true)
    }
  }
}
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #echartss{
        width: 100%;
    }
</style>
