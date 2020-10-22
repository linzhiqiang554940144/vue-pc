<template>
<v-chart ref="lineChart" :options="opts" :style="styleObj" autoresize theme="dark" />
</template>

<script>
export default {
    name: "LineChart",
    props: {
        styleObj: {
            type: Object,
            default: () => ({
                width: "100%",
                height: "220px",
            }),
        },
        grid: {
            type: Object,
            default: () => ({
                left: "13%",
                top: "13%",
                bottom: "18%",
                right: "5%",
            }),
        },
        colorArr: {
            type: Array,
            default: () => ["rgb(215,22,24)", "rgb(3,82,165)", "rgb(255,255,255)"],
        },
        dataset: {
            type: Array,
            default: () => [],
        },
        xFontSize: {
            type: Number,
            default: 13,
        },
        hideLegend: Boolean,
    },
    data() {
        return {
            opts: {
                backgroundColor: "rgba(0,0,0,0)",
                color: this.colorArr,
                textStyle: {
                    fontSize: 10,
                },
                legend: {
                    show: this.hideLegend ? false : true,
                    right: "8%",
                },
                tooltip: {
                    trigger: "axis",
                },
                dataset: {
                    source: this.dataset,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: true,
                    axisLine: {
                        lineStyle: {
                            color: "",
                        },
                    },
                    axisLabel: {
                        fontSize: this.xFontSize,
                        align: "middle",
                        color: "#747d8c",
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: {
                    minInterval: 1,
                    gridIndex: 0,
                    axisLabel: {
                        color: "#747d8c",
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            type: "solid",
                            color: "rgba(3, 80, 158, 0.3)",
                        },
                    },
                },
                grid: this.grid,
                series: new Array(this.dataset.length - 1).fill({
                    type: "line",
                    smooth: true,
                    seriesLayoutBy: "row",
                    axisLabel: {
                        interval: 0,
                    },
                    markPoint: {
                        data: [{
                            type: "max",
                            name: "最大值",
                        }, ],
                    },
                }),
            },
        };
    },
    watch: {
        dataset(val) {
            let options = this.opts;
            options.dataset.source = val;
            this.opts = options;
        },
    },
};
</script>

<style>
</style>
