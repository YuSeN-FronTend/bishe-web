<template>
    <div class="customerService">
        <UserPart v-if="JSON.parse(accountInfo).job === '用户'"/>
        <CompanyPart v-if="JSON.parse(accountInfo).job === '企业'"/>
    </div>
</template>

<script setup lang="ts">
import UserPart from './userPart.vue';
import CompanyPart from './companyPart.vue';
const accountInfo:any = sessionStorage.getItem('accountInfo');
</script>

<style lang="scss" scoped>
.customerService {
    margin: 20px 200px;
    display: flex;
    border: 1px solid #e8eaeb;
    border-radius: 20px;
}
</style>