<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>tttt</ion-title>
        <ion-buttons 
          
          slot="end"
        >
          <ion-icon 
          @click="() => router.push({name:'panier', params: { restoId } })"
          :icon="bagOutline" color="primary"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <div id="container">
        
        <ion-list>
          <ion-list-header>
            <ion-label>{{ rubriqueTitre }}</ion-label>
          </ion-list-header>
          <ion-item 
            v-for="(rub, index) in articles" :key="rub.id"
            @click="openArticle(index)"
          >
            <ion-label>
              <h2>{{rub.titre}}</h2>
              <p>{{rub.resume}}</p>
            </ion-label>
          </ion-item>
        </ion-list>

      </div>

    

    <!-- Modal pour afficher l'article selectionné -->
    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="isOpen=false">Annuler</ion-button>
          </ion-buttons>
          <!-- <ion-title>Welcome</ion-title> -->
        
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <h2>{{article.titre}}</h2>
        <p>
          {{article.resume}}
        </p>
        

        <div id="footer">
          <div class="boutons">
          <ion-button @click="retirer()">-</ion-button>
          <!-- <ion-input :value="article.nombre"></ion-input> -->
          <!-- <span class="nombre">{{ article.nombre }}</span> -->
          <ion-button disabled="true" fill="outline">{{ article.nombre }}</ion-button>
          <ion-button @click="ajouter()">+</ion-button>
        </div>
          <ion-button expand="full" @click="ajouterPanier()">Ajouter</ion-button>
        </div>

      </ion-content>

    </ion-modal>
    <!--FIN Modal pour afficher l'article selectionné -->

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {useShopStore} from '@/stores/shop'
import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonModal,
  IonFooter
} from '@ionic/vue';
import { bagOutline } from 'ionicons/icons';


const router = useRouter()
const shopStore = useShopStore()

const route = useRoute()
const restoId = route.params.restoId

const rubriqueId = route.params.rubriqueId

const rubriqueTitre = ref(shopStore.getRubiqueTitle(rubriqueId))
const articles = ref(shopStore.getArticles(rubriqueId))
console.log("🚀 ~ file: Rutbique.vue:40 ~ articles:", articles.value)

const article = ref({
  titre: '',
  resume: '',
  prix: '',
  nombre: 1
})

const isOpen = ref(false)

function openArticle(index){
  console.log("🚀 ~ file: RubriquePage.vue:62 ~ openArticle ~ articleId:", index)
  article.value = articles.value[index]
  article.value.nombre = 1
  console.log('article ' + JSON.stringify( article.value))
  isOpen.value=true
}

function retirer(){
  if (article.value.nombre>1) article.value.nombre --
}

function ajouter(){
  article.value.nombre ++
}

function ajouterPanier(){
  shopStore.ajouterPanier(article.value)
  isOpen.value = false
}

</script>

<style scoped>
.nombre {
  border:1px solid #000;
  width:40px;
}
.boutons{
  text-align: center;
}
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  left:0;
}
</style>