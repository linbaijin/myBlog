<template>
    <div>
        <router-link to="/Main">
            <mu-button flat color="success">返回</mu-button>
        </router-link>
        <mavon-editor v-model="value"></mavon-editor>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
    }
</script>

<style scoped>

</style>