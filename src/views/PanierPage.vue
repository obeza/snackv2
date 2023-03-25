<template>
  <ion-page>

<ion-content :fullscreen="true">

  <div>
    <h2>Panier</h2>

    <p v-if="!panier.length">panier vide</p>

    <div class="panier" v-else>
      <ion-card
        v-for="(pan,index) in panier " :key="pan.id"
      >
        <ion-card-header>
          <ion-card-title>{{ pan.titre }}</ion-card-title>
          <ion-card-subtitle></ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <div class="boutons">
            <ion-button @click="decrementer(index)">-</ion-button>
            <ion-button disabled="true" fill="outline">{{ pan.nombre }}</ion-button>
            <ion-button @click="incrementer(index)">+</ion-button>
          </div>
          <h2>
            prix : {{ pan.prix*pan.nombre}}
          </h2>        
        </ion-card-content>
      </ion-card>
    </div>
    
  </div>

</ion-content>

<ion-footer>
  <div class="bottom-button">

<ion-button class="bottom-bouton" expand="full">Payer</ion-button>
<ion-button  
@click="$router.go(-1)"
class="bottom-bouton" fill="outline" expand="full">Retour</ion-button>


</div>
</ion-footer>

</ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useShopStore} from '@/stores/shop'
import { useRoute, useRouter } from 'vue-router';
import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonModal,
  IonFooter,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/vue';
import { caretBack } from 'ionicons/icons';




const router = useRouter()
const shopStore = useShopStore()

const route = useRoute()
const restoId = route.params.restoId

const panier = ref(shopStore.dataPanier)
console.log("🚀 ~ file: PanierPage.vue:80 ~ panier:", panier.value)



function incrementer(index){
  console.log('incrementer ' + index)
  panier.value[index].nombre++
}

function decrementer(index){
  console.log('decrementer' + index)
  panier.value[index].nombre--
  if (panier.value[index].nombre<1) {
    console.log('supprimer du panier')
    panier.value.splice(index, 1)
    console.log("🚀 ~ file: PanierPage.vue:98 ~ decrementer ~ panier.value:", panier.value)
  }
  
}
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    left:0;
}
bottom-button {
  margin:4px;
}
.boutons ion-button {
  width:100px;
}
</style>