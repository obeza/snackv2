<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <!-- <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hello</ion-title>
        </ion-toolbar>
      </ion-header> -->

      <div id="container">

        <ion-button expand="block"
        v-for="rub in menuList" :key="rub.id"
        @click="router.push({name:'rubrique', params: { restoId:$route.params.restoId, rubriqueId:rub.id} })"
        >{{rub.titre}}</ion-button>

      </div>
      
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {useShopStore} from '@/stores/shop'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

const router = useRouter()
const shopStore = useShopStore()

const menuList = ref(shopStore.dataShop)
console.log("🚀 ~ file: HomePage.vue:50 ~ menuList:", menuList.value)



</script>