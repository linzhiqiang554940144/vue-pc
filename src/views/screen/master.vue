//数据大屏-主屏
<template>
<data-content>
    <template v-slot:left-view>
        <block-wrapper title="区域一" :height="400">
            <block-body-title title="子标题1"></block-body-title>
        </block-wrapper>
        <block-wrapper title="区域二" :height="260">
            <block-body-title title="子标题2" :hasBtn="true"></block-body-title>
        </block-wrapper>
        <block-wrapper title="区域三" :height="260"></block-wrapper>
    </template>

    <template v-slot:mid-view>
        <block-wrapper title="区域一" :height="600">
            <!-- <jj-map/> -->
        </block-wrapper>
        <block-wrapper title="区域二" :height="337"></block-wrapper>
    </template>

    <template v-slot:right-view>
        <block-wrapper title="区域一" :height="400"></block-wrapper>
        <block-wrapper title="区域二" :height="260"></block-wrapper>
        <block-wrapper title="区域三" :height="260"></block-wrapper>
    </template>
</data-content>
</template>

<script>
import DataContent from "@l/screen/DataContent";
import BlockWrapper from "@c/ui/BlockWrapper";
import BlockBodyTitle from "@c/ui/BlockBodyTitle";
// import JjMap from "@c/map/JjMap";
export default {
    name: "master-screen",
    components: {
        DataContent,
        BlockWrapper,
        BlockBodyTitle,
        // JjMap
    }
};
</script>

<style>
</style>
