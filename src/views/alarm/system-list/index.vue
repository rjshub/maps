<template>
    <div class="system-notifications-list-container">
        <ListContainer ref="list_container"></ListContainer>
    </div>
</template>

<script>
import ListContainer from "../component/alarm-table";

export default {
    components: {ListContainer},
    data() {
        return {};
    },
    watch: {},
    methods: {},
    mounted() {
        this.$refs.list_container.update_alarm_type('2') // system notifications
    },
    }
</script>
<style lang='scss' scoped>
</style>