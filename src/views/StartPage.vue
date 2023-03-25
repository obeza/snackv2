<script setup lang="ts">
import { IonSpinner } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import {useShopStore} from '@/stores/shop'

const shopStore = useShopStore()
const route = useRoute()
const router = useRouter()
const restoId = route.params.restoId
console.log('start data ' + restoId)

shopStore.isLoading = true


// get data from api
await shopStore.getShopInfos(restoId).then(()=>{
  console.log('isLoading ' + shopStore.isLoading)
  router.push({name:'home', params:{ restoId}});
})




</script>
<template>
  <ion-spinner></ion-spinner>
</template>